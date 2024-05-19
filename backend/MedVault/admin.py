from django.contrib import admin
from .models import CustomUser, Patient, Record, OTPVerification



admin.site.register(CustomUser)
admin.site.register(Patient)
admin.site.register(Record)
admin.site.register(OTPVerification)