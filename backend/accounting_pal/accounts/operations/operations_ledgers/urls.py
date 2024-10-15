from django.urls import path
from .views import BankChargeLedgerView, SchoolFundLedgerView, TuitionLedgerView, OtherVoteheadsLedgerView

urlpatterns = [
    path('bankcharge-ledger/', BankChargeLedgerView.as_view(), name='bankcharge-ledger'),
    path('school-fund-ledger/', SchoolFundLedgerView.as_view(), name='school-fund-ledger'),
    path('tuition-ledger/', TuitionLedgerView.as_view(), name='tuition-ledger'),
    path('other-voteheads-ledger/', OtherVoteheadsLedgerView.as_view(), name='other-voteheads-ledger'),
]
