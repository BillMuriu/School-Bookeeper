# serializers.py
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'id', 'admission_number', 'first_name', 'last_name', 'date_of_birth', 
            'gender', 'admission_date', 'grade_class_level', 
            'guardians_name', 'guardians_phone_number'
        ]
