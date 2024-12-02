import { z } from "zod";

export const studentOpeningBalanceSchema = z.object({
  student: z
    .number({ required_error: "Student ID is required." })
    .positive({ message: "Student ID must be a positive number." }),

  balance: z
    .string()
    .regex(/^[-+]?\d+(\.\d{1,2})?$/, {
      message: "Balance must be a valid number with up to two decimal places.",
    })
    .nonempty({ message: "Balance is required." }),

  dateRecorded: z.date({ required_error: "Date recorded is required." }).or(
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date recorded must be in 'YYYY-MM-DD' format.",
    })
  ),
});

export const defaultStudentOpeningBalance = {
  student: null, // Default to null, to be set when a student is selected.
  balance: "0.00", // Default to "0.00", can be adjusted.
  dateRecorded: new Date(), // Default to the current date.
};
