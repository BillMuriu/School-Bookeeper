"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateSchoolFundPettyCash } from "../_services/mutations";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

const AddSchoolFundPettyCashForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useFormContext();

  const createSchoolFundPettyCashMutation = useCreateSchoolFundPettyCash();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Data submitted:", JSON.stringify(data, null, 2));
    setIsLoading(true);
    createSchoolFundPettyCashMutation.mutate(data, {
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
        {/* Account - Pre-filled with default value */}
        <RHFTextField
          name="account"
          label="Account"
          defaultValue="school_fund"
          disabled
        />

        {/* Payee Name - Required field */}
        <RHFTextField
          name="payee_name"
          label="Payee Name"
          required
          error={!!errors.payee_name}
          helperText={errors.payee_name?.message}
        />

        {/* Cheque Number - Required and max length validation */}
        <RHFTextField
          name="cheque_number"
          label="Cheque Number"
          required
          error={!!errors.cheque_number}
          helperText={errors.cheque_number?.message}
        />

        {/* Amount - Nullable, must be a positive number */}
        <RHFNumberInput
          name="amount"
          label="Amount"
          min={0}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />

        {/* Description - Optional, defaults to an empty string */}
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        {/* Date Issued - Nullable field */}
        <RHFDatePicker
          name="date_issued"
          label="Date Issued"
          error={!!errors.date_issued}
          helperText={errors.date_issued?.message}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default AddSchoolFundPettyCashForm;
