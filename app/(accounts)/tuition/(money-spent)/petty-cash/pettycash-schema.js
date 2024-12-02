import { z } from "zod";

// Define the Petty Cash schema
export const pettyCashSchema = z.object({
  account: z
    .string()
    .min(1, { message: "Account field is required." })
    .default(""), // Default value for account

  payeeName: z
    .string()
    .min(2, { message: "Payee name must be at least 2 letters." }), // Minimum length for payee name

  chequeNumber: z
    .string()
    .min(1, { message: "Cheque number is required." })
    .max(20, { message: "Cheque number must not exceed 20 characters." }), // Length constraints for cheque number

  amount: z
    .number()
    .positive({ message: "Amount must be a positive number." }) // Ensure amount is positive
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
      message: "Amount must be a valid decimal with up to two decimal places.",
    }),

  description: z.string().optional(), // Optional description

  dateIssued: z.date({ required_error: "Date issued is required." }), // Date field
});

// Default values for Petty Cash
export const defaultPettyCash = {
  account: "tuition_account",
  payeeName: "",
  chequeNumber: "",
  amount: 0,
  description: "",
  dateIssued: new Date(""),
};
