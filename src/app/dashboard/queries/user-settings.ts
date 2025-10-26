import { db } from "@/db/db";
import { getSessionUserId } from "@/lib/auth-helpers";

export type EmailNotificationSettings = {
  optIn: boolean;
  time: string | null;
  timezone: string | null;
} | null;

export async function getEmailNotificationSettings(): Promise<EmailNotificationSettings> {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const row = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.id, userId),
    columns: {
      emailOptIn: true,
      emailReminderTime: true,
      emailTimezone: true,
    },
  });

  if (!row) return null;

  return {
    optIn: row.emailOptIn,
    time: row.emailReminderTime,
    timezone: row.emailTimezone,
  };
}
