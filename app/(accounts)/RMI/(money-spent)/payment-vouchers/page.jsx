"use client";

import React from "react";
import { DataTable } from "@/components/tables/payments/advanced-operations-payment-voucher";
import { columns } from "./_components/payment-voucher-columns";
import { useRmiPaymentVouchers } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const PaymentVouchersPage = () => {
  const { data: paymentVouchers, isLoading, error } = useRmiPaymentVouchers();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!paymentVouchers) return <p>No payment vouchers found</p>;

  console.log(paymentVouchers);

  return (
    <div>
      <h1>All Payment Vouchers</h1>
      <DataTable columns={columns} data={paymentVouchers} />
    </div>
  );
};

export default PaymentVouchersPage;
