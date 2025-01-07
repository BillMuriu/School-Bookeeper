"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import {
  rmiOpeningBalanceSchema,
  defaultRmiOpeningBalanceValues,
} from "../rmi-opening-balance-schema";
import AddOperationsOpeningBalanceForm from "../_components/add-rmi-opening-balance";
import SkeletonLoader from "@/components/skeleton-loader";

const RMIOpeningBalanceFormWrapper = () => {
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
      schema={rmiOpeningBalanceSchema}
      defaultValues={defaultRmiOpeningBalanceValues}
    >
      <AddOperationsOpeningBalanceForm />
    </RhfProvider>
  );
};

export default RMIOpeningBalanceFormWrapper;
