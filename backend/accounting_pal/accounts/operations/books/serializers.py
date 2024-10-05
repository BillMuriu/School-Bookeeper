# serializers.py
from rest_framework import serializers

class OperationsPaymentsMoneyOutSerializer(serializers.Serializer):
    type = serializers.CharField(max_length=50)
    voucher_no = serializers.CharField(max_length=50, allow_blank=True)
    cheque_no = serializers.CharField(max_length=50, allow_blank=True)
    cash = serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True)
    bank = serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True)
    bank_charge = serializers.DecimalField(max_digits=10, decimal_places=2, allow_null=True)
    description = serializers.CharField(allow_blank=True)
    date = serializers.DateTimeField()

class ReceiptsSerializer(serializers.Serializer):
    from_whom = serializers.CharField(source='received_from')  # Use the correct model field name
    receipt_no = serializers.CharField(source='receipt_no')  # If you have a field for receipt number
    cash = serializers.CharField(source='total_amount')  # Adjust accordingly if needed
    bank = serializers.CharField(source='bank')  # Adjust according to your model
    rmi = serializers.CharField(source='rmi_fund')  # Use the correct model field name
    other_voteheads = serializers.CharField(source='other_voteheads')