import { Controller, useFormContext } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";

export function RHFCheckbox({ name, options, label }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value.includes(option.id)}
                    onChange={() => {
                      if (value.includes(option.id)) {
                        onChange(value.filter((item) => item !== option.id));
                      } else {
                        onChange([...value, option.id]);
                      }
                    }}
                  />
                }
                label={option.label}
                key={option.id}
              />
            ))}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
