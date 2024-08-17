import { z } from "zod";

export const bankChargesSchema = z.object({
  account: z.string(),
  amount: z.number().positive(),
  chargeDate: z.date(),
  description: z.string().optional(),
});

export const defaultBankCharges = {
  account: "",
  amount: 0,
  chargeDate: new Date(),
  description: "",
};
