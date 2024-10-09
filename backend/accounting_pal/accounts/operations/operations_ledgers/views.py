from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .ledger_utils import get_rmi_debits, get_rmi_credits, get_rmi_ledger

class RMIDebitsView(APIView):
    def get(self, request, *args, **kwargs):
        # Extract start_date and end_date from query parameters
        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')

        # Ensure both start_date and end_date are provided
        if not start_date_str or not end_date_str:
            return Response({"error": "start_date and end_date are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Convert strings to datetime objects
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # Call the function from utils to get RMI debits
        debits = get_rmi_debits(start_date, end_date)

        # Return the debits in the response
        return Response({"debits": debits}, status=status.HTTP_200_OK)


class RMICreditsView(APIView):
    def get(self, request, *args, **kwargs):
        # Extract start_date and end_date from query parameters
        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')

        # Ensure both start_date and end_date are provided
        if not start_date_str or not end_date_str:
            return Response({"error": "start_date and end_date are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Convert strings to datetime objects
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # Call the function to get RMI credits
        credits = get_rmi_credits(start_date, end_date)

        # Return the credits in the response
        return Response({"credits": credits}, status=status.HTTP_200_OK)


class RMILedgerView(APIView):
    def get(self, request, *args, **kwargs):
        # Extract start_date and end_date from query parameters
        start_date_str = request.query_params.get('start_date')
        end_date_str = request.query_params.get('end_date')

        # Ensure both start_date and end_date are provided
        if not start_date_str or not end_date_str:
            return Response({"error": "start_date and end_date are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Convert strings to datetime objects
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        except ValueError:
            return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # Call the function to get the RMI ledger
        ledger = get_rmi_ledger(start_date, end_date)

        # Return the ledger in the response
        return Response({"ledger": ledger}, status=status.HTTP_200_OK)
