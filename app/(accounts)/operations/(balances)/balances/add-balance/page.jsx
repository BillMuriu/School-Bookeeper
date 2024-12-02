"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import {
  operationsOpeningBalanceSchema,
  defaultOperationsOpeningBalanceValues,
} from "../operations-opening-balance-schema";
import AddOperationsOpeningBalanceForm from "../_components/add-operations-opening-balance";
import SkeletonLoader from "@/components/skeleton-loader";

const OperationsOpeningBalanceFormWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Adjust loading delay if needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <RhfProvider
      schema={operationsOpeningBalanceSchema}
      defaultValues={defaultOperationsOpeningBalanceValues}
    >
      <AddOperationsOpeningBalanceForm />
    </RhfProvider>
  );
};

export default OperationsOpeningBalanceFormWrapper;
