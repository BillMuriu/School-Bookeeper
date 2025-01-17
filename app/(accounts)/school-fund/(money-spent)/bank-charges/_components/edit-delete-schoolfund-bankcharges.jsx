"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditSchoolFundBankCharge,
  useDeleteSchoolFundBankCharge,
} from "../_services/mutations"; // Correct mutations
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

// EditDeleteSchoolFundBankChargeForm component
const EditDeleteSchoolFundBankChargeForm = ({ bankChargeId }) => {
  const {
    formState: { errors },
    handleSubmit,
    setValue, // To set values dynamically if needed
  } = useFormContext();
  const router = useRouter();
  const editSchoolFundBankChargeMutation = useEditSchoolFundBankCharge(); // Correct mutation
  const deleteSchoolFundBankChargeMutation = useDeleteSchoolFundBankCharge(); // Correct mutation
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    editSchoolFundBankChargeMutation.mutate(
      { id: bankChargeId, data },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const onDelete = () => {
    setIsLoading(true);
    deleteSchoolFundBankChargeMutation.mutate(bankChargeId, {
      onSettled: () => {
        setIsLoading(false);
        router.push("/school-fund-bank-charges"); // Redirect to the updated list page
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
          label="Account Name"
          defaultValue="school_fund_account" // The default value is set to school_fund_account
          disabled
        />
        <RHFNumberInput name="amount" label="Amount" min={0} />
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
        />
        <RHFDatePicker name="charge_date" label="Charge Date" />

        <Button variant="secondary" type="submit">
          Edit
        </Button>
        <Button type="button" onClick={onDelete}>
          Delete
        </Button>
      </Stack>
    </Container>
  );
};

export default EditDeleteSchoolFundBankChargeForm;
