"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditSchoolFundPettyCash,
  useDeleteSchoolFundPettyCash,
} from "../_services/mutations";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

const EditDeleteSchoolFundPettyCashForm = ({ pettyCashId }) => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const router = useRouter();
  const editPettyCashMutation = useEditSchoolFundPettyCash();
  const deletePettyCashMutation = useDeleteSchoolFundPettyCash();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    setIsLoading(true);
    editPettyCashMutation.mutate(
      { id: pettyCashId, data },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const onDelete = () => {
    setIsLoading(true);
    deletePettyCashMutation.mutate(pettyCashId, {
      onSettled: () => {
        setIsLoading(false);
        router.push("/school-fund-petty-cash");
      },
    });
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  console.log("Form errors:", errors);

  return (
    <Container
      sx={{ mt: 3 }}
      maxWidth="sm"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ gap: 2 }}>
        {/* Account - Pre-filled, non-editable */}
        <RHFTextField
          name="account"
          label="Account"
          defaultValue="school_fund"
          disabled
        />

        {/* Payee Name - Required */}
        <RHFTextField
          name="payee_name"
          label="Payee Name"
          required
          error={!!errors.payee_name}
          helperText={errors.payee_name?.message}
        />

        {/* Cheque Number - Required with max length validation */}
        <RHFTextField
          name="cheque_number"
          label="Cheque Number"
          required
          error={!!errors.cheque_number}
          helperText={errors.cheque_number?.message}
        />

        {/* Amount - Nullable, positive number */}
        <RHFNumberInput
          name="amount"
          label="Amount"
          min={0}
          error={!!errors.amount}
          helperText={errors.amount?.message}
        />

        {/* Description - Optional */}
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        {/* Date Issued - Nullable */}
        <RHFDatePicker
          name="date_issued"
          label="Date Issued"
          error={!!errors.date_issued}
          helperText={errors.date_issued?.message}
        />

        {/* Buttons */}
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

export default EditDeleteSchoolFundPettyCashForm;
