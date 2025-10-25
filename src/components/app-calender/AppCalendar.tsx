"use client";

import { Calendar } from "../ui/calendar";
import DayButton from "./components/DayButton";
import type { LogDTO } from "@/types/logs";

type Props = {
  logs?: LogDTO[];
};

function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, delta: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d;
}

export default function AppCalendar({ logs = [] }: Props) {
  const loggedSet = new Set(logs.map((l) => l.day));
  const logsByDay = new Map(logs.map((l) => [l.day, l] as const));

  const InjectedDayButton = (props: any) => (
    <DayButton
      {...props}
      getLogForDate={(date: Date) => logsByDay.get(toKey(date)) ?? null}
    />
  );

  const hasLog = (date: Date) => loggedSet.has(toKey(date));
  const hasPrev = (date: Date) => hasLog(addDays(date, -1));
  const hasNext = (date: Date) => hasLog(addDays(date, 1));

  return (
    <div className="w-full">
      {/* Mobile: One month view */}
      <div className="block md:hidden">
        <Calendar
          className="text-foreground bg-card mb-3 w-full rounded-lg border-2 p-2 shadow-md"
          mode="single"
          showOutsideDays={false}
          numberOfMonths={1}
          modifiers={{
            achieved: hasLog,
            streakLeft: (date) =>
              hasLog(date) && hasPrev(date) && date.getDay() !== 0,
            streakRight: (date) =>
              hasLog(date) && hasNext(date) && date.getDay() !== 6,
          }}
          components={{ DayButton: InjectedDayButton }}
        />
      </div>

      {/* Desktop: Three month view */}
      <div className="hidden md:block">
        <Calendar
          className="text-foreground bg-card mb-3 w-full rounded-lg border-2 p-2 shadow-md"
          mode="single"
          showOutsideDays={false}
          numberOfMonths={3}
          defaultMonth={
            new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)
          }
          modifiers={{
            achieved: hasLog,
            streakLeft: (date) =>
              hasLog(date) && hasPrev(date) && date.getDay() !== 0,
            streakRight: (date) =>
              hasLog(date) && hasNext(date) && date.getDay() !== 6,
          }}
          components={{ DayButton: InjectedDayButton }}
        />
      </div>
    </div>
  );
}
