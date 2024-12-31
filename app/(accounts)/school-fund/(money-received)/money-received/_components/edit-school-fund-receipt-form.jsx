"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Stack, Container } from "@mui/material";
import {
  useEditSchoolFundReceipt,
  useDeleteSchoolFundReceipts,
} from "../_services/mutations";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

const EditDeleteSchoolFundReceiptForm = ({ receiptId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const editSchoolFundReceiptMutation = useEditSchoolFundReceipt();
  const deleteSchoolFundReceiptMutation = useDeleteSchoolFundReceipts();

  const [isLoading, setIsLoading] = useState(false);

  const formatDataForBackend = (data) => {
    return {
      account: data.account,
      received_from: data.receivedFrom,
      student: data.student ?? null,
      cash_bank: data.cashBank,
      total_amount: data.totalAmount.toFixed(2),
      date: data.date.toISOString(),
    };
  };

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    const formattedData = formatDataForBackend(data);
    console.log("Formatted data for backend:", formattedData);

    editSchoolFundReceiptMutation.mutate({
      id: receiptId,
      data: formattedData,
    });
  };

  const onDelete = () => {
    setIsLoading(true);
    deleteSchoolFundReceiptMutation.mutate([receiptId], {
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
          disabled
          style={{ display: "none" }}
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

export default EditDeleteSchoolFundReceiptForm;
