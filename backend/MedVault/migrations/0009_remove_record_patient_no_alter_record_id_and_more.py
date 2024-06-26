# Generated by Django 5.0.4 on 2024-05-18 21:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MedVault', '0008_record_patient_no'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='record',
            name='patient_no',
        ),
        migrations.AlterField(
            model_name='record',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='OTPVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('otp', models.CharField(max_length=6)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='MedVault.patient')),
            ],
        ),
    ]
