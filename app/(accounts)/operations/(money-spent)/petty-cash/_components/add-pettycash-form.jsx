"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateOperationsPettyCash } from "../_services/mutations"; // Corrected import for petty cash mutation
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

// AddPettyCashForm component
const AddPettyCashForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createPettyCashMutation = useCreateOperationsPettyCash(); // Hook for creating petty cash
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Data submitted:", JSON.stringify(data, null, 2));
    setIsLoading(true);
    createPettyCashMutation.mutate(data, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <Container
      sx={{ mt: 3 }}
      maxWidth="sm"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ gap: 2 }}>
        <RHFTextField name="account" label="Account" defaultValue="" disabled />
        <RHFTextField name="payeeName" label="Payee Name" />
        <RHFTextField
          name="chequeNumber"
          label="Cheque Number"
          // Add any additional validations or properties as needed
        />
        <RHFNumberInput
          name="amount"
          label="Amount"
          min={0}
          // Add any additional validations or properties as needed
        />
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
        />
        <RHFDatePicker name="dateIssued" label="Date Issued" />
        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default AddPettyCashForm;
