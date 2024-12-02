"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditOperationsOpeningBalance,
  useDeleteOperationsOpeningBalance,
} from "../_services/mutations";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

const EditDeleteOpeningBalanceForm = ({ openingBalanceId }) => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const router = useRouter();
  const editOpeningBalanceMutation = useEditOperationsOpeningBalance();
  const deleteOpeningBalanceMutation = useDeleteOperationsOpeningBalance();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    setIsLoading(true);
    editOpeningBalanceMutation.mutate(
      { id: openingBalanceId, data },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const onDelete = () => {
    setIsLoading(true);
    deleteOpeningBalanceMutation.mutate(openingBalanceId, {
      onSettled: () => {
        setIsLoading(false);
        router.push("/operations-opening-balance");
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
        <RHFTextField name="account" label="Account" defaultValue="" disabled />
        <RHFDatePicker name="date" label="Date" />
        <RHFNumberInput name="bankAmount" label="Bank Amount" min={0} />
        <RHFNumberInput name="cashAmount" label="Cash Amount" min={0} />
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
        />

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

export default EditDeleteOpeningBalanceForm;
