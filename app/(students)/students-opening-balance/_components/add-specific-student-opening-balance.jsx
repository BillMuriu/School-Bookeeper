"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Stack, Container } from "@mui/material";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";
import { useCreateStudentOpeningBalance } from "../_services/mutations"; // Hook for creating opening balance

const AddSpecificStudentOpeningBalanceForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();
  const createStudentOpeningBalanceMutation = useCreateStudentOpeningBalance(); // Hook for creating
  const [isLoading, setIsLoading] = useState(false);

  const formatStudentOpeningBalanceData = (data) => ({
    student: data.student,
    balance: parseFloat(data.balance).toFixed(2), // Ensure balance is a number with 2 decimal places
    date_recorded: formatDate(data.dateRecorded), // Format the date correctly
  });

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0]; // Convert Date object to 'YYYY-MM-DD'
    }
    return ""; // Return empty string for invalid date
  };

  const onSubmit = (data) => {
    const formattedData = formatStudentOpeningBalanceData(data);
    console.log("Formatted data before sending:", formattedData);

    setIsLoading(true);

    createStudentOpeningBalanceMutation.mutate(formattedData, {
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("Create opening balance mutation error:", error);
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
        <RHFNumberInput
          name="student"
          label="Student ID"
          error={errors.student}
          disabled // Student ID is prepopulated and not editable
        />

        <RHFTextField
          name="balance"
          label="Opening Balance"
          error={errors.balance}
        />

        <RHFDatePicker
          name="dateRecorded"
          label="Date Recorded"
          error={errors.dateRecorded}
        />

        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default AddSpecificStudentOpeningBalanceForm;
