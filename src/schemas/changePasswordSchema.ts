import { z } from "zod";

const changePasswordSchema = z.object({
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
  newPassword: z
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

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export default changePasswordSchema;
