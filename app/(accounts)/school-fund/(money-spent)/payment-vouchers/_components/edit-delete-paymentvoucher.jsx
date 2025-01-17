"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditSchoolFundPaymentVoucher, // Adjusted for School Fund
  useDeleteSchoolFundPaymentVoucher, // Adjusted for School Fund
} from "../_services/mutations";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

const EditDeleteSchoolFundPaymentVoucherForm = ({ voucherId }) => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useFormContext();
  const router = useRouter();
  const editPaymentVoucherMutation = useEditSchoolFundPaymentVoucher(); // Adjusted for School Fund
  const deletePaymentVoucherMutation = useDeleteSchoolFundPaymentVoucher(); // Adjusted for School Fund
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);
    setIsLoading(true);
    editPaymentVoucherMutation.mutate(
      { id: voucherId, data },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const onDelete = () => {
    setIsLoading(true);
    deletePaymentVoucherMutation.mutate(voucherId, {
      onSettled: () => {
        setIsLoading(false);
        // router.push("/school-fund-payment-vouchers"); // You can redirect after deletion
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
        <RHFTextField name="account" label="Account Name" disabled />
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
            { value: "bank", label: "Bank" }, // Adjusted payment mode for School Fund
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

export default EditDeleteSchoolFundPaymentVoucherForm;
