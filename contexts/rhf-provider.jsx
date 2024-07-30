"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";

export const RhfProvider = ({ children, schema, defaultValues, ...props }) => {
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods} {...props}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <DevTool control={methods.control} />
      )}
    </FormProvider>
  );
};
