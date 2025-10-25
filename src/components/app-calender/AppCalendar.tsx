"use client";

import { Calendar } from "../ui/calendar";
import DayButton from "./components/DayButton";
import type { LogDTO } from "@/types/logs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo, useTransition, useCallback } from "react";
import CalendarChevron from "@/components/app-calender/components/CalendarChevron";

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

function fmtMonth(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function AppCalendar({ logs = [] }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rangeEnd = searchParams.get("rangeEnd");
  const [isNavigating, startTransition] = useTransition();

  const now = new Date();
  const endMonth = rangeEnd
    ? new Date(
        Number(rangeEnd.split("-")[0]),
        Number(rangeEnd.split("-")[1]) - 1,
        1,
      )
    : new Date(now.getFullYear(), now.getMonth(), 1);
  const firstMonth = new Date(
    endMonth.getFullYear(),
    endMonth.getMonth() - 2,
    1,
  );

  const loggedSet = useMemo(() => new Set(logs.map((l) => l.day)), [logs]);
  const logsByDay = useMemo(
    () => new Map(logs.map((l) => [l.day, l] as const)),
    [logs],
  );

  const InjectedDayButton = useCallback(
    (props: any) => (
      <DayButton
        {...props}
        getLogForDate={(date: Date) => logsByDay.get(toKey(date)) ?? null}
      />
    ),
    [logsByDay],
  );

  const Chevron = useCallback(
    (props: {
      className?: string;
      size?: number;
      disabled?: boolean;
      orientation?: "left" | "right" | "down" | "up";
    }) => <CalendarChevron isNavigating={isNavigating} {...props} />,
    [isNavigating],
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
          month={endMonth}
          onMonthChange={(date) => {
            const params = new URLSearchParams(searchParams?.toString());
            params.set("rangeEnd", fmtMonth(date));
            startTransition(() => {
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            });
          }}
          modifiers={{
            achieved: hasLog,
            streakLeft: (date) =>
              hasLog(date) && hasPrev(date) && date.getDay() !== 0,
            streakRight: (date) =>
              hasLog(date) && hasNext(date) && date.getDay() !== 6,
          }}
          components={{ DayButton: InjectedDayButton, Chevron }}
        />
      </div>

      {/* Desktop: Three month view */}
      <div className="hidden md:block">
        <Calendar
          className="text-foreground bg-card mb-3 w-full rounded-lg border-2 p-2 shadow-md"
          mode="single"
          showOutsideDays={false}
          numberOfMonths={3}
          month={firstMonth}
          onMonthChange={(date) => {
            const params = new URLSearchParams(searchParams?.toString());
            const end = new Date(date.getFullYear(), date.getMonth() + 2, 1);
            params.set("rangeEnd", fmtMonth(end));
            startTransition(() => {
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            });
          }}
          modifiers={{
            achieved: hasLog,
            streakLeft: (date) =>
              hasLog(date) && hasPrev(date) && date.getDay() !== 0,
            streakRight: (date) =>
              hasLog(date) && hasNext(date) && date.getDay() !== 6,
          }}
          components={{ DayButton: InjectedDayButton, Chevron }}
        />
      </div>
    </div>
  );
}
