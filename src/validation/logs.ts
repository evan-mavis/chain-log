import { z } from "zod";

export const moodValues = ["happy", "sad", "meh"] as const;
export const LogInputSchema = z.object({
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date (YYYY-MM-DD)"),
  notes: z
    .string()
    .trim()
    .max(2000, "Notes too long")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  mood: z.enum(moodValues),
});

export type LogInput = z.infer<typeof LogInputSchema>;
