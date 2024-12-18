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
import { useCreateStudent } from "../_services/mutations";

const AddStudentForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const createStudentMutation = useCreateStudent(); // Hook for creating a student
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Data submitted:", JSON.stringify(data, null, 2));
    setIsLoading(true);
    createStudentMutation.mutate(data, {
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
        <RHFTextField
          name="admissionNumber"
          label="Admission Number"
          error={errors.admissionNumber}
          color="grey"
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
            { value: "1", label: "Form 1" },
            { value: "2", label: "Form 2" },
            { value: "3", label: "Form 3" },
            { value: "4", label: "Form 4" },
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

        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default AddStudentForm;
