"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateSchoolFundPaymentVoucher } from "../_services/mutations"; // Adjusted for School Fund
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

const AddSchoolFundPaymentVoucherForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createPaymentVoucherMutation = useCreateSchoolFundPaymentVoucher(); // Adjusted for School Fund
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Data submitted:", JSON.stringify(data, null, 2));
    setIsLoading(true);
    createPaymentVoucherMutation.mutate(data, {
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
          defaultValue="school_fund" // Adjusted for school fund
          disabled
        />
        <RHFNumberInput name="voucher_no" label="Voucher Number" min={1} />
        <RHFTextField name="payee_name" label="Payee Name" />
        <RHFTextField
          name="particulars"
          label="Particulars"
          multiline
          rows={4}
        />
        <RHFNumberInput name="amount_shs" label="Amount in Shillings" min={0} />
        <RHFRadioGroup
          name="payment_mode"
          label="Payment Mode"
          options={[
            { value: "cash", label: "Cash" },
            { value: "bank", label: "Bank" }, // Adjusted options for payment mode
          ]}
        />
        <RHFTextField
          name="total_amount_in_words"
          label="Total Amount in Words"
        />
        <RHFTextField name="prepared_by" label="Prepared By" />
        <RHFTextField name="authorised_by" label="Authorised By" />
        <RHFTextField name="vote_head" label="Vote Head" />
        <RHFTextField
          name="vote_details"
          label="Vote Details"
          multiline
          rows={4}
        />
        <RHFDatePicker name="date" label="Date" />
        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default AddSchoolFundPaymentVoucherForm;
