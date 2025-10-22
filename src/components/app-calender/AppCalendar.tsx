"use client";

import { Calendar } from "../ui/calendar";
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
    <div className="w-full">
      {/* Mobile: One month view */}
      <div className="block md:hidden">
        <Calendar
          className="text-foreground bg-card mb-3 w-full rounded-lg border-2 p-2 shadow-md"
          mode="single"
          showOutsideDays={false}
          numberOfMonths={1}
          modifiers={{
            achieved: isAchieved,
            streakLeft: (date) =>
              isAchieved(date) && hasPrev(date) && date.getDay() !== 0,
            streakRight: (date) =>
              isAchieved(date) && hasNext(date) && date.getDay() !== 6,
          }}
          components={{ DayButton: DayButton }}
        />
      </div>
      
      {/* Desktop: Three month view */}
      <div className="hidden md:block">
        <Calendar
          className="text-foreground bg-card mb-3 w-full rounded-lg border-2 p-2 shadow-md"
          mode="single"
          showOutsideDays={false}
          numberOfMonths={3}
          defaultMonth={new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)}
          modifiers={{
            achieved: isAchieved,
            streakLeft: (date) =>
              isAchieved(date) && hasPrev(date) && date.getDay() !== 0,
            streakRight: (date) =>
              isAchieved(date) && hasNext(date) && date.getDay() !== 6,
          }}
          components={{ DayButton: DayButton }}
        />
      </div>
    </div>
  );
}