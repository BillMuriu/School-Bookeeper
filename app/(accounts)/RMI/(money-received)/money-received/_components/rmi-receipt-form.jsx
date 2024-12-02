"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateRmiReceipt } from "../_services/mutations";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

const RmiReceiptForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createOperationsReceiptMutation = useCreateRmiReceipt();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    // Map the form data to match the API structure
    const apiData = {
      account: data.account,
      received_from: data.received_from,
      cash_bank: data.cash_bank,
      total_amount: data.total_amount,
      date: data.date.toISOString(), // Convert to ISO string
    };

    console.log(apiData);

    console.log("Data submitted:", apiData);
    setIsLoading(true);
    createOperationsReceiptMutation.mutate(apiData, {
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("Error creating RMI receipt:", error.message); // Log the error message
      },
    });
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  // Optional: You can also log any form errors here if needed
  console.log("Form errors:", errors);

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
          disabled
        />
        <RHFNativeSelect
          name="received_from"
          label="Received From"
          options={[
            { value: "pettycash", label: "Petty Cash" },
            { value: "FSE", label: "FSE (Government funds)" },
            { value: "others", label: "Others" },
          ]}
          defaultValue="pettycash"
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

        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default RmiReceiptForm;
