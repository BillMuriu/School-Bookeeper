import { z } from "zod";

export const bankChargesSchema = z.object({
  account: z.string(),
  amount: z.number().nullable(),
  charge_date: z.date().nullable(),
  description: z.string().default(""),
});

export const defaultBankCharges = {
  account: "school fund",
  amount: null,
  charge_date: new Date(),
  description: "",
};
