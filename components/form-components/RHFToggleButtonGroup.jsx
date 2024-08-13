import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export function RHFToggleButtonGroup({ name, options }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...restField } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            if (newValue.length) {
              onChange(newValue);
            }
          }}
          value={value?.length ? value : [options?.[0]?.id]}
          {...restField}
        >
          {options?.map((option) => (
            <ToggleButton value={option.id} key={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
}
