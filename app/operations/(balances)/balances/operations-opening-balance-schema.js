import { z } from "zod";

const operationsOpeningBalanceSchema = z.object({
  account: z.string().max(100, "Account name must be 100 characters or fewer"),
  date: z.date({ required_error: "Date issued is required." }),
  bankAmount: z.number().min(0).max(99999999.99).default(0.0),
  cashAmount: z.number().min(0).max(99999999.99).default(0.0),
  description: z.string().optional().default(""),
});

const defaultOperationsOpeningBalanceValues = {
  account: "operations",
  date: new Date(),
  bankAmount: 0.0,
  cashAmount: 0.0,
  description: "",
};

export {
  operationsOpeningBalanceSchema,
  defaultOperationsOpeningBalanceValues,
};
