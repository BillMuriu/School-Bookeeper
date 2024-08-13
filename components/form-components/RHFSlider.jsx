import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Slider, Typography } from "@mui/material";

export function RHFSlider({ name, label }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider valueLabelDisplay="auto" {...field} />
        </>
      )}
    />
  );
}
