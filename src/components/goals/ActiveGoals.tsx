"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Check,
  Rabbit,
  SquarePen,
  Turtle,
  X,
  Target,
  Trophy,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ConfettiButton } from "../ui/confetti";
import { ConfettiEmoji } from "../ui/confetti-emoji";

type GoalItem = {
  id: string;
  label: "Long-term" | "Short-term" | "Daily";
  value: string;
  draft?: string;
  editing?: boolean;
};

const initialGoals: GoalItem[] = [
  {
    id: "long",
    label: "Long-term",
    value: "Break into a big-tech or high profile startup.",
  },
  {
    id: "short",
    label: "Short-term",
    value: "Ship a polished feature in this app each week.",
  },
  {
    id: "daily",
    label: "Daily",
    value: "Keep the chain — one concrete step every day.",
  },
];

export default function ActiveGoals() {
  const [goals, setGoals] = useState<GoalItem[]>(initialGoals);

  const startEdit = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id ? { ...g, editing: true, draft: g.value } : g,
      ),
    );

  const updateDraft = (id: string, v: string) =>
    setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, draft: v } : g)));

  const save = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id
          ? {
              ...g,
              value: g.draft ?? g.value,
              draft: undefined,
              editing: false,
            }
          : g,
      ),
    );

  const cancel = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id ? { ...g, draft: undefined, editing: false } : g,
      ),
    );

  const iconFor = (label: GoalItem["label"]) => {
    if (label === "Long-term") return <Turtle className="h-4 w-4" />;
    if (label === "Short-term") return <Target className="h-4 w-4" />;
    return <Rabbit className="h-4 w-4" />;
  };

  return (
    <Card className="gap-0 rounded-xl">
      <CardHeader className="text-popover-foreground border-b">
        <CardTitle className="text-base font-semibold">
          Your Active Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <dl className="divide-y">
          {goals.map((g) => (
            <div
              key={g.id}
              className="grid grid-cols-[1fr_auto] items-start gap-2 px-6 py-3 sm:gap-3"
            >
              <dt className="text-muted-foreground flex items-center gap-2">
                {iconFor(g.label)}
                {g.label}
              </dt>
              <div className="flex items-center justify-end gap-2">
                {g.editing ? (
                  <>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Save goal"
                      onClick={() => save(g.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Cancel editing"
                      onClick={() => cancel(g.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Edit goal"
                      onClick={() => startEdit(g.id)}
                    >
                      <SquarePen className="h-4 w-4" />
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <ConfettiEmoji size="icon-sm" variant="outline">
                            <Trophy className="h-4 w-4" />
                          </ConfettiEmoji>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={6}>
                        Complete goal
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </div>
              <dd
                className={
                  (g.editing ? "animate-in fade-in-0 duration-300 " : "") +
                  "col-span-2"
                }
              >
                {g.editing ? (
                  <Textarea
                    className="w-full"
                    value={g.draft ?? ""}
                    onChange={(e) => updateDraft(g.id, e.target.value)}
                    placeholder={`Edit your ${g.label.toLowerCase()} goal...`}
                  />
                ) : (
                  <span>{g.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
