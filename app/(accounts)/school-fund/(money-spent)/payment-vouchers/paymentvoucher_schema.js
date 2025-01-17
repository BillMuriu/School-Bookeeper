import { z } from "zod";

export const paymentVoucherSchema = z.object({
  account: z.string().default(""),
  voucher_no: z.number().nullable(),
  payee_name: z.string().min(1, { message: "Payee name is required." }),
  particulars: z.string().min(1, { message: "Particulars are required." }),
  amount_shs: z
    .number()
    .nullable() // Allows null, matching the backend's schema
    .refine((value) => value === null || value > 0, {
      message: "Amount must be a positive number.",
    })
    .refine(
      (value) =>
        value === null || /^\d+(\.\d{1,2})?$/.test(value?.toString() || ""),
      { message: "Amount must be a valid decimal with up to two places." }
    ),
  payment_mode: z.enum(["cash", "bank"]).nullable().optional(),
  total_amount_in_words: z
    .string()
    .min(1, { message: "Total amount in words is required." }),
  prepared_by: z.string().min(1, { message: "Preparer's name is required." }),
  authorised_by: z
    .string()
    .min(1, { message: "Authoriser's name is required." }),
  vote_head: z.string().nullable(),
  vote_details: z.string().min(1, { message: "Vote details are required." }),
  date: z.date().nullable(),
});

export const defaultPaymentVoucher = {
  account: "school_fund_account",
  voucher_no: null,
  payee_name: "",
  particulars: "",
  amount_shs: null,
  payment_mode: "cash",
  total_amount_in_words: "",
  prepared_by: "",
  authorised_by: "",
  vote_head: null,
  vote_details: "",
  date: new Date(),
};
