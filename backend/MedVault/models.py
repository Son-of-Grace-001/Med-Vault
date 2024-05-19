# models.py

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, address, license_number, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            address=address,
            license_number=license_number
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, address, license_number, password):
        user = self.create_user(
            email=email,
            name=name,
            address=address,
            license_number=license_number,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    license_number =models.BigIntegerField()
    created = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'address', 'license_number']

    def __str__(self):
        return self.name


class Patient (models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.EmailField()
    nationality = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    age = models.IntegerField()
    date = models.DateField(max_length=255)
    gender = models.CharField(max_length=255)
    phone = models.CharField (max_length=25)

    def __str__(self):
        return self.firstname


class Record (models.Model):
    doc = models.DateField()
    dr_name = models.CharField(max_length=200)
    complaint = models.CharField(max_length=200)
    diagnose = models.CharField(max_length=250)
    prescription = models.TextField()
    hospital_name = models.CharField(max_length=250)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return self.hospital_name  

class OTPVerification(models.Model):
    user = models.ForeignKey(Patient, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.id} - {self.otp}"  

