# Generated by Django 5.1 on 2024-08-28 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TermPeriod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('term_name', models.CharField(choices=[('Term 1', 'Term 1'), ('Term 2', 'Term 2'), ('Term 3', 'Term 3')], help_text='Name of the term (e.g., Term 1, Term 2, Term 3)', max_length=20)),
                ('start_date', models.DateField(help_text='Start date of the term')),
                ('end_date', models.DateField(help_text='End date of the term')),
                ('year', models.PositiveIntegerField(help_text='Academic year associated with the term (e.g., 2024)')),
                ('fees', models.DecimalField(decimal_places=2, help_text='The fee amount for the term', max_digits=10)),
            ],
        ),
    ]