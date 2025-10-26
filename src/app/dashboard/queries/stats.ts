import { db } from "@/db/db";
import { getSessionUserId } from "@/lib/auth-helpers";
import { formatDateForDB } from "@/lib/date-utils";

export async function getStatsData() {
  const userId = await getSessionUserId();

  if (!userId) {
    return {
      currentStreak: 0,
      last7Days: 0,
      thisMonth: 0,
      bestStreak: 0,
    };
  }

  const logs = await db.query.logs.findMany({
    where: (t, { eq }) => eq(t.userId, userId),
    columns: { day: true },
    orderBy: (t, { desc }) => desc(t.day),
  });

  const today = new Date();
  const logDays = new Set(logs.map((l) => l.day));

  function addDays(date: Date, delta: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + delta);
    return d;
  }

  function isAchieved(date: Date) {
    return logDays.has(formatDateForDB(date));
  }

  function computeCurrentStreak(reference: Date) {
    let streak = 0;
    let d = new Date(reference);
    if (!isAchieved(d)) {
      d = addDays(d, -1);
    }
    while (isAchieved(d)) {
      streak += 1;
      d = addDays(d, -1);
    }
    return streak;
  }

  function countLastNDays(reference: Date, n: number) {
    let count = 0;
    for (let i = 0; i < n; i++) {
      const d = addDays(reference, -i);
      if (isAchieved(d)) count += 1;
    }
    return count;
  }

  function countThisMonth(reference: Date) {
    const start = new Date(reference.getFullYear(), reference.getMonth(), 1);
    let count = 0;
    for (
      let d = new Date(start);
      d.getMonth() === reference.getMonth() && d <= reference;
      d = addDays(d, 1)
    ) {
      if (isAchieved(d)) count += 1;
    }
    return count;
  }

  function computeBestStreak(reference: Date, lookbackDays: number) {
    let best = 0;
    let current = 0;
    for (let i = lookbackDays - 1; i >= 0; i--) {
      const d = addDays(reference, -i);
      if (isAchieved(d)) {
        current += 1;
        if (current > best) best = current;
      } else {
        current = 0;
      }
    }
    return best;
  }

  return {
    currentStreak: computeCurrentStreak(today),
    last7Days: countLastNDays(today, 7),
    thisMonth: countThisMonth(today),
    bestStreak: computeBestStreak(today, 90),
  };
}
