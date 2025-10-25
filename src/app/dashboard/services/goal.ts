import { db } from "@/db/db";
import { getSessionUserId } from "@/lib/auth-helpers";

export async function getActiveGoals() {
  const userId = await getSessionUserId();

  if (!userId) {
    return null;
  }

  const rows = await db.query.goals.findMany({
    where: (t, { and, eq }) => and(eq(t.userId, userId), eq(t.isActive, true)),
    columns: { type: true, description: true },
  });

  const result: {
    long: string | null;
    short: string | null;
    daily: string | null;
  } = {
    long: null,
    short: null,
    daily: null,
  };

  for (const r of rows) {
    if (r.type === "long_term") result.long = r.description ?? null;
    else if (r.type === "short_term") result.short = r.description ?? null;
    else if (r.type === "daily") result.daily = r.description ?? null;
  }

  return result;
}

export async function getCompletedGoals() {
  const userId = await getSessionUserId();

  if (!userId) {
    return [];
  }

  const rows = await db.query.goals.findMany({
    where: (t, { and, eq }) => and(eq(t.userId, userId), eq(t.isActive, false)),
    columns: {
      id: true,
      type: true,
      description: true,
      updatedAt: true,
    },
    orderBy: (t, { desc }) => desc(t.updatedAt),
  });

  return rows.map((row) => ({
    id: row.id.toString(),
    value: row.description,
    type: (row.type === "long_term"
      ? "Long-term"
      : row.type === "short_term"
        ? "Short-term"
        : "Daily") as "Long-term" | "Short-term" | "Daily",
    completedAt: row.updatedAt.toLocaleDateString(),
  }));
}
