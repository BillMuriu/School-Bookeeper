"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Stack, Container } from "@mui/material";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";
import { useCreateStudentOpeningBalance } from "../_services/mutations"; // Adjust mutation hook

const AddStudentOpeningBalanceForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const formatStudentOpeningBalanceData = (data) => {
    return {
      student: data.student,
      balance: parseFloat(data.balance).toFixed(2),
      date_recorded: formatDate(data.dateRecorded),
    };
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    } else if (typeof date === "string") {
      return date.split("T")[0];
    }
    return "";
  };

  const createStudentOpeningBalanceMutation = useCreateStudentOpeningBalance();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    const formattedData = formatStudentOpeningBalanceData(data);
    console.log(formattedData);

    setIsLoading(true);
    createStudentOpeningBalanceMutation.mutate(formattedData, {
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
        {/* Opening Balance Fields */}
        <RHFNumberInput
          name="student"
          label="Student ID"
          error={errors.student}
          helperText="Enter the student ID associated with this balance."
        />

        <RHFTextField
          name="balance"
          label="Opening Balance"
          error={errors.balance}
          helperText="Enter the opening balance (e.g., -2300.00)."
        />

        <RHFDatePicker
          name="dateRecorded"
          label="Date Recorded"
          error={errors.dateRecorded}
          helperText="Enter the date when the balance was recorded."
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default AddStudentOpeningBalanceForm;
