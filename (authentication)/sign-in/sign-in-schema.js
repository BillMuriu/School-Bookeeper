import { z } from "zod";

const emailSchema = z.object({
  email: z
    .string()
    .email("Invalid email format.")
    .max(100, "Email must be 100 characters or fewer"),
});

const defaultEmailValues = {
  email: "",
};

export { emailSchema, defaultEmailValues };
