import { db } from "@/db/db";
import { getSessionUserId } from "@/lib/auth-helpers";
import { formatDateForDB } from "@/lib/date-utils";

function getDateInTimezone(date: Date, tz: string): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = fmt
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});

  return `${parts.year}-${parts.month}-${parts.day}`;
}

export async function getCurrentLog() {
  const userId = await getSessionUserId();
  if (!userId) return null;

  // get user's timezone to compute "today" in their local timezone
  // this matches how logs are created on the client (browser's local timezone)
  const userRow = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.id, userId),
    columns: { emailTimezone: true },
  });

  // use stored timezone if available, otherwise default to UTC
  // note: Users should have timezone set (either via email notifications or auto-detected)
  const userTimezone = userRow?.emailTimezone || "UTC";
  const todayStr = getDateInTimezone(new Date(), userTimezone);

  return (
    (await db.query.logs.findFirst({
      where: (t, { and, eq }) => and(eq(t.userId, userId), eq(t.day, todayStr)),
    })) ?? null
  );
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
