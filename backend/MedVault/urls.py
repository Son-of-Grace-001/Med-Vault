from django.urls import path
from . views import SignUpView, LoginView, PatientRegView, PatientDisplayView, PatientRecordView,PatientReadRecordView, AddRecordView, SendOtpView,VerifyOtpView

urlpatterns = [
  path('signup/',  SignUpView.as_view()),
  path('login/',   LoginView.as_view()),
  path('register/', PatientRegView.as_view()),
  path('patient/', PatientDisplayView.as_view()),
  path('record/<int:id>/', PatientRecordView.as_view()),
  path('viewrecord/<int:id>/', PatientReadRecordView.as_view()),
  path('sendotp/<int:id>/', SendOtpView.as_view()),
  path('verifyotp/<int:id>/', VerifyOtpView.as_view()),
  path('update/', AddRecordView.as_view()),
]