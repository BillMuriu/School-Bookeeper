"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import { studentSchema, defaultStudent } from "../students-schema";
import AddStudentForm from "../_components/add-student-form";
import SkeletonLoader from "@/components/skeleton-loader";

const AddStudentFormWrapper = () => {
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
    <RhfProvider schema={studentSchema} defaultValues={defaultStudent}>
      <AddStudentForm />
    </RhfProvider>
  );
};

export default AddStudentFormWrapper;
