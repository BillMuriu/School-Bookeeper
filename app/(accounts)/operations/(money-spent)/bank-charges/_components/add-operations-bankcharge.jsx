"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateOperationsBankCharge } from "../_services/mutations";
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

  const createBankChargeMutation = useCreateOperationsBankCharge();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Data submitted:", JSON.stringify(data, null, 2));
    setIsLoading(true);
    createBankChargeMutation.mutate(data, {
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