"use client";

import React, { useState } from "react";
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
import { CashbookReceiptsTable } from "@/components/tables/cashbook-receipts";
import { cashbook_receipts_colums } from "./cash-book-receipts-columns";
import { paymentColumns } from "./cash-book-payments-colums";
import { CashbookPaymentsTable } from "@/components/tables/cashbook-payments";

const CashBookForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [receipts, setReceipts] = useState([]); // State for receipts
  const [payments, setPayments] = useState([]); // State for payments
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = (data) => {
    // Convert string inputs to numbers
    const parsedData = {
      ...data,
      month: Number(data.month),
      year: Number(data.year),
    };

    console.log("Parsed data:", parsedData);
    fetchCashbooks(parsedData.year, parsedData.month);
  };

  const fetchCashbooks = async (year, month) => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/books/cashbook/?year=${year}&month=${month}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched cashbooks data:", data); // Log the fetched data

      // Set receipts and payments states
      setReceipts(data.receipts);
      setPayments(data.payments);
    } catch (error) {
      console.error("Error fetching cashbooks:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="flex justify-between space-x-4">
          {/* Month Field */}
          <FormItem className="flex-1">
            <FormLabel>Month</FormLabel>
            <FormControl>
              <Input
                {...register("month", {
                  required: "Month is required.",
                  valueAsNumber: true, // Ensure value is treated as a number
                  validate: (value) => {
                    if (value < 1 || value > 12) {
                      return "Month must be between 1 and 12.";
                    }
                    return true;
                  },
                })}
                type="number"
                placeholder="Enter month (1-12)"
                className="w-full"
              />
            </FormControl>
            <FormDescription>Select the month for the cashbook</FormDescription>
            <FormMessage>{errors.month && errors.month.message}</FormMessage>
          </FormItem>

          {/* Year Field */}
          <FormItem className="flex-1">
            <FormLabel>Year</FormLabel>
            <FormControl>
              <Input
                {...register("year", {
                  required: "Year is required.",
                  valueAsNumber: true, // Ensure value is treated as a number
                })}
                type="number"
                placeholder="Enter year"
                className="w-full"
              />
            </FormControl>
            <FormDescription>Select the year for the cashbook</FormDescription>
            <FormMessage>{errors.year && errors.year.message}</FormMessage>
          </FormItem>
        </div>

        <Button type="submit">Submit</Button>
      </form>
      {loading && <p>Loading cashbooks...</p>} {/* Loading indicator */}
      {/* Check if receipts is an array and has length */}
      {Array.isArray(receipts) && receipts.length > 0 && !loading && (
        <div>
          <h2>Fetched Receipts:</h2>
          <CashbookReceiptsTable
            columns={cashbook_receipts_colums}
            data={receipts}
          />{" "}
          {/* DataTable for receipts */}
        </div>
      )}
      {/* If no receipts were fetched */}
      {Array.isArray(receipts) && receipts.length === 0 && !loading && (
        <p>No receipts found for the selected month and year.</p>
      )}
      {/* Check if payments is an array and has length */}
      {Array.isArray(payments) && payments.length > 0 && !loading && (
        <div>
          <h2>Fetched Payments:</h2>
          <CashbookPaymentsTable
            columns={paymentColumns} // Use paymentColumns
            data={payments} // Pass fetched payments data
          />{" "}
          {/* DataTable for payments */}
        </div>
      )}
      {/* If no payments were fetched */}
      {Array.isArray(payments) && payments.length === 0 && !loading && (
        <p>No payments found for the selected month and year.</p>
      )}
    </div>
  );
};

export default CashBookForm;
