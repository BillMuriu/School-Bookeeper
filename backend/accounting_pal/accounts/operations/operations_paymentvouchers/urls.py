# urls.py
from django.urls import path
from .views import (
    CreatePaymentVoucherView,
    ListPaymentVoucherView,
    RetrievePaymentVoucherView,
    UpdatePaymentVoucherView,
    DeletePaymentVoucherView,
)

urlpatterns = [
    path('create/', CreatePaymentVoucherView.as_view(), name='create-payment-voucher'),
    path('', ListPaymentVoucherView.as_view(), name='list-payment-vouchers'),
    path('<int:pk>/', RetrievePaymentVoucherView.as_view(), name='retrieve-payment-voucher'),
    path('<int:pk>/update/', UpdatePaymentVoucherView.as_view(), name='update-payment-voucher'),
    path('<int:pk>/delete/', DeletePaymentVoucherView.as_view(), name='delete-payment-voucher'),
]
