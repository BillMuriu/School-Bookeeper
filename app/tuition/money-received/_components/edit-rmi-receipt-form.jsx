"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useEditRmiReceipt,
  useDeleteRmiReceipts,
} from "../_services/mutations";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

const EditRmiReceiptForm = ({ receiptId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const editRmiReceiptMutation = useEditRmiReceipt();
  const deleteRmiReceiptsMutation = useDeleteRmiReceipts();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    // Convert date string to ISO string if necessary
    if (data.date) {
      data.date = data.date.toISOString();
    }

    const apiData = {
      account: data.account,
      received_from: data.received_from,
      cash_bank: data.cash_bank,
      total_amount: data.total_amount,
      date: data.date,
    };

    console.log("Processed submit data:", apiData);
    editRmiReceiptMutation.mutate({ id: receiptId, data: apiData });
  };

  const onDelete = () => {
    setIsLoading(true);
    deleteRmiReceiptsMutation.mutate([receiptId], {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  console.log("Form errors:", errors); // Debugging line

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
          options={[{ value: "rmi_account", label: "RMI Account" }]}
          defaultValue="rmi_account"
          disabled={true}
        />
        <RHFNativeSelect
          name="received_from"
          label="Received From"
          options={[
            { value: "pettycash", label: "Petty Cash" },
            { value: "FSE", label: "FSE (Government funds)" },
            { value: "others", label: "Others" },
          ]}
          defaultValue="operations" // Adjust based on your logic for default value
        />
        <RHFRadioGroup
          name="cash_bank"
          label="Cash or Bank"
          options={[
            { value: "cash", label: "Cash" },
            { value: "bank", label: "Bank" },
          ]}
        />
        <RHFNumberInput
          name="total_amount"
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

export default EditRmiReceiptForm;
