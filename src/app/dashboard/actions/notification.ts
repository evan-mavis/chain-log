"use server";

import { db } from "@/db/db";
import { and, eq } from "drizzle-orm";
import { user } from "@/db/schemas/auth-schema";
import { getSessionUserId } from "@/lib/auth-helpers";
import { UpdateEmailNotificationSchema } from "@/validation/notification";

type ActionState = { status: "idle" | "success" | "error"; message?: string };

export async function updateEmailNotifications(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const userId = await getSessionUserId();
  if (!userId) return { status: "error", message: "Not authenticated" };

  const parsed = UpdateEmailNotificationSchema.safeParse({
    optIn: (formData.get("optIn") || "false").toString(),
    time: (formData.get("time") || "").toString() || undefined,
    timezone: (formData.get("timezone") || "").toString() || undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  const { optIn, time, timezone } = parsed.data;

  await db
    .update(user)
    .set({
      emailOptIn: optIn,
      emailReminderTime: time ?? null,
      emailTimezone: timezone ?? null,
      emailConsentAt: optIn
        ? new Date()
        : (undefined as unknown as Date | null),
      emailConsentSource: optIn
        ? "ui:user-preferences"
        : (undefined as unknown as string | null),
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId));

  return { status: "success" };
}
