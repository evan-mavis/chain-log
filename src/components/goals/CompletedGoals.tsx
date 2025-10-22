"use client";

import { type ReactNode } from "react";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "../ui/card";

type CompletedGoal = {
  id: string;
  value: string;
  type: "Long-term" | "Short-term" | "Daily";
  completedAt: string;
};

const mockCompleted: CompletedGoal[] = [
  {
    id: "1",
    value: "Launch v1 of the app",
    type: "Short-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "2",
    value: "Offer letter from dream company",
    type: "Long-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "3",
    value: "30-day streak maintained",
    type: "Daily",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "4",
    value: "Refactored calendar component",
    type: "Short-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "5",
    value: "First paid user",
    type: "Long-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "6",
    value: "Shipped stats bar",
    type: "Short-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "7",
    value: "100 commits streak",
    type: "Daily",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "8",
    value: "Improved accessibility across app",
    type: "Short-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "9",
    value: "Optimized build times",
    type: "Short-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "10",
    value: "Integrated confetti interaction",
    type: "Short-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "11",
    value: "Set up CI for lint checks",
    type: "Short-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "12",
    value: "Hit 1,000 DAU milestone",
    type: "Long-term",
    completedAt: new Date().toLocaleDateString(),
  },
  {
    id: "13",
    value: "Fixed layout shift on tab change",
    type: "Short-term",
    completedAt: new Date().toLocaleDateString(),
  },
];

export default function CompletedGoals({
  headerAction,
}: {
  headerAction?: ReactNode;
}) {
  return (
    <Card className="scrollbar-thin max-h-[37vh] w-full gap-0 overflow-y-auto rounded-xl px-2 pb-2 pt-0">
      <CardHeader className="text-popover-foreground bg-card sticky top-0 z-10 grid-rows-[auto] items-center border-b py-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          Completed Goals
          <Check className="hidden sm:inline" />
        </CardTitle>
        {headerAction ? (
          <CardAction className="row-span-1 self-center">
            {headerAction}
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="px-0 py-2">
        <ul className="divide-y">
          {mockCompleted.map((g) => (
            <li
              key={g.id}
              className="grid grid-cols-1 gap-2 px-6 py-3 sm:grid-cols-[1fr_auto_auto] sm:gap-4"
            >
              <span className="order-1 sm:order-none">{g.value}</span>
              <span className="text-muted-foreground sm:justify-self-end">
                {g.type}
              </span>
              <time className="text-muted-foreground sm:justify-self-end">
                {g.completedAt}
              </time>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
