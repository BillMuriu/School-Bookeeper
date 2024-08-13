"use client";

import { RhfProvider } from "@/contexts/rhf-provider";
import { operationReceiptSchema, defaultOperationReceipt } from "../schema";
import ReceiptForm from "../components/operation-receipt-form";
const TestFormWrapper = () => {
  return (
    <RhfProvider
      schema={operationReceiptSchema}
      defaultValues={defaultOperationReceipt}
    >
      <ReceiptForm />
    </RhfProvider>
  );
};

export default TestFormWrapper;
