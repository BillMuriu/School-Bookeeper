import { z } from "zod";

export const schoolFundReceiptSchema = z.object({
  account: z
    .string()
    .min(2, { message: "Account name must be at least 2 letters." }),

  receivedFrom: z.enum(["government", "donation", "others"], {
    message: "Received From is required.",
  }),

  cashBank: z.enum(["cash", "bank"]),

  totalAmount: z
    .number()
    .positive()
    .min(0, { message: "Total Amount must be a positive number." }),

  student: z
    .number()
    .nullable()
    .refine((value) => value === null || value >= 0, {
      message: "Student number must be a positive number.",
    })
    .optional(),

  date: z.date({ required_error: "Date is required." }),
});

export const defaultSchoolFundReceipt = {
  account: "school_fund_account",
  receivedFrom: "",
  cashBank: "bank",
  totalAmount: null,
  student: null,
  date: new Date(),
};
