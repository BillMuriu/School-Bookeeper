"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import {
  studentOpeningBalanceSchema,
  defaultStudentOpeningBalance,
} from "../students-opening-balance-schema";
import AddStudentOpeningBalanceForm from "../_components/add-student-opening-balance-form";
import SkeletonLoader from "@/components/skeleton-loader";

const AddStudentOpeningBalanceFormWrapper = () => {
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
      schema={studentOpeningBalanceSchema}
      defaultValues={defaultStudentOpeningBalance}
    >
      <AddStudentOpeningBalanceForm />
    </RhfProvider>
  );
};

export default AddStudentOpeningBalanceFormWrapper;
