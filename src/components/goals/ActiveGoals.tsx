"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "../ui/card";
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
  Activity,
  Sparkles,
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
  completing?: boolean;
  highlightText?: boolean;
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

export default function ActiveGoals({
  headerAction,
}: {
  headerAction?: ReactNode;
}) {
  const [goals, setGoals] = useState<GoalItem[]>(initialGoals);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  // Handle text selection when transitioning from completion to edit
  useEffect(() => {
    goals.forEach((goal) => {
      if (goal.highlightText && goal.editing) {
        const textarea = textareaRefs.current[goal.id];
        if (textarea) {
          textarea.focus();
          textarea.select();
        }
      }
    });
  }, [goals]);

  const startEdit = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id ? { ...g, editing: true, draft: g.value } : g,
      ),
    );

  const updateDraft = (id: string, v: string) =>
    setGoals((gs) => 
      gs.map((g) => 
        g.id === id 
          ? { ...g, draft: v, highlightText: false } 
          : g
      )
    );

  const save = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id
          ? {
              ...g,
              value: g.draft ?? g.value,
              draft: undefined,
              editing: false,
              highlightText: false,
            }
          : g,
      ),
    );

  const cancel = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id ? { ...g, draft: undefined, editing: false, highlightText: false } : g,
      ),
    );

  const startComplete = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id ? { ...g, completing: true } : g,
      ),
    );

  const confirmComplete = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id ? { 
          ...g, 
          completing: false, 
          editing: true, 
          draft: g.value,
          highlightText: true
        } : g,
      ),
    );

  const cancelComplete = (id: string) =>
    setGoals((gs) =>
      gs.map((g) =>
        g.id === id ? { ...g, completing: false } : g,
      ),
    );

  const iconFor = (label: GoalItem["label"]) => {
    if (label === "Long-term") return <Turtle className="h-4 w-4" />;
    if (label === "Short-term") return <Target className="h-4 w-4" />;
    return <Rabbit className="h-4 w-4" />;
  };

  return (
    <Card className="scrollbar-thin max-h-[37vh] w-full gap-0 overflow-y-auto rounded-xl px-2 pt-0">
      <CardHeader className="text-popover-foreground bg-card sticky top-0 z-10 grid-rows-[auto] items-center border-b py-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          Active Goals
          <Activity className="hidden sm:inline" />
        </CardTitle>
        {headerAction ? (
          <CardAction className="row-span-1 self-center">
            {headerAction}
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="px-0 py-2">
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
                ) : g.completing ? (
                  <>
                    <ConfettiEmoji size="icon-sm" variant="outline">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Confirm completion"
                        onClick={() => confirmComplete(g.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </ConfettiEmoji>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Cancel completion"
                      onClick={() => cancelComplete(g.id)}
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
                        <Button
                          variant="outline"
                          size="icon-sm"
                          aria-label="Complete goal"
                          onClick={() => startComplete(g.id)}
                        >
                          <Trophy className="h-4 w-4" />
                        </Button>
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
                  <div>
                    {g.highlightText && (
                      <p className="mb-2 text-sm text-muted-foreground">
                        Goal completed! Enter your new {g.label.toLowerCase()} goal:
                      </p>
                    )}
                    <Textarea
                      ref={(el) => {
                        textareaRefs.current[g.id] = el;
                      }}
                      className="w-full"
                      value={g.draft ?? ""}
                      onChange={(e) => updateDraft(g.id, e.target.value)}
                      placeholder={`Edit your ${g.label.toLowerCase()} goal...`}
                    />
                  </div>
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
