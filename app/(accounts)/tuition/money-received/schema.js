import { z } from "zod";

export const tuitionReceiptSchema = z.object({
  account: z
    .string()
    .min(2, { message: "Account name must be at least 2 letters." }),

  receivedFrom: z.enum(["pettycash", "FSE", "others"], {
    message: "Received From is required.",
  }),
  cashBank: z.enum(["cash", "bank"], {
    message: "Cash or Bank is required.",
  }),

  totalAmount: z.number().min(0).max(99999999.99).default(0.0),

  date: z.date({ required_error: "Date is required." }),
});

export const defaultTuitionReceipt = {
  account: "tuition_account",
  receivedFrom: "FSE", // Adjust default value if necessary
  cashBank: "bank",
  totalAmount: 0,
  date: new Date(),
};
