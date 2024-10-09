from django.urls import path
from .views import RMIDebitsView, RMICreditsView, RMILedgerView

urlpatterns = [
    path('rmi-debits/', RMIDebitsView.as_view(), name='rmi-debits'),
    path('rmi-credits/', RMICreditsView.as_view(), name='rmi-credits'),
    path('rmi-ledger/', RMILedgerView.as_view(), name='rmi-ledger'),
]
