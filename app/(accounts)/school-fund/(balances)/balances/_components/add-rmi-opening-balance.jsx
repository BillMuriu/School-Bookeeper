"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateRmiOpeningBalance } from "../_services/mutations"; // Import the mutation hook
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";
const AddRMIOpeningBalanceForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createOpeningBalanceMutation = useCreateRmiOpeningBalance(); // Hook for creating opening balance
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Data submitted:", JSON.stringify(data, null, 2));
    setIsLoading(true);
    createOpeningBalanceMutation.mutate(data, {
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
        <RHFTextField name="account" label="Account" disabled />
        <RHFDatePicker name="date" label="Date" />
        <RHFNumberInput name="bankAmount" label="Bank Amount" min={0} />
        <RHFNumberInput name="cashAmount" label="Cash Amount" min={0} />
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default AddRMIOpeningBalanceForm;
