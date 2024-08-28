from rest_framework import serializers
from .models import ClosingBalance, OpeningBalance
from django.utils import timezone

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


from rest_framework import serializers

class BalanceCarriedForwardSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    account = serializers.CharField(max_length=100)
    date = serializers.DateField()  # Use DateField if you only need the date
    bankAmount = serializers.DecimalField(max_digits=10, decimal_places=2)
    cashAmount = serializers.DecimalField(max_digits=10, decimal_places=2)
    description = serializers.CharField()

    def validate(self, data):
        """
        Check that the date is the first of the current month.
        """
        today = timezone.now().date()
        if data['date'] != today.replace(day=1):
            raise serializers.ValidationError("Date must be the first of the current month.")
        return data

class RunningBalanceSerializer(serializers.Serializer):
    account = serializers.CharField(max_length=255)
    date = serializers.DateField()
    bankAmount = serializers.DecimalField(max_digits=10, decimal_places=2)
    cashAmount = serializers.DecimalField(max_digits=10, decimal_places=2)