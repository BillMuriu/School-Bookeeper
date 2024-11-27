"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditTuitionPettyCash,
  useDeleteTuitionPettyCash,
} from "../_services/mutations"; // Corrected import for tuition petty cash mutations
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

// Helper function to format data for backend
const formatDataForBackend = (data) => {
  return {
    account: data.account, // Assuming this value is constant or selected somewhere
    payee_name: data.payeeName,
    cheque_number: data.chequeNumber,
    amount: parseFloat(data.amount).toFixed(2), // Ensure it's a float with 2 decimals
    description: data.description,
    date_issued: data.dateIssued ? data.dateIssued.toISOString() : null, // Convert date to ISO format
  };
};

const EditDeleteTuitionPettyCashForm = ({ pettyCashId }) => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const router = useRouter();
  const editPettyCashMutation = useEditTuitionPettyCash(); // Hook for editing tuition petty cash
  const deletePettyCashMutation = useDeleteTuitionPettyCash(); // Hook for deleting tuition petty cash
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    // Format the data before submission
    const formattedData = formatDataForBackend(data);

    console.log("Raw submitted data:", formattedData);

    setIsLoading(true);
    editPettyCashMutation.mutate(
      { id: pettyCashId, data: formattedData },
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
        router.push("/tuition-petty-cash"); // Redirect to the appropriate page for tuition petty cash
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
          defaultValue="tuition" // Assuming the account name is predefined as 'tuition'
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

export default EditDeleteTuitionPettyCashForm;
