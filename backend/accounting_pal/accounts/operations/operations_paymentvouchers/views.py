# views.py
from rest_framework import generics
from .models import PaymentVoucher
from .serializers import PaymentVoucherSerializer

class CreatePaymentVoucherView(generics.CreateAPIView):
    queryset = PaymentVoucher.objects.all()
    serializer_class = PaymentVoucherSerializer

class ListPaymentVoucherView(generics.ListAPIView):
    queryset = PaymentVoucher.objects.all()
    serializer_class = PaymentVoucherSerializer

class RetrievePaymentVoucherView(generics.RetrieveAPIView):
    queryset = PaymentVoucher.objects.all()
    serializer_class = PaymentVoucherSerializer

class UpdatePaymentVoucherView(generics.UpdateAPIView):
    queryset = PaymentVoucher.objects.all()
    serializer_class = PaymentVoucherSerializer

class DeletePaymentVoucherView(generics.DestroyAPIView):
    queryset = PaymentVoucher.objects.all()
    serializer_class = PaymentVoucherSerializer

