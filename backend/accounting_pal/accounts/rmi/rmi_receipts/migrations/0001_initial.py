# Generated by Django 5.1 on 2024-10-11 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RMIReceipt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account', models.CharField(choices=[('rmi_account', 'RMI Account')], default='rmi_account', max_length=50)),
                ('received_from', models.CharField(help_text='Name of the payer (could be a student or another entity)', max_length=100)),
                ('cash_bank', models.CharField(choices=[('cash', 'Cash'), ('bank', 'Bank')], max_length=4)),
                ('total_amount', models.DecimalField(decimal_places=2, help_text='Total amount received', max_digits=10)),
                ('date', models.DateTimeField(help_text='Date of receipt')),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
    ]