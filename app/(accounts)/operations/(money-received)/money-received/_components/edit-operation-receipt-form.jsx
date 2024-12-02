"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useEditOperationReceipt,
  useDeleteOperationReceipts,
} from "../_services/mutations";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

const EditReceiptForm = ({ receiptId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const editOperationsReceiptMutation = useEditOperationReceipt();
  const deleteOperationsReceiptMutation = useDeleteOperationReceipts();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    // Convert date string to Date object if necessary
    if (data.date && typeof data.date === "string") {
      data.date = new Date(data.date);
    }

    console.log("Processed submit data:", data);
    editOperationsReceiptMutation.mutate({ id: receiptId, data });
  };

  const onDelete = () => {
    setIsLoading(true);
    deleteOperationsReceiptMutation.mutate([receiptId], {
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
          options={[{ value: "operations_account", label: "Operations" }]}
          defaultValue="operations_account"
          disabled={true}
        />
        <RHFNativeSelect
          name="sender"
          label="Received From"
          options={[
            { value: "FSE", label: "FSE (Government funds)" },
            { value: "other", label: "Others" },
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

export default EditReceiptForm;
