"use server";

import { db } from "@/db/db";
import { sql } from "drizzle-orm";
import { getSessionUserId } from "@/lib/auth-helpers";
import { revalidatePath } from "next/cache";
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

  await db.execute(
    sql`
      update "user" set
        "email_opt_in" = ${optIn},
        "email_reminder_time" = ${time ?? null},
        "email_timezone" = ${timezone ?? null},
        "email_consent_at" = case when ${optIn} then ${new Date()} else "email_consent_at" end,
        "email_consent_source" = case when ${optIn} then ${"ui:user-preferences"} else "email_consent_source" end,
        "updated_at" = ${new Date()}
      where "id" = ${userId}
    ` as any,
  );

  revalidatePath("/dashboard");
  return { status: "success" };
}
