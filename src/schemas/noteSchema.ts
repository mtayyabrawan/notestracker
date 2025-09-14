import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character long")
    .max(100, "Title must not exceed 100 characters")
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      "Title can only contain letters, numbers, and spaces",
    ),
  content: z
    .string()
    .min(1, "Content must be at least 1 character long")
    .max(1000, "Content must not exceed 1000 characters")
    .regex(
      /^[a-zA-Z0-9.,!?() ]+$/,
      "Content can only contain letters, numbers, spaces, and .,!?()",
    ),
  tag: z
    .string()
    .min(1, "Tag must be at least 1 character long")
    .max(20, "Tag must not exceed 20 characters")
    .regex(/^[a-zA-Z]+$/, "Tag can only contain letters"),
});

export type NoteSchema = z.infer<typeof noteSchema>;

export default noteSchema;
