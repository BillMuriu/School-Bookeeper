from rest_framework import serializers
from .models import TuitionBankCharge

class TuitionBankChargeSerializer(serializers.ModelSerializer):
    account = serializers.CharField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    chargeDate = serializers.DateTimeField(source='charge_date')
    description = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = TuitionBankCharge
        fields = ['id', 'account', 'amount', 'chargeDate', 'description']
