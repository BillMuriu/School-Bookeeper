from rest_framework import generics
from .models import SchoolFundPettyCash
from .serializers import SchoolFundPettyCashSerializer

# List all petty cash records or create a new one
class SchoolFundPettyCashListCreateView(generics.ListCreateAPIView):
    queryset = SchoolFundPettyCash.objects.all()
    serializer_class = SchoolFundPettyCashSerializer

# Retrieve, update, or delete a specific petty cash record
class SchoolFundPettyCashRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SchoolFundPettyCash.objects.all()
    serializer_class = SchoolFundPettyCashSerializer
    lookup_field = 'id'
