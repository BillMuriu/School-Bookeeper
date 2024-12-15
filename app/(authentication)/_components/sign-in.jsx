"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFTextField } from "@/components/form-components/RHFTextField";
import SkeletonLoader from "@/components/skeleton-loader";
import { GalleryVerticalEnd } from "lucide-react";

const SignInForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    setError,
  } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
        throw new Error(result.message || "Failed to send magic link.");
      }

      setSuccess(true);
    } catch (error) {
      console.error("Error during sign in:", error);
      setError("email", {
        message: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (success) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold text-center mb-4">
            Check your email to access the login link
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
            <GalleryVerticalEnd className="w-6 h-6 text-indigo-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            Welcome to Ciagini Secondary
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email to sign in or register.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField
              name="email"
              label="Email"
              type="email"
              required
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Sign In
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
