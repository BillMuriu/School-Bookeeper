import { z } from "zod";

export const rmiReceiptSchema = z.object({
  account: z
    .string()
    .min(2, { message: "Account name must be at least 2 letters." }),

  received_from: z.enum(["pettycash", "FSE", "others"], {
    message: "Received From is required.",
  }),
  cash_bank: z.enum(["cash", "bank"], {
    message: "Cash or Bank is required.",
  }),

  total_amount: z.number().min(0).max(99999999.99).default(0.0),

  date: z.date({ required_error: "Date is required." }),
});

export const defaultRmiReceipt = {
  account: "rmi_account",
  received_from: "FSE", // Adjust default value if necessary
  cash_bank: "bank",
  total_amount: 0,
  date: new Date(),
};
