"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import { operationReceiptSchema, defaultOperationReceipt } from "../schema";
import ReceiptForm from "../_components/operation-receipt-form";
import SkeletonLoader from "@/components/skeleton-loader";
const TestFormWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />; // Render it with the correct name
  }

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
