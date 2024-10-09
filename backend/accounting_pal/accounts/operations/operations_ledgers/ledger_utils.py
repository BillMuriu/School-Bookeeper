from datetime import datetime
from django.utils import timezone
from django.db.models import Sum
from accounts.operations.operations_bankcharges.models import BankCharges
from accounts.operations.operations_paymentvouchers.models import PaymentVoucher
from accounts.operations.operations_pettycash.models import PettyCash
from accounts.operations.operations_receipts.models import OperationReceipt
from accounts.operations.operations_balances.utils import calculate_balance_carried_forward



def get_rmi_debits(start_date, end_date):
    # Initialize an empty list for debits
    debits = []

    # Ensure the dates are timezone-aware
    start_date = timezone.make_aware(start_date)
    end_date = timezone.make_aware(end_date)

    # Fetch Payment Vouchers within the specified period where vote_head is 'rmi'
    payment_vouchers = PaymentVoucher.objects.filter(date__gte=start_date, date__lt=end_date, vote_head='rmi')

    # Loop through the filtered vouchers and create debit entries (date and amount)
    for voucher in payment_vouchers:
        debits.append({
            "date": voucher.date,
            "amount": voucher.amount_shs
        })

    return debits