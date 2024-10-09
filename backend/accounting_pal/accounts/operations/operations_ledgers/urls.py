from django.urls import path
from .views import RMILedgerView, BankChargeLedgerView 

urlpatterns = [
    path('rmi-ledger/', RMILedgerView.as_view(), name='rmi-ledger'),
     path('bankcharge-ledger/', BankChargeLedgerView.as_view(), name='bankcharge-ledger'),
]
