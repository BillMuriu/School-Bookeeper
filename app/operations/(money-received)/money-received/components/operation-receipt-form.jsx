"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useCreateOperationReceipt } from "../services/mutations";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";

const ReceiptForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createOperationsReceiptMutation = useCreateOperationReceipt();

  const onSubmit = (data) => {
    createOperationsReceiptMutation.mutate(data);
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
          options={[{ value: "operations_account", label: "Operations" }]}
          defaultValue="operations_account"
          disabled
        />
        <RHFNativeSelect
          name="receivedFrom"
          label="Received From"
          options={[
            { value: "FSE", label: "FSE (Government funds)" },
            { value: "others", label: "Others" },
          ]}
          defaultValue="FSE"
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
          name="rmiFund"
          label="Funds for RMI"
          min={0}
        />
        <RHFNumberInput
          type="number"
          name="otherVotheads"
          label="Funds for Other Voteheads"
          min={0}
        />
        <RHFDatePicker name="date" label="Date Received" />
        <Button>Submit</Button>
      </Stack>
    </Container>
  );
};

export default ReceiptForm;
