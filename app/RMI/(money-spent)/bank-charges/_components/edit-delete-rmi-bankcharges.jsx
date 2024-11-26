"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditRmiBankCharge,
  useDeleteRmiBankCharge,
} from "../_services/mutations";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

// EditDeleteRmiBankChargesForm component
const EditDeleteRmiBankChargesForm = ({ bankChargeId }) => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const router = useRouter();
  const editBankChargesMutation = useEditRmiBankCharge();
  const deleteBankChargesMutation = useDeleteRmiBankCharge();
  const [isLoading, setIsLoading] = useState(false);

  // Function to adapt data to the correct format for the backend (snake_case)
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
    setIsLoading(true);
    const adaptedData = adaptDataForBackend(data);
    editBankChargesMutation.mutate(
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
    deleteBankChargesMutation.mutate(bankChargeId, {
      onSettled: () => {
        setIsLoading(false);
        router.push("/bank-charges");
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
          defaultValue="operations_account"
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

export default EditDeleteRmiBankChargesForm;
