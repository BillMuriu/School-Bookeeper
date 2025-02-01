"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import {
  useEditOperationsBankCharges,
  useDeleteOperationsBankCharges,
} from "../_services/mutations";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

const EditDeleteOperationsBankChargesForm = ({ bankChargeId }) => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const editBankChargesMutation = useEditOperationsBankCharges();
  const deleteBankChargesMutation = useDeleteOperationsBankCharges();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    editBankChargesMutation.mutate(
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
    deleteBankChargesMutation.mutate(bankChargeId, {
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

export default EditDeleteOperationsBankChargesForm;
