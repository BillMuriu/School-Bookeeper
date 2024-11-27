"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useCreateRmiPaymentVoucher } from "../_services/mutations";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

const AddPaymentVoucherForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createPaymentVoucherMutation = useCreateRmiPaymentVoucher();
  const [isLoading, setIsLoading] = useState(false);

  // Function to transform camelCase to snake_case
  const adaptDataForBackend = (data) => {
    return {
      account: data.account || "rmi_account",
      voucher_no: data.voucherNo ?? null,
      payee_name: data.payeeName || "",
      particulars: data.particulars || "",
      amount_shs: data.amountShs ?? null,
      payment_mode: data.paymentMode || "cash",
      total_amount_in_words: data.totalAmountInWords || "",
      prepared_by: data.preparedBy || "",
      authorised_by: data.authorisedBy || "",
      vote_head: data.voteHead || "",
      vote_details: data.voteDetails || "",
      date: data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString(),
    };
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    // Adapt the data before submitting it
    const adaptedData = adaptDataForBackend(data);
    console.log("Data submitted:", JSON.stringify(adaptedData, null, 2));

    createPaymentVoucherMutation.mutate(adaptedData, {
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
          defaultValue="default_account"
          disabled
        />
        <RHFNumberInput name="voucherNo" label="Voucher Number" min={1} />
        <RHFTextField name="payeeName" label="Payee Name" />
        <RHFTextField
          name="particulars"
          label="Particulars"
          multiline
          rows={4}
        />
        <RHFNumberInput name="amountShs" label="Amount in Shillings" min={0} />
        <RHFRadioGroup
          name="paymentMode"
          label="Payment Mode"
          options={[
            { value: "cash", label: "Cash" },
            { value: "cheque", label: "Cheque" },
          ]}
        />
        <RHFTextField name="totalAmountInWords" label="Total Amount in Words" />
        <RHFTextField name="preparedBy" label="Prepared By" />
        <RHFTextField name="authorisedBy" label="Authorised By" />
        <RHFTextField name="voteHead" label="Vote Head" />
        <RHFTextField
          name="voteDetails"
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

export default AddPaymentVoucherForm;
