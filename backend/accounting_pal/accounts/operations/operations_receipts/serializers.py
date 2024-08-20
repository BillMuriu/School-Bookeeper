from rest_framework import serializers
from .models import OperationReceipt
from accounts.operations.operations_pettycash.serializers import PettyCashSerializer

class OperationReceiptSerializer(serializers.ModelSerializer):
    receivedFrom = serializers.CharField(source='received_from')
    cashBank = serializers.CharField(source='cash_bank')
    totalAmount = serializers.DecimalField(source='total_amount', max_digits=10, decimal_places=2)
    rmiFund = serializers.DecimalField(source='rmi_fund', max_digits=10, decimal_places=2)
    otherVotheads = serializers.DecimalField(source='other_voteheads', max_digits=10, decimal_places=2)
    petty_cash = PettyCashSerializer()  # Include the PettyCashSerializer

    class Meta:
        model = OperationReceipt
        fields = ['id', 'account', 'receivedFrom', 'cashBank', 'totalAmount', 'rmiFund', 'otherVotheads', 'date', 'petty_cash']
