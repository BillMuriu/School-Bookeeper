from datetime import datetime
from django.db.models import Sum
from accounts.operations.operations_bankcharges.models import BankCharges
from accounts.operations.operations_paymentvouchers.models import PaymentVoucher
from accounts.operations.operations_pettycash.models import PettyCash
from accounts.operations.operations_receipts.models import OperationReceipt
from .models import OpeningBalance


def calculate_running_balance(account, current_date=None):
    if current_date is None:
        current_date = datetime.now().date()

    # Calculate the opening balance for the account for the current year
    opening_balance = get_opening_balance_for_year(account, current_date.year)

    # Total bank receipts for the current year
    total_bank_receipts = OperationReceipt.objects.filter(
        date__year=current_date.year,
        cash_bank='bank'
    ).aggregate(total=Sum('total_amount'))['total'] or 0

    # Total cash receipts for the current year
    total_cash_receipts = OperationReceipt.objects.filter(
        date__year=current_date.year,
        cash_bank='cash'
    ).aggregate(total=Sum('total_amount'))['total'] or 0

    # Total bank charges for the current year
    total_bank_charges = BankCharges.objects.filter(
        charge_date__year=current_date.year
    ).aggregate(total=Sum('amount'))['total'] or 0

    # Total petty cash for the current year
    total_petty_cash = PettyCash.objects.filter(
        date_issued__year=current_date.year
    ).aggregate(total=Sum('amount'))['total'] or 0

    # Total bank payment vouchers for the current year
    total_bank_payment_vouchers = PaymentVoucher.objects.filter(
        date__year=current_date.year,
        payment_mode='bank'
    ).aggregate(total=Sum('amount_shs'))['total'] or 0

    # Total cash payment vouchers for the current year
    total_cash_payment_vouchers = PaymentVoucher.objects.filter(
        date__year=current_date.year,
        payment_mode='cash'
    ).aggregate(total=Sum('amount_shs'))['total'] or 0

    # Calculate bank and cash amounts
    bank_amount = (opening_balance['bank_amount'] + total_bank_receipts) - (
        total_bank_charges + total_petty_cash + total_bank_payment_vouchers
    )
    cash_amount = (opening_balance['cash_amount'] + total_cash_receipts) - total_cash_payment_vouchers

    # Return the running balance dictionary
    return {
        "account": account,
        "date": current_date.isoformat(),
        "bankAmount": bank_amount,
        "cashAmount": cash_amount,
    }


def calculate_balance_carried_forward(account, year, month):
    # Define the first day of the specified month and year
    start_date = datetime(year, month, 1).date()

    # Calculate the opening balance for the account as of the first day of the specified month
    opening_balance = get_opening_balance_for_year(account, start_date.year)

    # Total bank receipts up to the specified date
    total_bank_receipts = OperationReceipt.objects.filter(
        date__lte=start_date,
        cash_bank='bank'
    ).aggregate(total=Sum('total_amount'))['total'] or 0

    # Total cash receipts up to the specified date
    total_cash_receipts = OperationReceipt.objects.filter(
        date__lte=start_date,
        cash_bank='cash'
    ).aggregate(total=Sum('total_amount'))['total'] or 0

    # Total bank charges up to the specified date
    total_bank_charges = BankCharges.objects.filter(
        charge_date__lte=start_date
    ).aggregate(total=Sum('amount'))['total'] or 0

    # Total petty cash issued up to the specified date
    total_petty_cash = PettyCash.objects.filter(
        date_issued__lte=start_date
    ).aggregate(total=Sum('amount'))['total'] or 0

    # Total bank payment vouchers up to the specified date
    total_bank_payment_vouchers = PaymentVoucher.objects.filter(
        date__lte=start_date,
        payment_mode='bank'
    ).aggregate(total=Sum('amount_shs'))['total'] or 0

    # Total cash payment vouchers up to the specified date
    total_cash_payment_vouchers = PaymentVoucher.objects.filter(
        date__lte=start_date,
        payment_mode='cash'
    ).aggregate(total=Sum('amount_shs'))['total'] or 0

    # Calculate bank and cash amounts as of the start date
    bank_amount = (opening_balance['bank_amount'] + total_bank_receipts) - (
        total_bank_charges + total_petty_cash + total_bank_payment_vouchers
    )
    cash_amount = (opening_balance['cash_amount'] + total_cash_receipts) - total_cash_payment_vouchers

    # Return the balance carried forward dictionary
    return {
        "account": account,
        "date": start_date.isoformat(),
        "bankAmount": bank_amount,
        "cashAmount": cash_amount,
    }

def get_opening_balance_for_year(account, year):
    # Fetch the opening balance for the specified account and year
    try:
        opening_balance = OpeningBalance.objects.filter(
            account=account,
            date__year=year
        ).order_by('-date').first()
        if opening_balance:
            return {
                'bank_amount': opening_balance.bank_amount,
                'cash_amount': opening_balance.cash_amount
            }
        else:
            # Return default values if no opening balance is found
            return {
                'bank_amount': 0.0,
                'cash_amount': 0.0
            }
    except OpeningBalance.DoesNotExist:
        # Return default values if no record exists
        return {
            'bank_amount': 0.0,
            'cash_amount': 0.0
        }
