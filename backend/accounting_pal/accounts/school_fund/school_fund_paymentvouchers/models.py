from django.db import models

class SchoolFundPaymentVoucher(models.Model):
    PAYMENT_MODE_CHOICES = [
        ('cash', 'Cash'),
        ('bank', 'Bank'),
    ]

    account = models.CharField(max_length=255, default='school_fund_account')
    voucher_no = models.PositiveIntegerField()
    payee_name = models.CharField(max_length=255)
    particulars = models.TextField()
    amount_shs = models.DecimalField(max_digits=10, decimal_places=2)
    payment_mode = models.CharField(max_length=50, choices=PAYMENT_MODE_CHOICES)
    total_amount_in_words = models.CharField(max_length=255)
    prepared_by = models.CharField(max_length=255)
    authorised_by = models.CharField(max_length=255)
    vote_head = models.CharField(max_length=255)
    vote_details = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return f"School Fund Payment Voucher #{self.voucher_no} - {self.payee_name}"
