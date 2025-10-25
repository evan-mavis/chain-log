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

export async function getLogsInRange(
  start: Date,
  end: Date,
): Promise<
  { day: string; mood: "happy" | "sad" | "meh"; notes: string | null }[]
> {
  const userId = await getSessionUserId();

  if (!userId) {
    return [] as {
      day: string;
      mood: "happy" | "sad" | "meh";
      notes: string | null;
    }[];
  }

  const startStr = formatDateForDB(start);
  const endStr = formatDateForDB(end);

  const logs = await db.query.logs.findMany({
    where: (t, { and, eq, gte, lte }) =>
      and(eq(t.userId, userId), gte(t.day, startStr), lte(t.day, endStr)),
    columns: { day: true, mood: true, notes: true },
    orderBy: (t, { asc }) => [asc(t.day)],
  });

  return logs.map((l) => ({
    day: l.day,
    mood: l.mood,
    notes: l.notes ?? null,
  }));
}
