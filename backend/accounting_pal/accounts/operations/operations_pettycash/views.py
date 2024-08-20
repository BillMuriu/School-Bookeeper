from rest_framework import generics
from rest_framework.response import Response
from .models import PettyCash
from accounts.operations.operations_receipts.models import OperationReceipt
from .serializers import PettyCashSerializer

class PettyCashListCreateView(generics.ListCreateAPIView):
    queryset = PettyCash.objects.all()
    serializer_class = PettyCashSerializer

    def perform_create(self, serializer):
        petty_cash = serializer.save()
        
        # Create a corresponding OperationReceipt
        receipt = OperationReceipt.objects.create(
            account=petty_cash.account,
            received_from='pettycash',
            cash_bank='cash',
            total_amount=petty_cash.amount,
            rmi_fund=0.00,
            other_voteheads=0.00,
            date=petty_cash.date_issued,
            petty_cash=petty_cash
        )
        
        # Optionally, update the PettyCash instance with the receipt id if needed
        petty_cash.receipt = receipt
        petty_cash.save()

class PettyCashRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PettyCash.objects.all()
    serializer_class = PettyCashSerializer

    def update(self, request, *args, **kwargs):
        # Retrieve the PettyCash instance
        petty_cash = self.get_object()

        # Get the old values before update
        old_amount = petty_cash.amount
        old_date = petty_cash.date_issued
        
        # Update PettyCash instance
        partial = kwargs.pop('partial', False)
        serializer = self.get_serializer(petty_cash, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Update corresponding OperationReceipt
        receipt = petty_cash.receipt
        if receipt:
            receipt.total_amount = serializer.validated_data.get('amount', old_amount)
            receipt.date = serializer.validated_data.get('date_issued', old_date)
            receipt.save()

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        # Retrieve the PettyCash instance
        petty_cash = self.get_object()

        # Delete the associated OperationReceipt if it exists
        receipt = petty_cash.receipt
        if receipt:
            receipt.delete()

        # Delete the PettyCash instance
        return super().destroy(request, *args, **kwargs)
