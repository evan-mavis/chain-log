"use client";

import { Award, CalendarCheck, CalendarDays, Flame } from "lucide-react";

type Props = {
  className?: string;
};

function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, delta: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d;
}

function isAchieved(date: Date) {
  const key = toKey(date);
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % 4 !== 0;
}

function computeCurrentStreak(today: Date) {
  let streak = 0;
  let d = new Date(today);
  while (isAchieved(d)) {
    streak += 1;
    d = addDays(d, -1);
  }
  return streak;
}

function countLastNDays(today: Date, n: number) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    const d = addDays(today, -i);
    if (isAchieved(d)) count += 1;
  }
  return count;
}

function countThisMonth(today: Date) {
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  let count = 0;
  for (
    let d = new Date(start);
    d.getMonth() === today.getMonth() && d <= today;
    d = addDays(d, 1)
  ) {
    if (isAchieved(d)) count += 1;
  }
  return count;
}

function computeBestStreak(today: Date, lookbackDays: number) {
  let best = 0;
  let current = 0;
  for (let i = lookbackDays - 1; i >= 0; i--) {
    const d = addDays(today, -i);
    if (isAchieved(d)) {
      current += 1;
      if (current > best) best = current;
    } else {
      current = 0;
    }
  }
  return best;
}

export default function StatsBar({ className }: Props) {
  const today = new Date();
  const currentStreak = computeCurrentStreak(today);
  const last7 = countLastNDays(today, 7);
  const monthCount = countThisMonth(today);
  const bestStreak = computeBestStreak(today, 90);

  return (
    <div
      className={
        "bg-card/50 shadow-xs supports-[backdrop-filter]:bg-card/60 w-full rounded-lg border p-3 backdrop-blur " +
        (className ?? "")
      }
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="bg-background rounded-xl border p-2 text-center">
          <div className="text-muted-foreground flex h-6 items-center justify-center gap-1 whitespace-nowrap text-xs leading-none">
            <span>Active Streak</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-base font-semibold sm:text-lg">
            <Flame className="size-4 shrink-0 text-orange-500" />
            <span>{currentStreak}d</span>
          </div>
        </div>
        <div className="bg-background hidden overflow-visible rounded-xl border p-2 text-center sm:block">
          <div className="text-muted-foreground flex h-6 items-center justify-center gap-1 whitespace-nowrap text-xs leading-none">
            <span>Last 7 Days</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <CalendarDays className="size-4 shrink-0 text-blue-500" />
            <span>{last7}/7</span>
          </div>
        </div>
        <div className="bg-background hidden overflow-visible rounded-xl border p-2 text-center sm:block">
          <div className="text-muted-foreground flex h-6 items-center justify-center gap-1 whitespace-nowrap text-xs leading-none">
            <span>This Month</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <CalendarCheck className="size-4 shrink-0 text-emerald-600" />
            <span>{monthCount}</span>
          </div>
        </div>
        <div className="bg-background overflow-visible rounded-xl border p-2 text-center sm:block">
          <div className="text-muted-foreground flex h-6 items-center justify-center gap-1 whitespace-nowrap text-xs leading-none">
            <span>Best Streak</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <Award className="size-4 shrink-0 text-yellow-500" />
            <span>{bestStreak}d</span>
          </div>
        </div>
      </div>
    </div>
  );
}
