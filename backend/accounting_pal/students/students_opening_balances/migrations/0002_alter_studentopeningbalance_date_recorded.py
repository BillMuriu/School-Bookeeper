# Generated by Django 5.1 on 2024-08-28 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students_opening_balances', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentopeningbalance',
            name='date_recorded',
            field=models.DateField(help_text='Date when the opening balance was recorded'),
        ),
    ]