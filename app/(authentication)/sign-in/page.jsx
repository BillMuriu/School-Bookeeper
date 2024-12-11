"use client";

import React, { useState, useEffect } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import SignInForm from "../_components/sign-in";
import { emailSchema, defaultEmailValues } from "./sign-in-schema";
import SkeletonLoader from "@/components/skeleton-loader";

const SignInFormWrapper = () => {
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
    <RhfProvider schema={emailSchema} defaultValues={defaultEmailValues}>
      <SignInForm />
    </RhfProvider>
  );
};

export default SignInFormWrapper;
