from django.urls import path
from .views import SchoolFundPaymentVoucherListCreateView, SchoolFundPaymentVoucherRetrieveUpdateDestroyView

urlpatterns = [
    path('', SchoolFundPaymentVoucherListCreateView.as_view(), name='schoolfundpaymentvoucher-list-create'),
    path('<int:pk>/', SchoolFundPaymentVoucherRetrieveUpdateDestroyView.as_view(), name='schoolfundpaymentvoucher-detail'),
]
