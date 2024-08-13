"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { operationReceiptSchema } from "../../schema";
import EditReceiptForm from "../../components/edit-operation-receipt-form";
import { useOperationsReceipt } from "../../services/queries";

// Function to format date to mm/dd/yy
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

const TestFormWrapper = ({ params }) => {
  const receiptId = params?.id;

  // Use the query to fetch receipt data
  const { data: receipt, isLoading, error } = useOperationsReceipt(receiptId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!receipt) return <p>No receipt data found</p>;

  return (
    <RhfProvider
      schema={operationReceiptSchema}
      defaultValues={{
        account: receipt.account || "Default Account",
        receivedFrom: receipt.receivedFrom || "Default Source",
        cashBank: receipt.cashBank || "bank",
        totalAmount: receipt.totalAmount ?? null,
        rmiFund: receipt.rmiFund ?? null,
        otherVotheads: receipt.otherVotheads ?? null,
        date: receipt.date ? formatDate(receipt.date) : "08/01/24",
      }}
    >
      <EditReceiptForm receiptId={receiptId} />
    </RhfProvider>
  );
};

export default TestFormWrapper;
