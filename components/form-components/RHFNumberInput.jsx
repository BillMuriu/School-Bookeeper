import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export function RHFNumberInput({ name, label, min, max, step, ...props }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ref, ...field },
        fieldState: { error },
      }) => (
        <TextField
          {...field}
          {...props}
          type="number"
          label={label}
          variant="outlined"
          fullWidth
          value={value === undefined ? "" : value}
          onChange={(e) => {
            // Convert the input value to a number before calling onChange
            const newValue =
              e.target.value === "" ? "" : Number(e.target.value);
            onChange(newValue);
          }}
          inputRef={ref}
          error={!!error}
          helperText={error ? error.message : null}
          inputProps={{
            min,
            max,
            step,
          }}
        />
      )}
    />
  );
}
