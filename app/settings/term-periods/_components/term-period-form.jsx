"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateTermPeriod } from "../_services/mutations"; // Adjusted for term periods
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

// Function to map form data to API structure
// Function to map form data to API structure
const mapFormDataToApiData = (data) => {
  return {
    term_name: data.termName,
    start_date: data.startDate.toISOString().split("T")[0], // Format to YYYY-MM-DD
    end_date: data.endDate.toISOString().split("T")[0], // Format to YYYY-MM-DD
    year: data.year,
    fees: data.fees.toFixed(2), // Convert to string with 2 decimal places
  };
};

const TermPeriodForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createTermPeriodMutation = useCreateTermPeriod(); // Adjusted for term periods
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    const apiData = mapFormDataToApiData(data);

    console.log("Data submitted:", apiData);
    setIsLoading(true);
    createTermPeriodMutation.mutate(apiData, {
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("Error creating Term Period:", error.message); // Log the error message
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
          name="termName"
          label="Term Name"
          placeholder="e.g., Term 1"
          register={register}
        />

        <RHFDatePicker
          name="startDate"
          label="Start Date"
          register={register}
        />

        <RHFDatePicker name="endDate" label="End Date" register={register} />

        <RHFNumberInput
          name="year"
          label="Year"
          min={2000}
          max={new Date().getFullYear() + 1}
          register={register}
        />

        <RHFNumberInput
          name="fees"
          label="Fees"
          min={0}
          max={99999999.99}
          register={register}
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default TermPeriodForm;
