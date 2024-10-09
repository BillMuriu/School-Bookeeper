from django.urls import path
from .views import RMIDebitsView

urlpatterns = [
    path('rmi-debits/', RMIDebitsView.as_view(), name='rmi-debits'),
]
