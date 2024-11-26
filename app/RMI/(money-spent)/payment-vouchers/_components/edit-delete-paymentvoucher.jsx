"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  useEditRmiPaymentVoucher,
  useDeleteRmiPaymentVoucher,
} from "../_services/mutations";
import SkeletonLoader from "@/components/skeleton-loader";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

const EditDeletePaymentVoucherForm = ({ voucherId }) => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const router = useRouter();
  const editPaymentVoucherMutation = useEditRmiPaymentVoucher();
  const deletePaymentVoucherMutation = useDeleteRmiPaymentVoucher();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    console.log("Processed submit data:", data);
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
        // router.push("/payment-vouchers");
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

export default EditDeletePaymentVoucherForm;
