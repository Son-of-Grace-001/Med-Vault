from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.core.validators import validate_email
User = get_user_model()
from . models import Patient, Record, Patient, OTPVerification
from .serializers import PatientSerializer, RecordSerializer, NewRecordSerializer
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.generics import get_object_or_404
from django.http import JsonResponse
from rest_framework.exceptions import ValidationError
import random
import logging
from rest_framework import permissions



logger = logging.getLogger(__name__)

class SignUpView(APIView):
    def post(self, request):
        email = request.data.get('email')
        name = request.data.get('name')
        address = request.data.get('address')
        license_number = request.data.get('license')
        password = request.data.get('password')
        cpassword = request.data.get('cpassword')

        if password != cpassword:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        if not (password and email and name and address and license_number):
            return Response({'error': 'All fields must be provided'}, status=status.HTTP_400_BAD_REQUEST)
        if '@' not in email or '.' not in email:
            return Response({'error': 'Invalid email address'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if user with provided email already exists
        if User.objects.filter(email=email).exists():
            return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        print(license_number)

        # Create and save user
        user = User.objects.create(
            email=email,
            name=name,
            address=address,
            license_number=license_number,
        )
        user.set_password(password)  # Set password securely
        user.save()

        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


class LoginView (APIView):
    def post (self, request):
        email = request.data.get ('email')
        password = request.data.get ('password')

        User = authenticate (password=password, email=email)

        if User:
            # Perform additional actions (e.g., generate token)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

class PatientRegView(APIView):
    def post(self, request):
        firstname = request.data.get('firstname')
        lastname = request.data.get('lastname')
        email = request.data.get('email')
        nationality = request.data.get('nationality')
        state = request.data.get('state')
        address = request.data.get('address')
        age = request.data.get('age')
        date = request.data.get('dob')
        gender = request.data.get('gender')
        phone = request.data.get('phone')

        if not (firstname and lastname and email and nationality and state and address and age and date and gender and phone):
            return Response({'error': 'All fields must be provided'}, status=status.HTTP_400_BAD_REQUEST)
        if '@' not in email or '.' not in email:
            return Response({'error': 'Invalid email address'}, status=status.HTTP_400_BAD_REQUEST)
        if Patient.objects.filter(email=email).exists():
            return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        patient = Patient.objects.create(
            email=email,
            firstname=firstname,
            lastname=lastname,
            nationality=nationality,
            state=state,
            address=address,
            age=age,
            date=date,
            gender=gender,
            phone=phone
        )
        patient.save()

        user_subject = "Registration"
        user_message = f"Hello {firstname} {lastname},\n\nWe at MedVault are grateful for the trust you have in us.\n\nThank you for choosing MedVault.\n\nWarm Regards,\nMedVault\n"
        send_mail(user_subject, user_message, settings.EMAIL_HOST_USER, [email])

        # Return a success response
        return Response({'message': 'Patient registered successfully'}, status=status.HTTP_201_CREATED)


class PatientDisplayView (APIView):
    def get (self, request):
        patients = Patient.objects.all ().order_by("firstname")
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

class PatientRecordView(APIView):
    def get(self, request, id):
        try:
            patient = Patient.objects.get(id=id)
            records = Record.objects.filter(patient=patient)
            serializer = RecordSerializer(records, many=True)
            patient_firstname = patient.firstname
            patient_lastname = patient.lastname
            patient_email = patient.email
            return JsonResponse({"patient_firstname": patient_firstname, "patient_email": patient_email, "patient_lastname": patient_lastname, "records": serializer.data}, safe=False)
        except Patient.DoesNotExist:
            return JsonResponse({"error": "Patient not found"}, status=404)
        
class PatientReadRecordView(APIView):
    def get(self, request, id):
        try:
            record = Record.objects.filter(id=id).order_by('doc').last()
            serializer = RecordSerializer(record)  # Remove many=True since you're fetching a single record
            return Response(serializer.data)
        except Record.DoesNotExist:
            return Response({"error": "Record not found"}, status=404)


class AddRecordView(APIView):
    def post(self, request):
        id = request.data.get('id')
        doc = request.data.get('doc')
        doc_name = request.data.get('docName')
        complaint = request.data.get('complaint')
        diagnose = request.data.get('diagnose')
        prescription = request.data.get('prescription')
        hospital_name = request.data.get('hospitalName')

        print(id)
        print(doc)
        print(doc_name)
        print(diagnose)
        print(prescription)
        print(hospital_name)
        
        # Check if any of the required fields are empty
        if not all([ doc, doc_name, complaint, diagnose, prescription, hospital_name]):
            raise ValidationError("All fields are required")
        
        # Assuming 'Record' is your model and you want to create a new record
        record = Record.objects.create(
            id=id,
            doc=doc,
            dr_name=doc_name,
            complaint=complaint,
            diagnose=diagnose,
            prescription=prescription,
            hospital_name=hospital_name
        )

        record.save()
        
        # You might want to return some response indicating success
        return Response({"message": "Record created successfully"})
    
class SendOtpView(APIView):
    def post(self, request, id):
        try:
            register = Patient.objects.get(id=id)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

        send_otp = random.randint(100000, 999999)
        print(send_otp)
        
        user_subject = "OTP Code"
        user_message = f"Hello {register.firstname} {register.lastname},\n\nYour OTP code is {send_otp}.\n\nThank you for choosing MedVault.\n\nWarm Regards,\nMedVault\n"
        send_mail(user_subject, user_message, settings.EMAIL_HOST_USER, [register.email])

        # Save the OTP to the database
        OTPVerification.objects.create(user=register, otp=send_otp)
        

        return Response ({"message": "Otp sent successfully"})
    
class VerifyOtpView(APIView):
    def put(self, request, id):
        try:
            register = Patient.objects.get(id=id)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)
        
        otp = request.data.get('otp')
        if not otp:
            return Response({"error": "OTP not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            otp_verification = OTPVerification.objects.get(user=register, otp=otp)
            otp_verification.delete()  # Optionally delete the OTP record after successful verification
            return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)
        except OTPVerification.DoesNotExist:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)


        
class UpdateRecordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NewRecordSerializer
    def post(self, request, id):
        user = request.user
        patient= get_object_or_404(Patient, pk= id)
        serializer = self.serializer_class(data= request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save(patient=patient)
        return Response(data = serializer.data, status= 201)