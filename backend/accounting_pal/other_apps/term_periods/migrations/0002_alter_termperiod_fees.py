# Generated by Django 5.1 on 2024-09-24 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('term_periods', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='termperiod',
            name='fees',
            field=models.DecimalField(decimal_places=2, help_text='The fee amount for each student for the term', max_digits=10),
        ),
    ]
