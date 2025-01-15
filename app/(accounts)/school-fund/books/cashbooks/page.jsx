"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import CashBookForm from "./_components/cash-book-form";
import {
  cashbookQuerySchema,
  defaultCashbookQuery,
} from "./cashbook-form-schema";
import SkeletonLoader from "@/components/skeleton-loader";

const CashBooks = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  // Wrap CashBookForm with RhfProvider to handle form context globally
  return (
    <RhfProvider
      schema={cashbookQuerySchema}
      defaultValues={defaultCashbookQuery}
    >
      <CashBookForm />
    </RhfProvider>
  );
};

export default CashBooks;
