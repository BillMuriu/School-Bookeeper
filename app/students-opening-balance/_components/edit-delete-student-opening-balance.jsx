"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Stack, Container } from "@mui/material";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";
import {
  useEditStudentOpeningBalance,
  useDeleteStudentOpeningBalance,
} from "../_services/mutations"; // Adjusted import for opening balance mutations

const EditDeleteStudentOpeningBalanceForm = ({
  openingBalanceId,
  studentOpeningBalanceData,
}) => {
  const {
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormContext();
  const editStudentOpeningBalanceMutation = useEditStudentOpeningBalance(); // Hook for editing
  const deleteStudentOpeningBalanceMutation = useDeleteStudentOpeningBalance(); // Hook for deleting
  const [isLoading, setIsLoading] = useState(false);

  const formatStudentOpeningBalanceData = (data) => {
    return {
      student: data.student,
      balance: parseFloat(data.balance).toFixed(2), // Ensure balance is a number with 2 decimal places
      date_recorded: formatDate(data.dateRecorded), // Format the date correctly
    };
  };

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0]; // Convert Date object to string in 'YYYY-MM-DD' format
    } else if (typeof date === "string") {
      return date.split("T")[0]; // Handle ISO string format and extract the date part
    }
    return ""; // Return empty string if the date is not valid
  };

  const onSubmit = (data) => {
    // Format the data before sending it to the backend
    const formattedData = formatStudentOpeningBalanceData(data);
    console.log("Formatted data before sending:", formattedData);

    setIsLoading(true);

    // Ensure the id (openingBalanceId) is passed along with the formatted data
    editStudentOpeningBalanceMutation.mutate(
      { id: openingBalanceId, data: formattedData }, // Pass the id and formatted data here
      {
        onSettled: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Edit opening balance mutation error:", error);
        },
      }
    );
  };

  const onDelete = () => {
    setIsLoading(true);

    // Mutate to delete the opening balance
    deleteStudentOpeningBalanceMutation.mutate(openingBalanceId, {
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
        <RHFNumberInput
          name="student"
          label="Student ID"
          error={errors.student}
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
          Edit
        </Button>
        <Button type="button" onClick={onDelete}>
          Delete
        </Button>
      </Stack>
    </Container>
  );
};

export default EditDeleteStudentOpeningBalanceForm;
