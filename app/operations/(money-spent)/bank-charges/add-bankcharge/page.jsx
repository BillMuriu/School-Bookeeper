"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import { bankChargesSchema, defaultBankCharges } from "../bankcharges-schema";
import AddBankChargeForm from "../_components/add-operations-bankcharge";
import SkeletonLoader from "@/components/skeleton-loader";

const BankChargeFormWrapper = () => {
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
    <RhfProvider schema={bankChargesSchema} defaultValues={defaultBankCharges}>
      <AddBankChargeForm />
    </RhfProvider>
  );
};

export default BankChargeFormWrapper;
