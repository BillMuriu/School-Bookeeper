from datetime import datetime
from django.utils import timezone
from django.db.models import Sum
from decimal import Decimal
from accounts.operations.operations_bankcharges.models import BankCharges
from accounts.operations.operations_paymentvouchers.models import PaymentVoucher
from accounts.operations.operations_pettycash.models import PettyCash
from accounts.operations.operations_receipts.models import OperationReceipt
from .models import OpeningBalance


def calculate_running_balance(account, current_date=None):
    if current_date is None:
        current_date = datetime.now().date()

    # Fetch the opening balance directly from the database
    try:
        opening_balance = OpeningBalance.objects.first()
        if opening_balance:
            bank_amount = opening_balance.bank_amount
            cash_amount = opening_balance.cash_amount
        else:
            bank_amount = 0.0
            cash_amount = 0.0
    except OpeningBalance.DoesNotExist:
        bank_amount = 0.0
        cash_amount = 0.0

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
    bank_amount += total_bank_receipts - (
        total_bank_charges + total_petty_cash + total_bank_payment_vouchers
    )
    cash_amount += total_cash_receipts - total_cash_payment_vouchers

    # Return the running balance dictionary
    return {
        "account": account,
        "date": current_date.isoformat(),
        "bankAmount": bank_amount,
        "cashAmount": cash_amount,
    }




def calculate_balance_carried_forward(year, month):
    # Define the first day of the specified month and year
    start_date = timezone.make_aware(datetime(year, month, 1))

    # Fetch the opening balance that is applicable before the start date
    opening_balance = (
        OpeningBalance.objects.filter(date__gte=start_date)
        .order_by('-date')
        .first()
    )

    # Initialize bank and cash amounts
    bank_amount = Decimal('0.0')
    cash_amount = Decimal('0.0')

    # Only include the opening balance if it is on or after the start date
    if opening_balance and opening_balance.date >= start_date:
        bank_amount += opening_balance.bank_amount
        cash_amount += opening_balance.cash_amount

    # Total bank receipts up to the day before the specified date
    total_bank_receipts = OperationReceipt.objects.filter(
        date__lt=start_date,
        cash_bank='bank'
    ).aggregate(total=Sum('total_amount'))['total'] or Decimal('0')  # Ensure it’s Decimal

    # Total cash receipts up to the day before the specified date
    total_cash_receipts = OperationReceipt.objects.filter(
        date__lt=start_date,
        cash_bank='cash'
    ).aggregate(total=Sum('total_amount'))['total'] or Decimal('0')  # Ensure it’s Decimal

    # Total bank charges up to the day before the specified date
    total_bank_charges = BankCharges.objects.filter(
        charge_date__lt=start_date
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0')  # Ensure it’s Decimal

    # Total petty cash issued up to the day before the specified date
    total_petty_cash = PettyCash.objects.filter(
        date_issued__lt=start_date
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0')  # Ensure it’s Decimal

    # Total bank payment vouchers up to the day before the specified date
    total_bank_payment_vouchers = PaymentVoucher.objects.filter(
        date__lt=start_date,
        payment_mode='bank'
    ).aggregate(total=Sum('amount_shs'))['total'] or Decimal('0')  # Ensure it’s Decimal

    # Total cash payment vouchers up to the day before the specified date
    total_cash_payment_vouchers = PaymentVoucher.objects.filter(
        date__lt=start_date,
        payment_mode='cash'
    ).aggregate(total=Sum('amount_shs'))['total'] or Decimal('0')  # Ensure it’s Decimal

    # Calculate bank and cash amounts as of the start date (excluding the first day of the month)
    bank_amount += total_bank_receipts - (
        total_bank_charges + total_petty_cash + total_bank_payment_vouchers
    )
    cash_amount += total_cash_receipts - total_cash_payment_vouchers

    # Return the balance carried forward dictionary
    return {
        "account": "operations",
        "date": start_date.isoformat(),
        "bankAmount": bank_amount,
        "cashAmount": cash_amount,
    }