import { z } from "zod";

export const paymentVoucherSchema = z.object({
  account: z
    .string()
    .min(2, { message: "Account name must be at least 2 letters." })
    .default("default_account"),

  voucherNo: z
    .number()
    .positive({ message: "Voucher number must be a positive number." }),

  payeeName: z
    .string()
    .min(2, { message: "Payee name must be at least 2 letters." }),

  particulars: z.string().min(1, { message: "Particulars are required." }),

  amountShs: z
    .number()
    .positive({ message: "Amount in Shillings must be a positive number." })
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
      message:
        "Amount in Shillings must be a valid decimal with up to two decimal places.",
    }),

  paymentMode: z.enum(["cash", "cheque"], {
    message: "Payment mode is required.",
  }),

  paymentMode: z.enum(["cash", "bank"], {
    message: "Payment mode is required.",
  }),

  totalAmountInWords: z
    .string()
    .min(1, { message: "Total amount in words is required." }),

  preparedBy: z
    .string()
    .min(2, { message: "Preparer name must be at least 2 letters." }),

  authorisedBy: z
    .string()
    .min(2, { message: "Authoriser name must be at least 2 letters." }),

  voteHead: z.string().min(1, { message: "Vote Head is required." }),

  voteDetails: z.string().min(1, { message: "Vote Details are required." }),

  date: z.date({ required_error: "Date is required." }),
});

export const defaultPaymentVoucher = {
  account: "rmi_account",
  voucherNo: null,
  payeeName: "",
  particulars: "",
  amountShs: null,
  paymentMode: "cash",
  totalAmountInWords: "",
  preparedBy: "",
  authorisedBy: "",
  voteHead: "",
  voteDetails: "",
  date: new Date(),
};
