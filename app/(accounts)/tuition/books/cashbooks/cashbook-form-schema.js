// cashbook-form-schema.js
import { z } from "zod";

export const cashbookQuerySchema = z.object({
  month: z
    .number()
    .min(1)
    .max(12, { message: "Month must be between 1 and 12." }),
  year: z.number().min(2000, { message: "Year must be at least 2000." }),
});

export const defaultCashbookQuery = {
  month: new Date().getMonth() + 1, // Current month (1-12)
  year: new Date().getFullYear(), // Current year
};
