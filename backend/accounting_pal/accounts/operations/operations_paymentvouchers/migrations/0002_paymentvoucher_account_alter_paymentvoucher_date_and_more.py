# Generated by Django 5.1 on 2024-08-15 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations_paymentvouchers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentvoucher',
            name='account',
            field=models.CharField(default='default_account', max_length=255),
        ),
        migrations.AlterField(
            model_name='paymentvoucher',
            name='date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='paymentvoucher',
            name='payment_mode',
            field=models.CharField(choices=[('cash', 'Cash'), ('bank', 'Bank')], max_length=50),
        ),
        migrations.AlterField(
            model_name='paymentvoucher',
            name='voucher_no',
            field=models.PositiveIntegerField(),
        ),
    ]