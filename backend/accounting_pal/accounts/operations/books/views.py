# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .cashbook_utils import get_payments_money_out, get_receipts_money_in
from .serializers import ReceiptsSerializer

class OperationsPaymentsMoneyOutView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            payments_data = get_payments_money_out()  # Call the utility function to fetch payments
            return Response(payments_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ReceiptsMoneyInView(APIView):
    def get(self, request, account, year, month):
        # Call the function to get receipts data
        try:
            receipts_data = get_receipts_money_in(account, year, month)
            return Response(receipts_data, status=status.HTTP_200_OK)  # Return data directly
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
