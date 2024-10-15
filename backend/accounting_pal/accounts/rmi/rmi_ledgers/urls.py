from django.urls import path
from .views import RMILedgerView

urlpatterns = [
    path('', RMILedgerView.as_view(), name='rmi-ledger'),
]
