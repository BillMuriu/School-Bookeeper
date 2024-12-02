import { z } from "zod";

export const termPeriodSchema = z.object({
  termName: z
    .string()
    .min(2, { message: "Term name must be at least 2 letters." }),

  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),

  year: z
    .number()
    .int()
    .min(2000, { message: "Year must be 2000 or later." })
    .max(new Date().getFullYear() + 1, {
      message: "Year cannot exceed next year.",
    }),

  fees: z
    .number()
    .min(0, { message: "Fees must be a positive value." })
    .max(99999999.99, { message: "Fees exceed maximum allowed value." }),
});

export const defaultTermPeriod = {
  termName: "Term 1",
  startDate: new Date(), // Adjust as needed
  endDate: new Date(), // Adjust as needed
  year: new Date().getFullYear(),
  fees: 0,
};
