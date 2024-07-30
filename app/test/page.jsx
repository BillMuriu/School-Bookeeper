"use client";

import React from "react";
import { TextField, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RhfProvider } from "@/contexts/rhf-provider";
import { schema1, defaultValues1 } from "./types/schema";

import { RHFAutocomplete } from "../operations/components/form-components/RHFAutocomplete";
import { RHFToggleButtonGroup } from "../operations/components/form-components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../operations/components/form-components/RHFRadioGroup";
import { useStates } from "./services/queries";
import { useLanguages } from "./services/queries";
import { useGenders } from "./services/queries";

const TestForm = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();

  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete
        name="states"
        label="States"
        options={statesQuery.data}
      />
      <RHFToggleButtonGroup
        name="languagesSpoken"
        options={languagesQuery.data}
      />
      <RHFRadioGroup name="gender" options={gendersQuery.data} label="Gender" />
    </Stack>
  );
};

const TestFormWrapper = () => {
  return (
    <RhfProvider schema={schema1} defaultValues={defaultValues1}>
      <TestForm />
    </RhfProvider>
  );
};

export default TestFormWrapper;