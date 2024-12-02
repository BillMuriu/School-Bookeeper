"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { schoolFundReceiptSchema } from "../../school-fund-receipt-schema";
import EditDeleteSchoolFundReceiptForm from "../../_components/edit-school-fund-receipt-form";
import { useSchoolFundReceipt } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const EditDeleteSchoolFundReceiptWrapper = ({ params }) => {
  const receiptId = params?.id;

  // Use the query to fetch receipt data
  const { data: receipt, isLoading, error } = useSchoolFundReceipt(receiptId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!receipt) return <p>No receipt data found</p>;

  return (
    <RhfProvider
      schema={schoolFundReceiptSchema}
      defaultValues={{
        account: receipt.account || "school_fund_account",
        receivedFrom: receipt.received_from || "",
        cashBank: receipt.cash_bank || "bank",
        totalAmount: receipt.total_amount ?? null,
        student: receipt.student ?? null,
        date: receipt.date ? new Date(receipt.date) : new Date("2024-08-01"),
      }}
    >
      <EditDeleteSchoolFundReceiptForm receiptId={receiptId} />
    </RhfProvider>
  );
};

export default EditDeleteSchoolFundReceiptWrapper;
