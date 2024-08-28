from rest_framework import serializers
from .models import SchoolFundReceipt

class SchoolFundReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolFundReceipt
        fields = ['id', 'account', 'received_from', 'student', 'cash_bank', 'total_amount', 'date']
