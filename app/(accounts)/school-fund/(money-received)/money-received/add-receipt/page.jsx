"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import {
  schoolFundReceiptSchema,
  defaultSchoolFundReceipt,
} from "../school-fund-receipt-schema";
import SchoolFundReceiptForm from "../_components/school-fund-receipt-form";
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
    return <SkeletonLoader />;
  }

  return (
    <RhfProvider
      schema={schoolFundReceiptSchema} // Updated to use school fund schema
      defaultValues={defaultSchoolFundReceipt} // Updated to use school fund default values
    >
      <SchoolFundReceiptForm />{" "}
      {/* Make sure the ReceiptForm handles the school fund fields */}
    </RhfProvider>
  );
};

export default TestFormWrapper;
