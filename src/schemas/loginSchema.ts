import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email format"),
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
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default loginSchema;
