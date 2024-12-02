"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditTuitionBankCharge,
  useDeleteTuitionBankCharge,
} from "../_services/mutations";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

// EditDeleteTuitionBankChargeForm component
const EditDeleteTuitionBankChargeForm = ({ bankChargeId }) => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const router = useRouter();
  const editBankChargeMutation = useEditTuitionBankCharge();
  const deleteBankChargeMutation = useDeleteTuitionBankCharge();
  const [isLoading, setIsLoading] = useState(false);

  // Function to adapt data to the correct format for the backend (snake_case)
  const adaptDataForBackend = (data) => {
    return {
      account: data.account || "tuition_account", // Assuming default value for the tuition account
      amount: data.amount ?? null,
      charge_date: data.chargeDate
        ? new Date(data.chargeDate).toISOString()
        : new Date().toISOString(),
      description: data.description || "",
    };
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const adaptedData = adaptDataForBackend(data);
    editBankChargeMutation.mutate(
      { id: bankChargeId, data: adaptedData },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const onDelete = () => {
    setIsLoading(true);
    deleteBankChargeMutation.mutate(bankChargeId, {
      onSettled: () => {
        setIsLoading(false);
        router.push("/tuition-bank-charges"); // Redirecting to the tuition bank charges list page
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
          defaultValue="tuition_account" // Default to tuition account
          disabled
        />
        <RHFNumberInput name="amount" label="Amount" min={0} />
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
        />
        <RHFDatePicker name="chargeDate" label="Charge Date" />

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

export default EditDeleteTuitionBankChargeForm;
