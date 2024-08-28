# serializers.py
from rest_framework import serializers
from .models import Student
from students.students_opening_balances.models import StudentOpeningBalance
from accounts.school_fund.school_fund_receipts.models import SchoolFundReceipt
from other_apps.term_periods.models import TermPeriod
from django.db.models import Sum

class StudentSerializer(serializers.ModelSerializer):
    opening_balance = serializers.SerializerMethodField()
    total_fees = serializers.SerializerMethodField()
    total_receipts = serializers.SerializerMethodField()
    balance = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            'id', 'admission_number', 'first_name', 'last_name', 'date_of_birth', 
            'gender', 'admission_date', 'grade_class_level', 
            'guardians_name', 'guardians_phone_number', 
            'opening_balance', 'total_fees', 'total_receipts', 'balance'
        ]

    def get_opening_balance(self, obj):
        opening_balance = StudentOpeningBalance.objects.filter(student=obj).first()
        if opening_balance:
            return opening_balance.balance
        return None

    def get_total_fees(self, obj):
        opening_balance = StudentOpeningBalance.objects.filter(student=obj).first()
        if not opening_balance:
            return None
        
        terms = TermPeriod.objects.filter(start_date__gte=opening_balance.date_recorded)
        total_fees = sum(term.fees for term in terms)
        return total_fees

    def get_total_receipts(self, obj):
        total_receipts = SchoolFundReceipt.objects.filter(student=obj).aggregate(
            total_amount=Sum('total_amount')
        )['total_amount'] or 0
        return total_receipts

    def get_balance(self, obj):
        opening_balance = self.get_opening_balance(obj)
        if opening_balance is None:
            return None
        
        total_fees = self.get_total_fees(obj)
        total_receipts = self.get_total_receipts(obj)

        balance = (opening_balance + total_fees) - total_receipts
        return balance
