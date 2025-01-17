"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateSchoolFundBankCharge } from "../_services/mutations";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

// AddSchoolFundBankChargeForm component
const AddSchoolFundBankChargeForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createSchoolFundBankChargeMutation = useCreateSchoolFundBankCharge(); // Use the correct mutation
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Data submitted:", JSON.stringify(data, null, 2));
    setIsLoading(true);
    createSchoolFundBankChargeMutation.mutate(data, {
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
        <RHFTextField
          name="account"
          label="Account"
          disabled={true}
          defaultValue="school_fund_account"
        />{" "}
        {/* Default to school fund */}
        <RHFNumberInput name="amount" label="Amount" min={0} />
        <RHFDatePicker name="charge_date" label="Charge Date" />
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

export default AddSchoolFundBankChargeForm;
