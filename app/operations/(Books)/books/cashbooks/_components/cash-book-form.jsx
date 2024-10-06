// cash-book-form.js
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const CashBookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Month Field */}
      <FormItem>
        <FormLabel>Month</FormLabel>
        <FormControl>
          <Input
            {...register("month")}
            type="number"
            placeholder="Enter month (1-12)"
          />
        </FormControl>
        <FormDescription>Select the month for the cashbook</FormDescription>
        <FormMessage>{errors.month && "Month is required."}</FormMessage>
      </FormItem>

      {/* Year Field */}
      <FormItem>
        <FormLabel>Year</FormLabel>
        <FormControl>
          <Input {...register("year")} type="number" placeholder="Enter year" />
        </FormControl>
        <FormDescription>Select the year for the cashbook</FormDescription>
        <FormMessage>{errors.year && "Year is required."}</FormMessage>
      </FormItem>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CashBookForm;
