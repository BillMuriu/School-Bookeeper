# serializers.py
from rest_framework import serializers
from .models import PaymentVoucher

class PaymentVoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentVoucher
        fields = '__all__'
