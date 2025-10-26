import { z } from "zod";

export const TimeHHmm = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Use 24h time HH:mm");

export const UpdateEmailNotificationSchema = z.object({
  optIn: z.enum(["true", "false"]).transform((v) => v === "true"),
  time: TimeHHmm.optional(),
  timezone: z.string().min(1).optional(),
});

export type UpdateEmailNotificationInput = z.infer<
  typeof UpdateEmailNotificationSchema
>;
