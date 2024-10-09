from django.urls import path
from .views import CalculateBalancesView

urlpatterns = [
    path('calculate_balances/', CalculateBalancesView.as_view(), name='calculate-balances'),
]
