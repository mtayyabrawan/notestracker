import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  username: z
    .string()
    .regex(/^[a-z0-9]+$/, "Username must be lowercase alphanumeric"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
      (val) => (val.match(/[a-z]/g) || []).length >= 4,
      "Password must contain at least 4 lowercase letters",
    )
    .refine(
      (val) => (val.match(/[A-Z]/g) || []).length >= 1,
      "Password must contain at least 1 uppercase letter",
    )
    .refine(
      (val) => (val.match(/[0-9]/g) || []).length >= 2,
      "Password must contain at least 2 numbers",
    )
    .refine(
      (val) => (val.match(/[^a-zA-Z0-9]/g) || []).length >= 1,
      "Password must contain at least 1 symbol",
    ),
  gender: z.enum(["male", "female"], "Gender must be male or female"),
  birthdate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Birthdate is required"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export default registerSchema;
