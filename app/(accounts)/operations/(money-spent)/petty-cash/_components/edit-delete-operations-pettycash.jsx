"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditOperationsPettyCash,
  useDeleteOperationsPettyCash,
} from "../_services/mutations";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

const EditDeletePettyCashForm = ({ pettyCashId }) => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const router = useRouter();
  const editPettyCashMutation = useEditOperationsPettyCash();
  const deletePettyCashMutation = useDeleteOperationsPettyCash();
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
        <RHFTextField
          name="account"
          label="Account Name"
          defaultValue=""
          disabled
        />
        <RHFTextField name="payeeName" label="Payee Name" />
        <RHFTextField name="chequeNumber" label="Cheque Number" />
        <RHFNumberInput name="amount" label="Amount" min={0} />
        <RHFTextField
          name="description"
          label="Description"
          multiline
          rows={4}
        />
        <RHFDatePicker name="dateIssued" label="Date Issued" />

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

export default EditDeletePettyCashForm;
