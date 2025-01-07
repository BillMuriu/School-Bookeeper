"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import {
  tuitionOpeningBalanceSchema,
  defaultTuitionOpeningBalanceValues,
} from "../rmi-opening-balance-schema";

import AddTuitionOpeningBalanceForm from "../_components/add-tuition-opening-balance";
import SkeletonLoader from "@/components/skeleton-loader";

const TuitionOpeningBalanceFormWrapper = () => {
  // Updated name for tuition
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
      schema={tuitionOpeningBalanceSchema} // Updated schema for tuition
      defaultValues={defaultTuitionOpeningBalanceValues} // Updated default values for tuition
    >
      <AddTuitionOpeningBalanceForm />
    </RhfProvider>
  );
};

export default TuitionOpeningBalanceFormWrapper; // Updated export name
