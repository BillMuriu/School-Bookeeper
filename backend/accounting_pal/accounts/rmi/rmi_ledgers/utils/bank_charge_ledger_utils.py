from django.utils import timezone
from accounts.rmi.rmi_bankcharges.models import RMIBankCharge  # Use RMI Bank Charges

# Function to get bank charges as debits
def get_bankcharge_debits(start_date, end_date):
    debits = []

    # Ensure the dates are timezone-aware only if they're naive
    if timezone.is_naive(start_date):
        start_date = timezone.make_aware(start_date)
    if timezone.is_naive(end_date):
        end_date = timezone.make_aware(end_date)

    # Fetch RMI Bank Charges within the specified period
    bank_charges = RMIBankCharge.objects.filter(charge_date__gte=start_date, charge_date__lt=end_date)

    # Loop through the filtered charges and create debit entries (date, amount, and cashbook)
    for charge in bank_charges:
        debits.append({
            "date": charge.charge_date,
            "amount": charge.amount,
            "cashbook": get_cashbook(charge.charge_date)  # Add cashbook based on charge date
        })

    return debits

# Function to get the complete bank charge ledger with debits and total amount
def get_bankcharge_ledger(start_date, end_date):
    # Get debits
    debits = get_bankcharge_debits(start_date, end_date)

    # Calculate total debits (charges)
    total_debits = sum(debit['amount'] for debit in debits)

    # Create a combined ledger with debits and total debits
    ledger = {
        "debits": [{"date": debit["date"], "amount": debit["amount"], "cashbook": debit["cashbook"]} for debit in debits],
        "total_debits": total_debits
    }

    return ledger

def get_cashbook(date):
    # Financial year starts on July 1st
    year = date.year
    if date.month >= 7:
        # From July to December, we are in the current financial year
        financial_year = f"{year}-{year + 1}"
        cashbook_no = date.month - 6  # July (7) becomes 1, August (8) becomes 2, etc.
    else:
        # From January to June, we are in the previous financial year
        financial_year = f"{year - 1}-{year}"
        cashbook_no = date.month + 6  # January (1) becomes 7, February (2) becomes 8, etc.

    return f"CashBook-{cashbook_no}-{financial_year}"