from django.db import models

class PaymentVoucher(models.Model):
    PAYMENT_MODE_CHOICES = [
        ('cash', 'Cash'),
        ('bank', 'Bank'),
    ]

    account = models.CharField(max_length=255, default='default_account')

    voucher_no = models.PositiveIntegerField()  # Change voucher_no to a numeric field
    payee_name = models.CharField(max_length=255)
    particulars = models.TextField()
    amount_shs = models.DecimalField(max_digits=10, decimal_places=2)  # Ensure amount_shs is correctly formatted
    payment_mode = models.CharField(max_length=50, choices=PAYMENT_MODE_CHOICES)  # Use choices for payment_mode
    total_amount_in_words = models.CharField(max_length=255)
    prepared_by = models.CharField(max_length=255)
    authorised_by = models.CharField(max_length=255)
    vote_head = models.CharField(max_length=255)
    vote_details = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return f"Payment Voucher #{self.voucher_no} - {self.payee_name}"