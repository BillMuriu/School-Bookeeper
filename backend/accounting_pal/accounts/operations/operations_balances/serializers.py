from rest_framework import serializers
from .models import ClosingBalance, OpeningBalance

class ClosingBalanceSerializer(serializers.ModelSerializer):
    bankAmount = serializers.DecimalField(max_digits=10, decimal_places=2, source='bank_amount')
    cashAmount = serializers.DecimalField(max_digits=10, decimal_places=2, source='cash_amount')
    date = serializers.DateTimeField()

    class Meta:
        model = ClosingBalance
        fields = ['id', 'account', 'date', 'bankAmount', 'cashAmount', 'description']


class OpeningBalanceSerializer(serializers.ModelSerializer):
    bankAmount = serializers.DecimalField(max_digits=10, decimal_places=2, source='bank_amount')
    cashAmount = serializers.DecimalField(max_digits=10, decimal_places=2, source='cash_amount')
    date = serializers.DateTimeField()

    class Meta:
        model = OpeningBalance
        fields = ['id', 'account', 'date', 'bankAmount', 'cashAmount', 'description']
