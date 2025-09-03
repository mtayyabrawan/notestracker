import { z } from "zod";

const otpSchema = z.object({
  1: z.number({ error: "Must be 0 to 9" }).gte(0).lte(9),
  2: z.number({ error: "Must be 0 to 9" }).gte(0).lte(9),
  3: z.number({ error: "Must be 0 to 9" }).gte(0).lte(9),
  4: z.number({ error: "Must be 0 to 9" }).gte(0).lte(9),
  5: z.number({ error: "Must be 0 to 9" }).gte(0).lte(9),
  6: z.number({ error: "Must be 0 to 9" }).gte(0).lte(9),
});

export type OTPSchema = z.infer<typeof otpSchema>;

export default otpSchema;
