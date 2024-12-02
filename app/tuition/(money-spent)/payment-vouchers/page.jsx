"use client";

import React from "react";
import { DataTable } from "@/components/tables/operations-paymentvoucher-table"; // Adjusted table component
import { columns } from "./_components/payment-voucher-columns"; // Ensure columns are correct for tuition payment vouchers
import { useTuitionPaymentVouchers } from "./_services/queries"; // Adjusted hook for tuition payment vouchers
import DataTableSkeleton from "@/components/datatable-seleton-loader";

const PaymentVouchersPage = () => {
  // Adjusted hook for tuition payment vouchers
  const {
    data: paymentVouchers,
    isLoading,
    error,
  } = useTuitionPaymentVouchers();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!paymentVouchers) return <p>No payment vouchers found</p>;

  console.log(paymentVouchers);

  return (
    <div>
      <h1>All Tuition Payment Vouchers</h1> {/* Updated heading */}
      <DataTable columns={columns} data={paymentVouchers} />
    </div>
  );
};

export default PaymentVouchersPage;