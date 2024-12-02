"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useEditTermPeriod,
  useDeleteTermPeriods,
} from "../_services/mutations";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFNumberInput } from "@/components/form-components/RHFNumberInput";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";

// Function to map form data to API structure
const mapFormDataToApiData = (data) => {
  return {
    term_name: data.termName,
    start_date: data.startDate.toISOString().split("T")[0], // Format to YYYY-MM-DD
    end_date: data.endDate.toISOString().split("T")[0], // Format to YYYY-MM-DD
    year: data.year,
    fees: data.fees.toFixed(2), // Ensure fees are a string with two decimal places
  };
};

const EditTermPeriodForm = ({ termPeriodId }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const editTermPeriodMutation = useEditTermPeriod(); // Custom mutation for editing
  const deleteTermPeriodMutation = useDeleteTermPeriods(); // Custom mutation for deleting

  const [isLoading, setIsLoading] = useState(false);

  // Form submission handler
  const onSubmit = (data) => {
    console.log("Raw submitted data:", data);

    const apiData = mapFormDataToApiData(data);
    console.log("Processed submit data:", apiData);

    setIsLoading(true);
    editTermPeriodMutation.mutate(
      { id: termPeriodId, data: apiData },
      {
        onSettled: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Error editing term period:", error.message);
        },
      }
    );
  };

  // Delete term period handler
  const onDelete = () => {
    setIsLoading(true);
    deleteTermPeriodMutation.mutate([termPeriodId], {
      onSettled: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        console.error("Error deleting term period:", error.message);
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
        <RHFNativeSelect
          name="termName"
          label="Term Name"
          options={[
            { value: "Term 1", label: "Term 1" },
            { value: "Term 2", label: "Term 2" },
            { value: "Term 3", label: "Term 3" },
          ]}
          defaultValue="Term 1"
        />
        <RHFDatePicker name="startDate" label="Start Date" />
        <RHFDatePicker name="endDate" label="End Date" />
        <RHFNumberInput name="year" label="Year" min={2000} />
        <RHFNumberInput name="fees" label="Fees" min={0} step={0.01} />

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

export default EditTermPeriodForm;
