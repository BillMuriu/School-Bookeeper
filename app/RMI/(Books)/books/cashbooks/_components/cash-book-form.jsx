"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { CashbookReceiptsTable } from "@/components/tables/cashbook-receipts";
import { cashbook_receipts_colums } from "./cash-book-receipts-columns";
import { paymentColumns } from "./cash-book-payments-colums";
import { CashbookPaymentsTable } from "@/components/tables/cashbook-payments";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CashbookPDF from "./cash-book-pdf-table";

const CashBookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const [receipts, setReceipts] = useState([]); // State for receipts
  const [payments, setPayments] = useState([]); // State for payments
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState(null); // Store form data for the PDF

  const onSubmit = (data) => {
    const parsedData = {
      ...data,
      month: Number(data.month),
      year: Number(data.year),
    };

    console.log("Parsed data:", parsedData);
    setFormData(parsedData); // Store the form data
    fetchCashbooks(parsedData.year, parsedData.month);
  };

  const fetchCashbooks = async (year, month) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/books/cashbook/?year=${year}&month=${month}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched cashbooks data:", data);

      setReceipts(data.receipts);
      setPayments(data.payments);
    } catch (error) {
      console.error("Error fetching cashbooks:", error);
    } finally {
      setLoading(false);
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
          <div className="flex-1">
            <label>Month</label>
            <Input
              {...register("month", {
                required: "Month is required.",
                valueAsNumber: true,
                validate: (value) =>
                  (value >= 1 && value <= 12) ||
                  "Month must be between 1 and 12.",
              })}
              type="number"
              placeholder="Enter month (1-12)"
            />
            {errors.month && <p>{errors.month.message}</p>}
          </div>

          {/* Year Field */}
          <div className="flex-1">
            <label>Year</label>
            <Input
              {...register("year", {
                required: "Year is required.",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Enter year"
            />
            {errors.year && <p>{errors.year.message}</p>}
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>

      {loading && <p>Loading cashbooks...</p>}

      {/* PDF Download Link */}
      {receipts.length > 0 || payments.length > 0 ? (
        <Button className="mt-4">
          <div>
            <PDFDownloadLink
              document={
                <CashbookPDF
                  month={formData?.month}
                  year={formData?.year}
                  cashbookData={{ receipts, payments }}
                />
              }
              fileName={`cashbook_${formData?.month}_${formData?.year}.pdf`}
            >
              {({ loading }) =>
                loading ? "Preparing document..." : "Download Cashbook PDF"
              }
            </PDFDownloadLink>
          </div>
        </Button>
      ) : null}

      {/* Receipts Table */}
      {Array.isArray(receipts) && receipts.length > 0 && !loading && (
        <div>
          <h2>Fetched Receipts:</h2>
          <CashbookReceiptsTable
            columns={cashbook_receipts_colums}
            data={receipts}
          />
        </div>
      )}

      {Array.isArray(receipts) && receipts.length === 0 && !loading && (
        <p>No receipts found for the selected month and year.</p>
      )}

      {/* Payments Table */}
      {Array.isArray(payments) && payments.length > 0 && !loading && (
        <div>
          <h2>Fetched Payments:</h2>
          <CashbookPaymentsTable columns={paymentColumns} data={payments} />
        </div>
      )}

      {Array.isArray(payments) && payments.length === 0 && !loading && (
        <p>No payments found for the selected month and year.</p>
      )}
    </div>
  );
};

export default CashBookForm;
