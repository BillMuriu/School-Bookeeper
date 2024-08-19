from django.urls import path
from .views import (
    OpeningBalanceListCreateView, OpeningBalanceRetrieveUpdateDestroyView,
    ClosingBalanceListCreateView, ClosingBalanceRetrieveUpdateDestroyView,
    BalanceCarriedForwardView
    
)

urlpatterns = [
    # Opening Balance URLs
    path('opening-balances/', OpeningBalanceListCreateView.as_view(), name='opening-balance-list-create'),
    path('opening-balances/<int:pk>/', OpeningBalanceRetrieveUpdateDestroyView.as_view(), name='opening-balance-detail'),

    # Closing Balance URLs
    path('closing-balances/', ClosingBalanceListCreateView.as_view(), name='closing-balance-list-create'),
    path('closing-balances/<int:pk>/', ClosingBalanceRetrieveUpdateDestroyView.as_view(), name='closing-balance-detail'),

    path('balances-carried-forward/', BalanceCarriedForwardView.as_view(), name='balance-carried-forward'),
]
