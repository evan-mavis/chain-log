import type { ActiveGoalsData } from "@/types/goals";
import type { LogDTO } from "@/types/logs";

export type DemoStats = {
  currentStreak: number;
  last7Days: number;
  thisMonth: number;
  bestStreak: number;
};

export type DemoCompletedGoal = {
  id: string;
  value: string;
  type: "Long-term" | "Short-term" | "Daily";
  completedAt: string;
};

function toYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// generate sporadic logs over the last ~3 months (current month + previous two)
const today = new Date();
const start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

const sampleNotes = [
  "LeetCode DP practice: coin change & LIS",
  "Next.js app router refactor",
  "Optimized API routes; added caching",
  "Reviewed PRs; fixed TypeScript types",
  "Built reusable Button; polished UI",
  "Wrote tests for date utils",
  "Solved graph traversal problems",
  "Deployed preview to Vercel",
  "Wrote docs and README cleanups",
  "Debugged hydration mismatch edge case",
];

const moods: LogDTO["mood"][] = ["happy", "meh", "sad"];

export const demoLogs: LogDTO[] = (() => {
  const logs: LogDTO[] = [];
  let d = new Date(start);
  let seed = today.getDate();
  while (d <= end) {
    // sporadic streaks: some 2-4 day sequences and gaps
    const rnd = (seed * 9301 + 49297) % 233280;
    seed = rnd;
    const chance = rnd / 233280; // 0..1
    if (chance > 0.6) {
      logs.push({
        day: toYMD(d),
        mood: moods[Math.floor(chance * moods.length) % moods.length],
        notes:
          sampleNotes[
            Math.floor(chance * sampleNotes.length) % sampleNotes.length
          ],
      });
    }
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
  }
  return logs;
})();

// compute stats from demoLogs to keep them consistent
export const demoStats: DemoStats = (() => {
  const set = new Set(demoLogs.map((l) => l.day));
  function addDays(date: Date, delta: number) {
    const x = new Date(date);
    x.setDate(x.getDate() + delta);
    return x;
  }
  function key(date: Date) {
    return toYMD(date);
  }
  function has(date: Date) {
    return set.has(key(date));
  }
  // current streak
  let cur = 0;
  let d = new Date(today);
  if (!has(d)) d = addDays(d, -1);
  while (has(d)) {
    cur++;
    d = addDays(d, -1);
  }
  // last 7 days
  let last7 = 0;
  for (let i = 0; i < 7; i++) if (has(addDays(today, -i))) last7++;
  // this month count
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  let thisMonth = 0;
  for (
    let x = new Date(monthStart);
    x.getMonth() === today.getMonth() && x <= today;
    x = addDays(x, 1)
  )
    if (has(x)) thisMonth++;
  // best streak over the generated window
  let best = 0;
  let running = 0;
  for (let x = new Date(start); x <= end; x = addDays(x, 1)) {
    if (has(x)) {
      running++;
      if (running > best) best = running;
    } else running = 0;
  }
  return { currentStreak: cur, last7Days: last7, thisMonth, bestStreak: best };
})();

export const demoActiveGoals: ActiveGoalsData = {
  long: "Publish Next.js MVP with auth and email reminders",
  short: "Solve 10 LeetCode mediums this week",
  daily: "Ship one tangible improvement daily",
};

export const demoCompletedGoals: DemoCompletedGoal[] = (() => {
  const items: DemoCompletedGoal[] = [];
  const labels: Array<DemoCompletedGoal["type"]> = [
    "Long-term",
    "Short-term",
    "Daily",
  ];
  const texts = [
    "Migrate project to Next.js app router",
    "Solve LeetCode: Binary Tree Level Order Traversal",
    "Implement optimistic UI for goal updates",
    "Refactor server actions; add Zod validation",
    "Set up unstable_cache for quotes",
    "Build StatsBar from real data",
    "Create partial unique index for active goals",
    "Add unsubscribe one-click flow",
    "Fix hydration warning in calendar",
    "Write docs for deployment to Vercel",
  ];
  let id = 1;
  // spread 10 completed goals over last ~45 days
  for (let i = 0; i < 10; i++) {
    const daysBack = 3 + i * 4; // roughly every 4 days
    const d = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - daysBack,
    );
    items.push({
      id: String(id++),
      value: texts[i % texts.length],
      type: labels[i % labels.length],
      completedAt: toYMD(d),
    });
  }
  return items;
})();
