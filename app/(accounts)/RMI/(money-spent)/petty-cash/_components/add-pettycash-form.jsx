"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateRmiPettyCash } from "../_services/mutations"; // Corrected import for petty cash mutation
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

// Function to format data for the backend
const formatPettyCashData = (data) => {
  return {
    account: data.account,
    payee_name: data.payeeName, // Convert camelCase to snake_case
    cheque_number: data.chequeNumber, // Convert camelCase to snake_case
    amount: data.amount,
    description: data.description,
    date_issued: data.dateIssued ? data.dateIssued.toISOString() : "", // Format the date to ISO 8601 string
  };
};

// AddPettyCashForm component
const AddPettyCashForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createPettyCashMutation = useCreateRmiPettyCash(); // Hook for creating petty cash
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    const formattedData = formatPettyCashData(data);

    console.log("Formatted data:", JSON.stringify(formattedData, null, 2));

    setIsLoading(true);
    createPettyCashMutation.mutate(formattedData, {
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
