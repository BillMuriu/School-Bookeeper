import { z } from "zod";

export const studentSchema = z.object({
  admissionNumber: z
    .string()
    .max(20, { message: "Admission number must not exceed 20 characters." })
    .nonempty({ message: "Admission number is required." }),

  firstName: z
    .string()
    .max(50, { message: "First name must not exceed 50 characters." })
    .nonempty({ message: "First name is required." }),

  lastName: z
    .string()
    .max(50, { message: "Last name must not exceed 50 characters." })
    .nonempty({ message: "Last name is required." }),

  dateOfBirth: z.date({ required_error: "Date of birth is required." }),

  gender: z.enum(["male", "female"], {
    required_error: "Gender is required.",
    invalid_type_error: "Gender must be either male or female.",
  }),

  admissionDate: z.date({ required_error: "Admission date is required." }),

  gradeClassLevel: z.enum(["form1", "form2", "form3", "form4"], {
    required_error: "Class level is required.",
    invalid_type_error:
      "Class level must be one of form1, form2, form3, or form4.",
  }),

  guardiansName: z
    .string()
    .max(100, { message: "Guardian's name must not exceed 100 characters." })
    .nonempty({ message: "Guardian's name is required." }),

  guardiansPhoneNumber: z
    .string()
    .max(15, {
      message: "Guardian's phone number must not exceed 15 characters.",
    })
    .nonempty({ message: "Guardian's phone number is required." }),
});

export const defaultStudent = {
  admissionNumber: "",
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
  gender: "male", // Default to 'male', can be changed.
  admissionDate: new Date(),
  gradeClassLevel: "form1", // Default to 'form1', can be changed.
  guardiansName: "",
  guardiansPhoneNumber: "",
};
