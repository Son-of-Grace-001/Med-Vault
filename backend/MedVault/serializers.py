from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from . models  import Patient, Record

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'name', 'address', 'license_number']



class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'

class NewRecordSerializer(serializers.ModelSerializer):
    doc = serializers.DateField()
    dr_name = serializers.CharField()
    complaint = serializers.CharField()
    prescription= serializers.CharField()
    hospital_name = serializers.CharField()
    diagnose = serializers.CharField()
    class Meta:
        model = Record
        fields = ['doc', 'dr_name', 'complaint', 'diagnose', 'prescription', 'hospital_name']
