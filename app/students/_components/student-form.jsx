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

const StudentForm = () => {
  const {
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    console.log("Data submitted", data);
    setIsLoading(true);
    // Replace with your mutation logic (if needed)
    setTimeout(() => setIsLoading(false), 1000); // Simulated loading
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

        <Button type="submit">Submit</Button>
      </Stack>
    </Container>
  );
};

export default StudentForm;
