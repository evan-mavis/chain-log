import { db } from "@/db/db";
import { getSessionUserId } from "@/lib/auth-helpers";
import { formatDateForDB } from "@/lib/date-utils";

export async function getCurrentLog() {
  const userId = await getSessionUserId();

  if (!userId) {
    return null;
  }

  const targetDate = new Date();
  const dayStr = formatDateForDB(targetDate);

  const log = await db.query.logs.findFirst({
    where: (t, { and, eq }) => and(eq(t.userId, userId), eq(t.day, dayStr)),
  });

  return log ?? null;
}
