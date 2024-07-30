import { z } from "zod";
import { patterns } from "../constants";

export const schema1 = z.object({
  name: z
    .string()
    .min(1, { message: "The name should be at least 1 character" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .refine((text) => patterns.email.test(text), {
      message: "Email not valid",
    }),
  states: z.array(z.string()).min(1).max(2),
  languagesSpoken: z.array(z.string()),
  gender: z.string().min(1),
  skills: z.array(z.string()).max(2),
  registrationDateAndTime: z.date(),
  formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
  salaryRange: z.array(z.number()).max(2),
});

export const defaultValues1 = {
  email: "",
  name: "",
  states: [],
};
