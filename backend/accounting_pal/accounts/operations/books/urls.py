# urls.py
from django.urls import path
from .views import OperationsPaymentsMoneyOutView, ReceiptsMoneyInView

urlpatterns = [
    path('payments-money-out/', OperationsPaymentsMoneyOutView.as_view(), name='payments-money-out'),
    path('receipts/money-in/<str:account>/<int:year>/<int:month>/', ReceiptsMoneyInView.as_view(), name='receipts-money-in'),
]
