"use client";

import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Controller,
  useForm,
  FormProvider,
  useFormContext,
} from "react-hook-form";

export function RHFNativeSelect({
  name,
  label,
  options,
  defaultValue,
  ...rest
}) {
  const { control } = useFormContext();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="outlined" disabled={rest.disabled}>
        <InputLabel variant="outlined" htmlFor={name}>
          {label}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <NativeSelect
              value={value || ""}
              onChange={onChange}
              input={<OutlinedInput label={label} name={name} id={name} />}
              {...rest} // Spread all additional props onto the NativeSelect
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          )}
        />
      </FormControl>
    </Box>
  );
}
