"use client";

import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
];

export default function CompletedGoals() {
  return (
    <Card className="w-full gap-0 rounded-xl">
      <CardHeader className="text-popover-foreground border-b">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          Your Completed Goals
          <Check />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
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
