"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateSchoolFundReceipt } from "../_services/mutations";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

const SchoolFundReceiptForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createSchoolFundReceiptMutation = useCreateSchoolFundReceipt();
  const [isLoading, setIsLoading] = useState(false);

  const formatDataForBackend = (data) => {
    return {
      account: data.account,
      received_from: data.receivedFrom,
      student: data.student ?? null, // Ensure null for missing or empty values
      cash_bank: data.cashBank,
      total_amount: data.totalAmount.toFixed(2), // Convert to string with two decimal places
      date: data.date.toISOString(), // Convert to ISO string for backend
    };
  };

  const onSubmit = (data) => {
    console.log("Data before formatting:", data);

    const formattedData = formatDataForBackend(data);
    console.log("Data submitted:", formattedData);

    setIsLoading(true);

    createSchoolFundReceiptMutation.mutate(formattedData, {
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
        <RHFNativeSelect
          name="account"
          label="Account Name"
          options={[{ value: "school_fund_account", label: "School Fund" }]}
          defaultValue="school_fund_account"
          disabled
        />
        <RHFNativeSelect
          name="receivedFrom"
          label="Received From"
          options={[
            { value: "government", label: "Government" },
            { value: "donation", label: "Donation" },
            { value: "others", label: "Others" },
          ]}
        />
        <RHFRadioGroup
          name="cashBank"
          label="Cash or Bank"
          options={[
            { value: "bank", label: "Bank" },
            { value: "cash", label: "Cash" },
          ]}
          sx={{
            maxWidth: "30px",
          }}
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
        />
        <RHFDatePicker name="date" label="Date Received" />
        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default SchoolFundReceiptForm;
