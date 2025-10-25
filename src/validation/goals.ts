import { z } from "zod";

export const goalTypeValues = ["long", "short", "daily"] as const;

export const GoalInputSchema = z.object({
  goalType: z.enum(goalTypeValues),
  description: z
    .string()
    .trim()
    .min(1, "Goal description is required")
    .max(500, "Goal description too long"),
});

export const CompleteGoalSchema = z.object({
  goalType: z.enum(goalTypeValues),
});

export type GoalInput = z.infer<typeof GoalInputSchema>;
export type CompleteGoalInput = z.infer<typeof CompleteGoalSchema>;
