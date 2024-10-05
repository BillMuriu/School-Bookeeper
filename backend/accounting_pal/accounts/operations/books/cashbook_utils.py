from datetime import datetime
from django.db.models import Sum
from accounts.operations.operations_bankcharges.models import BankCharges
from accounts.operations.operations_paymentvouchers.models import PaymentVoucher
from accounts.operations.operations_pettycash.models import PettyCash
from accounts.operations.operations_receipts.models import OperationReceipt
from accounts.operations.operations_balances.utils import calculate_balance_carried_forward

def get_payments_money_out():
    payments = []

    # Fetch Bank Charges
    bank_charges = BankCharges.objects.all()
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

    # Fetch Payment Vouchers
    payment_vouchers = PaymentVoucher.objects.all()
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

    # Fetch Petty Cash Entries
    petty_cash_entries = PettyCash.objects.all()
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


def get_receipts_money_in(account, year, month):
    # Get the balance carried forward for the specified account, year, and month
    balance_info = calculate_balance_carried_forward(account, year, month)

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

    # Query Petty Cash Receipts from the Receipts Model
    petty_cash_entries = OperationReceipt.objects.filter(received_from='pettycash').values('petty_cash__payee_name').annotate(
        total_amount=Sum('total_amount')  # Ensure you use snake_case for fields here as well
    )

    for entry in petty_cash_entries:
        row = {
            'from_whom': entry['petty_cash__payee_name'],  # Use the correct field name here
            'receipt_no': '-',
            'cash': f"{entry['total_amount']:,}",
            'bank': '-',
            'rmi': '-',
            'other_voteheads': '-',
        }
        receipts_data.append(row)

    # Query Operation Receipts (non-petty cash)
    operation_receipts = OperationReceipt.objects.exclude(received_from='pettycash').values('received_from').annotate(
        total_amount=Sum('total_amount')  # Use the correct field name
    )

    for receipt in operation_receipts:
        row = {
            'from_whom': receipt['received_from'],  # Use the correct field name here
            'receipt_no': '-',
            'cash': '-',
            'bank': f"{receipt['total_amount']:,}",
            'rmi': '-',
            'other_voteheads': '-',
        }
        receipts_data.append(row)

    return receipts_data