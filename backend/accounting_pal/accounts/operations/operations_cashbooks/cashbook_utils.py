from datetime import datetime
from django.utils import timezone
from django.db.models import Sum
from accounts.operations.operations_bankcharges.models import BankCharges
from accounts.operations.operations_paymentvouchers.models import PaymentVoucher
from accounts.operations.operations_pettycash.models import PettyCash
from accounts.operations.operations_receipts.models import OperationReceipt
from accounts.operations.operations_balances.utils import calculate_balance_carried_forward

def get_payments_money_out(year, month):
    payments = []

    # Define the start and end date for the specified month and year
    start_date = timezone.make_aware(datetime(year, month, 1))
    end_date = timezone.make_aware(datetime(year, month + 1, 1)) if month < 12 else timezone.make_aware(datetime(year + 1, 1, 1))

    # Fetch Bank Charges within the specified month and year
    bank_charges = BankCharges.objects.filter(charge_date__gte=start_date, charge_date__lt=end_date)
    for charge in bank_charges:
        payments.append({
            "type": "bankcharge",
            "voucher_no": "",  # Not applicable to bank charges
            "cheque_no": "",  # Not applicable to bank charges
            "cash": "",  # Not applicable to bank charges
            "bank": "",  # Not applicable to bank charges
            "bank_charge": charge.amount,  # This field only applies to bank charges
            "description": charge.description,  # Additional field for context
            "date": charge.charge_date
        })

    # Fetch Payment Vouchers within the specified month and year
    payment_vouchers = PaymentVoucher.objects.filter(date__gte=start_date, date__lt=end_date)
    for voucher in payment_vouchers:
        payments.append({
            "type": "paymentvoucher",
            "voucher_no": voucher.voucher_no,
            "cheque_no": voucher.cheque_number if voucher.payment_mode == 'bank' else "",  # Only applicable if paid through the bank
            "cash": voucher.amount_shs if voucher.payment_mode == 'cash' else "",  # Only applicable if paid by cash
            "bank": voucher.amount_shs if voucher.payment_mode == 'bank' else "",  # Only applicable if paid by bank
            "bank_charge": "",  # Not applicable to payment vouchers
            "description": voucher.particulars,
            "date": voucher.date
        })

    # Fetch Petty Cash Entries within the specified month and year
    petty_cash_entries = PettyCash.objects.filter(date_issued__gte=start_date, date_issued__lt=end_date)
    for petty_cash in petty_cash_entries:
        payments.append({
            "type": "pettycash",
            "voucher_no": "",  # Not applicable to petty cash
            "cheque_no": petty_cash.cheque_number,  # Only applies to petty cash if issued through cheque
            "cash": petty_cash.amount,  # Cash is applicable for petty cash entries
            "bank": "",  # Not applicable to petty cash
            "bank_charge": "",  # Not applicable to petty cash
            "description": petty_cash.description,
            "date": petty_cash.date_issued
        })

    return {"payments": payments}

def get_receipts_money_in(year, month):
    # Get the balance carried forward for the specified year and month
    balance_info = calculate_balance_carried_forward(year, month)

    # Initialize the data structure with the balance carried forward
    receipts_data = []

    balance_forward = {
        'from_whom': 'Balance Carried Forward',
        'receipt_no': '-',
        'cash': f"{balance_info['cashAmount']:,}",  # Format with commas
        'bank': f"{balance_info['bankAmount']:,}",  # Format with commas
        'rmi': '-',
        'other_voteheads': '-',
    }
    receipts_data.append(balance_forward)

    # Define the start and end date for the specified month and year
    start_date = timezone.make_aware(datetime(year, month, 1))
    end_date = timezone.make_aware(datetime(year, month + 1, 1)) if month < 12 else timezone.make_aware(datetime(year + 1, 1, 1))

    # Query Petty Cash Receipts from the Receipts Model within the specified year and month
    petty_cash_entries = OperationReceipt.objects.filter(
        received_from='pettycash',
        date__gte=start_date,
        date__lt=end_date
    ).values('petty_cash__payee_name').annotate(
        total_amount=Sum('total_amount')  # Use snake_case field names
    )

    for entry in petty_cash_entries:
        row = {
            'from_whom': 'Petty Cash',  # Set to 'Petty Cash'
            'receipt_no': '-',
            'cash': f"{entry['total_amount']:,}",  # Petty cash goes under cash
            'bank': '-',
            'rmi': '-',
            'other_voteheads': '-',
        }
        receipts_data.append(row)

    # Query Operation Receipts (non-petty cash) within the specified year and month
    operation_receipts = OperationReceipt.objects.exclude(
        received_from='pettycash'
    ).filter(
        date__gte=start_date,
        date__lt=end_date
    ).values(
        'received_from', 'cash_bank', 'total_amount', 'rmi_fund', 'other_voteheads'
    )

    for receipt in operation_receipts:
        row = {
            'from_whom': receipt['received_from'],  # Use the correct field name here
            'receipt_no': '-',
            'cash': f"{receipt['total_amount']:,}" if receipt['cash_bank'] == 'cash' else '-',  # Cash amount
            'bank': f"{receipt['total_amount']:,}" if receipt['cash_bank'] == 'bank' else '-',  # Bank amount
            'rmi': f"{receipt['rmi_fund']:,}" if receipt['rmi_fund'] > 0 else '-',  # RMI fund
            'other_voteheads': f"{receipt['other_voteheads']:,}" if receipt['other_voteheads'] > 0 else '-',  # Other voteheads
        }
        receipts_data.append(row)

    return receipts_data


def get_cashbook(year, month):
    # Initialize a dictionary to store the cashbook data
    cashbook_data = {
        "receipts": [],  # For storing money-in data
        "payments": []   # For storing money-out data
    }

    # Get Receipts (Money In) using existing function
    receipts = get_receipts_money_in(year, month)
    cashbook_data["receipts"].extend(receipts)

    # Get Payments (Money Out) using existing function
    payments = get_payments_money_out(year, month)
    cashbook_data["payments"].extend(payments["payments"])

    return cashbook_data