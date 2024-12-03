"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Stack, Container } from "@mui/material";
import { useCreateSchoolFundReceipt } from "../_services/mutations";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";

const AddStudentReceiptForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createReceiptMutation = useCreateSchoolFundReceipt();

  const formatDataForBackend = (data) => ({
    account: data.account,
    received_from: data.receivedFrom,
    student: data.student ?? null,
    cash_bank: data.cashBank,
    total_amount: data.totalAmount.toFixed(2),
    date: data.date.toISOString(),
  });

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    const formattedData = formatDataForBackend(data);
    console.log("Formatted data for backend:", formattedData);

    createReceiptMutation.mutate(formattedData);
  };

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
          options={[{ value: "school_fund_account", label: "School Fund" }]}
          defaultValue="school_fund_account"
          disabled
        />
        <RHFTextField
          name="receivedFrom"
          label="Received From"
          disabled="true"
        />
        <RHFRadioGroup
          name="cashBank"
          label="Cash or Bank"
          options={[
            { value: "bank", label: "Bank" },
            { value: "cash", label: "Cash" },
          ]}
          sx={{ maxWidth: "30px" }}
        />
        <RHFNumberInput
          type="number"
          name="totalAmount"
          label="Total Amount Received"
          min={0}
        />
        <RHFNumberInput
          type="number"
          name="student"
          label="Student Number (if applicable)"
          min={0}
          disabled
        />
        <RHFDatePicker name="date" label="Date Received" />
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default AddStudentReceiptForm;
