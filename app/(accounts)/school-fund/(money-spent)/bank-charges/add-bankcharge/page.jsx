"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import { bankChargesSchema, defaultBankCharges } from "../bankcharges-schema";
import AddSchoolFundBankChargeForm from "../_components/add-schoolfund-bankcharge";
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
      <AddSchoolFundBankChargeForm />
    </RhfProvider>
  );
};

export default BankChargeFormWrapper;
