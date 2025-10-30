"use server";

import { db } from "@/db/db";
import { eq } from "drizzle-orm";
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

export async function updateTimezone(
  timezone: string,
): Promise<{ success: boolean; error?: string; updated?: boolean }> {
  const userId = await getSessionUserId();
  if (!userId) return { success: false, error: "Not authenticated" };

  if (!timezone || typeof timezone !== "string") {
    return { success: false, error: "Invalid timezone" };
  }

  try {
    // Check if timezone needs updating (avoid unnecessary DB writes)
    const userRow = await db.query.user.findFirst({
      where: (t, { eq }) => eq(t.id, userId),
      columns: { emailTimezone: true },
    });

    // Only update if timezone is different or not set
    if (userRow?.emailTimezone === timezone) {
      return { success: true, updated: false };
    }

    await db
      .update(user)
      .set({
        emailTimezone: timezone,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId));

    return { success: true, updated: true };
  } catch (error) {
    console.error("Error updating timezone:", error);
    return { success: false, error: "Failed to update timezone" };
  }
}
