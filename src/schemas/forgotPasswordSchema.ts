import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default forgotPasswordSchema;
