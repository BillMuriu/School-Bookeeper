"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useEditTuitionReceipt,
  useDeleteTuitionReceipts,
} from "../_services/mutations";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

// Function to map form data to API structure
const mapFormDataToApiData = (data) => {
  return {
    account: data.account,
    received_from: data.receivedFrom,
    cash_bank: data.cashBank,
    total_amount: data.totalAmount,
    date: data.date.toISOString(), // Ensure date is in ISO string format
  };
};

const EditTuitionReceiptForm = ({ receiptId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const editTuitionReceiptMutation = useEditTuitionReceipt();
  const deleteTuitionReceiptsMutation = useDeleteTuitionReceipts();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    const apiData = mapFormDataToApiData(data);
    console.log("Processed submit data:", apiData);

    setIsLoading(true);
    editTuitionReceiptMutation.mutate(
      { id: receiptId, data: apiData },
      {
        onSettled: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Error editing Tuition receipt:", error.message);
        },
      }
    );
  };

  const onDelete = () => {
    setIsLoading(true);
    deleteTuitionReceiptsMutation.mutate([receiptId], {
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("Error deleting Tuition receipt:", error.message);
      },
    });
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  // console.log("Form errors:", errors);

  return (
    <Container
      sx={{ mt: 3 }}
      maxWidth="sm"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack sx={{ gap: 2 }}>
        <RHFNativeSelect
          name="account"
          label="Account Name"
          options={[{ value: "tuition_account", label: "Tuition Account" }]}
          defaultValue="tuition_account"
          disabled
        />
        <RHFNativeSelect
          name="receivedFrom"
          label="Received From"
          options={[
            { value: "pettycash", label: "Petty Cash" },
            { value: "FSE", label: "FSE (Government funds)" },
            { value: "others", label: "Others" },
          ]}
          defaultValue="pettycash" // Adjust based on your logic for default value
        />
        <RHFRadioGroup
          name="cashBank"
          label="Cash or Bank"
          options={[
            { value: "cash", label: "Cash" },
            { value: "bank", label: "Bank" },
          ]}
        />
        <RHFNumberInput
          name="totalAmount"
          label="Total Amount Received"
          min={0}
        />
        <RHFDatePicker name="date" label="Date Received" />

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

export default EditTuitionReceiptForm;
