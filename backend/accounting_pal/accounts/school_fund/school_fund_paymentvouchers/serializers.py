from rest_framework import serializers
from .models import SchoolFundPaymentVoucher

class SchoolFundPaymentVoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolFundPaymentVoucher
        fields = ['id', 'voucher_no', 'payee_name', 'particulars', 'amount_shs', 'payment_mode',
                  'total_amount_in_words', 'prepared_by', 'authorised_by', 'vote_head', 'vote_details', 'date']
