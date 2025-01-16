"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import { pettyCashSchema, defaultPettyCash } from "../pettycash-schema";
import AddSchoolFundPettyCashForm from "../_components/add-pettycash-form";
import SkeletonLoader from "@/components/skeleton-loader";

const TestPettyCashFormWrapper = () => {
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
    <RhfProvider schema={pettyCashSchema} defaultValues={defaultPettyCash}>
      <AddSchoolFundPettyCashForm />
    </RhfProvider>
  );
};

export default TestPettyCashFormWrapper;
