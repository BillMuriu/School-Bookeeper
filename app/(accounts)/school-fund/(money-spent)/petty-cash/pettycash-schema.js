import { z } from "zod";

// Define the Petty Cash schema
export const pettyCashSchema = z.object({
  account: z.string().nonempty({ message: "Account field is required." }), // Backend expects a non-empty string

  payee_name: z.string().nonempty({ message: "Payee name is required." }), // Field name matches backend

  cheque_number: z
    .string()
    .nonempty({ message: "Cheque number is required." })
    .max(20, { message: "Cheque number must not exceed 20 characters." }),

  amount: z.number().nullable(), // Backend allows null for amount

  description: z.string().optional().default(""), // Optional with default as an empty string

  date_issued: z.date().nullable(), // Backend allows null for the date
});

// Default values for Petty Cash
export const defaultPettyCash = {
  account: "school_fund",
  payee_name: "",
  cheque_number: "",
  amount: null,
  description: "",
  date_issued: new Date(),
};
