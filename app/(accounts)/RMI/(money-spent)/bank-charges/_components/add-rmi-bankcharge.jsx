"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateRmiBankCharge } from "../_services/mutations";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

// AddBankChargeForm component
const AddBankChargeForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createBankChargeMutation = useCreateRmiBankCharge();
  const [isLoading, setIsLoading] = useState(false);

  // Function to transform camelCase to snake_case
  const adaptDataForBackend = (data) => {
    return {
      account: data.account || "",
      amount: data.amount ?? null,
      charge_date: data.chargeDate
        ? new Date(data.chargeDate).toISOString()
        : new Date().toISOString(),
      description: data.description || "",
    };
  };

  const onSubmit = (data) => {
    // Adapt the data before submitting it
    const adaptedData = adaptDataForBackend(data);
    console.log("Data submitted:", JSON.stringify(adaptedData, null, 2));
    setIsLoading(true);
    createBankChargeMutation.mutate(adaptedData, {
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
        <RHFTextField name="account" label="Account" disabled={true} />
        <RHFNumberInput name="amount" label="Amount" min={0} />
        <RHFDatePicker name="chargeDate" label="Charge Date" />
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

export default AddBankChargeForm;
