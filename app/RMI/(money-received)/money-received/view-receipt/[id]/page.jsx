"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { rmiReceiptSchema, defaultRmiReceipt } from "../../schema"; // Import the default schema
import EditRmiReceiptForm from "../../_components/edit-rmi-receipt-form"; // Ensure the import matches your file name
import { useRmiReceipt } from "../../_services/queries";
import SkeletonLoader from "@/components/skeleton-loader";

const TestFormWrapper = ({ params }) => {
  const receiptId = params?.id;

  // Use the query to fetch receipt data
  const { data: receipt, isLoading, error } = useRmiReceipt(receiptId);

  if (isLoading) return <SkeletonLoader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!receipt) return <p>No receipt data found</p>;

  return (
    <RhfProvider
      schema={rmiReceiptSchema}
      defaultValues={{
        account: receipt.account || defaultRmiReceipt.account, // Default value if not present
        received_from: receipt.received_from || defaultRmiReceipt.received_from, // Adjusted for API field name
        cash_bank: receipt.cash_bank || defaultRmiReceipt.cash_bank, // Adjusted for API field name
        total_amount:
          receipt.total_amount?.toString() || defaultRmiReceipt.total_amount, // Ensure it's a string
        date: receipt.date ? new Date(receipt.date) : defaultRmiReceipt.date, // Default to the provided date or current date
      }}
    >
      <EditRmiReceiptForm receiptId={receiptId} />
    </RhfProvider>
  );
};

export default TestFormWrapper;
