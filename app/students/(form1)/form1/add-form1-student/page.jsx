"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import {
  form1StudentSchema,
  defaultForm1Student,
} from "../form1-students-schema";
import AddStudentForm from "@/app/students/_components/add-student-form";
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
    <RhfProvider
      schema={form1StudentSchema}
      defaultValues={defaultForm1Student}
    >
      <AddStudentForm />
    </RhfProvider>
  );
};

export default AddStudentFormWrapper;
