"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack, Container } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import SkeletonLoader from "@/components/skeleton-loader";

const SignInForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
  } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Data submitted:", JSON.stringify(data, null, 2));
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/custom_auth/send-magic-link/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.log("Erastus");
      } else {
        // Handle success response (e.g., magic link sent)
        console.log("Magic link sent successfully:", result);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      setError("email", { message: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
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
          name="email"
          label="Email"
          type="email"
          required
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <Button type="submit">Sign In</Button>
      </Stack>
    </Container>
  );
};

export default SignInForm;
