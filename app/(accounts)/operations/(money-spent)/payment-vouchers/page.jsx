"use client";

import React from "react";
import { DataTable } from "@/components/tables/payments/advanced-operations-payment-voucher";
import { columns } from "./_components/payment-voucher-columns";
import { useOperationsPaymentVouchers } from "./_services/queries";
import DataTableSkeleton from "@/components/datatable-seleton-loader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
const PaymentVouchersPage = () => {
  const router = useRouter();
  const {
    data: paymentVouchers,
    isLoading,
    error,
  } = useOperationsPaymentVouchers();

  if (isLoading) return <DataTableSkeleton />;
  if (error) return <p>Error: {error.message}</p>;
  if (!paymentVouchers) return <p>No payment vouchers found</p>;

  console.log(paymentVouchers);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            router.push("/operations/payment-vouchers/add-paymentvoucher")
          }
        >
          <CirclePlus /> add a payment
        </Button>
      </div>
      <DataTable columns={columns} data={paymentVouchers} />
    </div>
  );
};

export default PaymentVouchersPage;
