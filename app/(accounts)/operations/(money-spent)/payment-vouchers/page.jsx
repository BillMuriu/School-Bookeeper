"use client";

import React from "react";
// import { DataTable } from "@/components/tables/operations-paymentvoucher-table";
import { DataTable } from "@/components/tables/payments/advanced-operations-payment-voucher";
import { columns } from "./_components/payment-voucher-columns";
import { useOperationsPaymentVouchers } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
import { dummyPayments } from "@/data/dummy-paymentvoucher";

const PaymentVouchersPage = () => {
  // const {
  //   data: paymentVouchers,
  //   isLoading,
  //   error,
  // } = useOperationsPaymentVouchers();

  // if (isLoading) return <DataTableSkeleton />;
  // if (error) return <p>Error: {error.message}</p>;
  // if (!paymentVouchers) return <p>No payment vouchers found</p>;

  // console.log(paymentVouchers);

  return (
    <div>
      <h1>Operations Payment Vouchers</h1>
      <DataTable columns={columns} data={dummyPayments} />
    </div>
  );
};

export default PaymentVouchersPage;
