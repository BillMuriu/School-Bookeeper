"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import {
  paymentVoucherSchema,
  defaultPaymentVoucher,
} from "../paymentvoucher_schema";
import AddPaymentVoucherForm from "../_components/add-paymentvoucher-form";
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
      schema={paymentVoucherSchema}
      defaultValues={defaultPaymentVoucher}
    >
      <AddPaymentVoucherForm />
    </RhfProvider>
  );
};

export default TestFormWrapper;
