"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Stack, Container } from "@mui/material";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import { RHFRadioGroup } from "@/components/form-components/RHFRadioGroup";
import { RHFNativeSelect } from "@/components/form-components/RHFNativeSelect";
import { RHFDatePicker } from "@/components/form-components/RHFDatePicker";
import SkeletonLoader from "@/components/skeleton-loader";
import { useEditStudent, useDeleteStudent } from "../_services/mutations";

const EditDeleteStudentForm = ({ studentId, studentData }) => {
  const {
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormContext();

  const editStudentMutation = useEditStudent();
  const deleteStudentMutation = useDeleteStudent();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    // Log the data before any transformation
    console.log("Data before conversion:", JSON.stringify(data, null, 2));

    // Convert dateOfBirth and admissionDate fields to Date objects if they are strings
    if (data.dateOfBirth && typeof data.dateOfBirth === "string") {
      data.dateOfBirth = new Date(data.dateOfBirth);
    }

    if (data.admissionDate && typeof data.admissionDate === "string") {
      data.admissionDate = new Date(data.admissionDate);
    }

    // Log the data after conversion
    console.log("Data after conversion:", JSON.stringify(data, null, 2));

    // Set loading state to true
    setIsLoading(true);

    // Mutate data with the student ID and updated data
    editStudentMutation.mutate(
      { id: studentId, data },
      {
        // Handle mutation completion
        onSettled: () => {
          setIsLoading(false);
        },
        // Handle errors during the mutation
        onError: (error) => {
          console.error("Edit student mutation error:", error);
        },
      }
    );
  };

  const onDelete = () => {
    setIsLoading(true);
    deleteStudentMutation.mutate(studentId, {
      onSettled: () => {
        setIsLoading(false);
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
          name="admissionNumber"
          label="Admission Number"
          error={errors.admissionNumber}
        />

        <RHFTextField
          name="firstName"
          label="First Name"
          error={errors.firstName}
        />

        <RHFTextField
          name="lastName"
          label="Last Name"
          error={errors.lastName}
        />

        <RHFDatePicker
          name="dateOfBirth"
          label="Date of Birth"
          error={errors.dateOfBirth}
        />

        <RHFRadioGroup
          name="gender"
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          error={errors.gender}
        />

        <RHFNativeSelect
          name="gradeClassLevel"
          label="Class Level"
          options={[
            { value: "form1", label: "Form 1" },
            { value: "form2", label: "Form 2" },
            { value: "form3", label: "Form 3" },
            { value: "form4", label: "Form 4" },
          ]}
          error={errors.gradeClassLevel}
        />

        <RHFTextField
          name="guardiansName"
          label="Guardian's Name"
          error={errors.guardiansName}
        />

        <RHFTextField
          name="guardiansPhoneNumber"
          label="Guardian's Phone Number"
          error={errors.guardiansPhoneNumber}
        />

        <RHFDatePicker
          name="admissionDate"
          label="Admission Date"
          error={errors.admissionDate}
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

export default EditDeleteStudentForm;
