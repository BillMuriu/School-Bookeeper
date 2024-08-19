# views.py
from rest_framework import generics
from .models import PettyCash
from .serializers import PettyCashSerializer

class PettyCashListCreateView(generics.ListCreateAPIView):
    queryset = PettyCash.objects.all()
    serializer_class = PettyCashSerializer

class PettyCashRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PettyCash.objects.all()
    serializer_class = PettyCashSerializer
