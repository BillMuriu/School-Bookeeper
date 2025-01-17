"use client";

import React from "react";
import { SchoolFundPaymentsDataTable } from "@/components/tables/payments/schoolfund-payments/advanced-schoolfund-payment-voucher";
import { columns } from "./_components/payment-voucher-columns";
import { useSchoolFundPaymentVouchers } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const PaymentVouchersPage = () => {
  const {
    data: paymentVouchers,
    isLoading,
    error,
  } = useSchoolFundPaymentVouchers();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!paymentVouchers) return <p>No payment vouchers found</p>;

  console.log(paymentVouchers);

  return (
    <div>
      <h1>School Fund Payment Vouchers</h1>
      <SchoolFundPaymentsDataTable columns={columns} data={paymentVouchers} />
    </div>
  );
};

export default PaymentVouchersPage;
