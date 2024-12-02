"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { operationReceiptSchema } from "../../schema";
import EditReceiptForm from "../../_components/edit-operation-receipt-form";
import { useOperationsReceipt } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const TestFormWrapper = ({ params }) => {
  const receiptId = params?.id;

  // Use the query to fetch receipt data
  const { data: receipt, isLoading, error } = useOperationsReceipt(receiptId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!receipt) return <p>No receipt data found</p>;

  return (
    <RhfProvider
      schema={operationReceiptSchema}
      defaultValues={{
        account: receipt.account || "",
        receivedFrom: receipt.receivedFrom || "",
        cashBank: receipt.cashBank || "bank",
        totalAmount: receipt.totalAmount ?? null,
        rmiFund: receipt.rmiFund ?? null,
        otherVotheads: receipt.otherVotheads ?? null,
        date: receipt.date ? new Date(receipt.date) : new Date("2024-08-01"),
      }}
    >
      <EditReceiptForm receiptId={receiptId} />
    </RhfProvider>
  );
};

export default TestFormWrapper;
