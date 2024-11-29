"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { tuitionReceiptSchema, defaultTuitionReceipt } from "../../schema"; // Updated schema and default values import
import EditTuitionReceiptForm from "../../_components/edit-tuition-receipt-form"; // Ensure correct file path
import { useTuitionReceipt } from "../../_services/queries"; // Updated query hook
import SkeletonLoader from "@/components/skeleton-loader";

const TestFormWrapper = ({ params }) => {
  const receiptId = params?.id;

  // Use the query to fetch receipt data
  const { data: receipt, isLoading, error } = useTuitionReceipt(receiptId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!receipt) return <p>No receipt data found</p>;

  return (
    <RhfProvider
      schema={tuitionReceiptSchema}
      defaultValues={{
        account: receipt.account || defaultTuitionReceipt.account, // Default value if not present
        receivedFrom:
          receipt.received_from || defaultTuitionReceipt.receivedFrom, // CamelCase for schema compatibility
        cashBank: receipt.cash_bank || defaultTuitionReceipt.cashBank, // Adjust for camelCase
        totalAmount:
          receipt.total_amount?.toString() || defaultTuitionReceipt.totalAmount, // Ensure it's a string
        date: receipt.date
          ? new Date(receipt.date)
          : defaultTuitionReceipt.date, // Parse date
      }}
    >
      <EditTuitionReceiptForm receiptId={receiptId} />
    </RhfProvider>
  );
};

export default TestFormWrapper;
