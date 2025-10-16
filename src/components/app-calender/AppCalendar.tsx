"use client";

import { Calendar } from "../ui/calendar";
import { useIsMobile } from "@/hooks/useMediaQuery";
import DayButton from "./components/DayButton";

type Props = {
  completedDates?: Date[];
};

function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date: Date, delta: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + delta);
  return d;
}

export default function AppCalendar({ completedDates = [] }: Props) {
  const isMobile = useIsMobile();
  const achievedSet = new Set(completedDates.map(toKey));

  // const isAchieved = (date: Date) => achievedSet.has(toKey(date));
  const isAchieved = (date: Date) => {
    const key = toKey(date);
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return hash % 4 !== 0;
  };
  const hasPrev = (date: Date) => isAchieved(addDays(date, -1));
  const hasNext = (date: Date) => isAchieved(addDays(date, 1));

  return (
    <Calendar
      className="bg-popover text-popover-foreground w-full rounded-md border-2 p-2 shadow-md"
      mode="single"
      showOutsideDays={false}
      numberOfMonths={isMobile ? 1 : 3}
      modifiers={{
        achieved: isAchieved,
        streakLeft: (date) =>
          isAchieved(date) && hasPrev(date) && date.getDay() !== 0,
        streakRight: (date) =>
          isAchieved(date) && hasNext(date) && date.getDay() !== 6,
      }}
      components={{ DayButton: DayButton }}
    />
  );
}
