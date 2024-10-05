from rest_framework import serializers
from .models import OperationReceipt
from accounts.operations.operations_pettycash.models import PettyCash
from accounts.operations.operations_pettycash.serializers import PettyCashSerializer

class OperationReceiptSerializer(serializers.ModelSerializer):
    receivedFrom = serializers.CharField(source='received_from')
    cashBank = serializers.CharField(source='cash_bank')
    totalAmount = serializers.DecimalField(source='total_amount', max_digits=10, decimal_places=2)
    rmiFund = serializers.DecimalField(source='rmi_fund', max_digits=10, decimal_places=2)
    otherVoteheads = serializers.DecimalField(source='other_voteheads', max_digits=10, decimal_places=2)
    
    # Use PrimaryKeyRelatedField for input, allowing null values
    petty_cash = serializers.PrimaryKeyRelatedField(queryset=PettyCash.objects.all(), required=False, allow_null=True)

    class Meta:
        model = OperationReceipt
        fields = ['id', 'account', 'receivedFrom', 'cashBank', 'totalAmount', 'rmiFund', 'otherVoteheads', 'date', 'petty_cash']

    # Add this method to include related PettyCash details on read operations
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Include the petty cash details when viewing the receipt
        if instance.petty_cash:
            representation['petty_cash'] = PettyCashSerializer(instance.petty_cash).data
        
        return representation
