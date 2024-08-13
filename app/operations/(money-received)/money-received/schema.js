import { z } from "zod";

export const operationReceiptSchema = z.object({
  account: z
    .string()
    .min(2, { message: "account name must be at least 2 letters." }),

  receivedFrom: z.enum(["FSE", "others"], {
    message: "Received From is required.",
  }),
  cashBank: z.enum(["cash", "bank"]),

  totalAmount: z
    .number()
    .positive()
    .min(0, { message: "Total Amount must be a positive number." }),

  rmiFund: z
    .number()
    .positive()
    .min(0, { message: "RMI Fund must be a positive number." }),

  otherVotheads: z
    .number()
    .positive()
    .min(0, { message: "Other Votheads must be a positive number." }),

  date: z.date({ required_error: "Date is required." }),
});

export const defaultOperationReceipt = {
  account: "operations_account",
  receivedFrom: "FSE",
  cashBank: "bank",
  totalAmount: null,
  rmiFund: null,
  otherVotheads: null,
  date: "2024-08-01T00:00:00Z",
};
