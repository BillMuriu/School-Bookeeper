from rest_framework import generics
from .models import OpeningBalance, ClosingBalance
from .serializers import OpeningBalanceSerializer, ClosingBalanceSerializer

class OpeningBalanceListCreateView(generics.ListCreateAPIView):
    queryset = OpeningBalance.objects.all()
    serializer_class = OpeningBalanceSerializer

class OpeningBalanceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OpeningBalance.objects.all()
    serializer_class = OpeningBalanceSerializer



# closing balance views
class ClosingBalanceListCreateView(generics.ListCreateAPIView):
    serializer_class = ClosingBalanceSerializer

    def get_queryset(self):
        queryset = ClosingBalance.objects.all()
        cash_amount = self.request.query_params.get('cash_amount', None)
        if cash_amount is not None:
            queryset = queryset.filter(cash_amount=cash_amount)
        return queryset


class ClosingBalanceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClosingBalance.objects.all()
    serializer_class = ClosingBalanceSerializer