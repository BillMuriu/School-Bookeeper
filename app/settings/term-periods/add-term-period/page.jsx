"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import { termPeriodSchema, defaultTermPeriod } from "../term-periods-schema";
import TermPeriodForm from "../_components/term-period-form"; // Updated form component
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
      schema={termPeriodSchema} // Updated schema
      defaultValues={defaultTermPeriod} // Updated default values
    >
      <TermPeriodForm />
    </RhfProvider>
  );
};

export default TestFormWrapper;
