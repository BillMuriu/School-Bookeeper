from rest_framework import generics, status
from .models import OpeningBalance, ClosingBalance
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from datetime import timedelta
from .serializers import OpeningBalanceSerializer, ClosingBalanceSerializer, BalanceCarriedForwardSerializer, RunningBalanceSerializer
from .utils import calculate_running_balance

class RunningBalanceView(APIView):
    def get(self, request, *args, **kwargs):
        account = request.query_params.get('account', 'operations')  # Default to 'operations' if not provided

        # Calculate running balance
        try:
            running_balance = calculate_running_balance(account)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize and return the response
        serializer = RunningBalanceSerializer(running_balance)
        return Response(serializer.data, status=status.HTTP_200_OK)

# balance carried forward
class BalanceCarriedForwardView(generics.GenericAPIView):
    serializer_class = BalanceCarriedForwardSerializer

    def get(self, request, *args, **kwargs):
        # Get the current date and calculate the first day of the current month
        today = timezone.now().date()
        first_day_of_current_month = today.replace(day=1)
        
        # Calculate the last month
        last_month = first_day_of_current_month - timedelta(days=1)
        last_month_year = last_month.year
        last_month_month = last_month.month
        
        # Fetch the closing balance for the previous month
        closing_balance = ClosingBalance.objects.filter(
            date__year=last_month_year,
            date__month=last_month_month
        ).first()  # Use first() to get the single closing balance
        
        if closing_balance:
            # Prepare the data for balance carried forward
            carried_forward_data = {
                'id': closing_balance.id,
                'account': closing_balance.account,
                'date': first_day_of_current_month,  # Set to first date of the current month
                'bankAmount': closing_balance.bank_amount,
                'cashAmount': closing_balance.cash_amount,
                'description': closing_balance.description
            }
            serializer = self.get_serializer(data=carried_forward_data)
            serializer.is_valid(raise_exception=True)
            return Response(serializer.validated_data)
        else:
            return Response({"detail": "No closing balance found for the previous month"}, status=404)

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