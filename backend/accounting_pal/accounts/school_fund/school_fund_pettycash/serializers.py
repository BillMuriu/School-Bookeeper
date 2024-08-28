from rest_framework import serializers
from .models import SchoolFundPettyCash

class SchoolFundPettyCashSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolFundPettyCash
        fields = ['id', 'account', 'payee_name', 'cheque_number', 'amount', 'description', 'date_issued']
