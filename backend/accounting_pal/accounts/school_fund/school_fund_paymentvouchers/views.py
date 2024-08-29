from rest_framework import generics
from .models import SchoolFundPaymentVoucher
from .serializers import SchoolFundPaymentVoucherSerializer

class SchoolFundPaymentVoucherListCreateView(generics.ListCreateAPIView):
    queryset = SchoolFundPaymentVoucher.objects.all()
    serializer_class = SchoolFundPaymentVoucherSerializer

class SchoolFundPaymentVoucherRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SchoolFundPaymentVoucher.objects.all()
    serializer_class = SchoolFundPaymentVoucherSerializer
