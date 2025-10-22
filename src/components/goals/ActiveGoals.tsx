"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
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
import { TabsList, TabsTrigger } from "../ui/tabs";
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

type GoalKey = "long" | "short" | "daily";

const initialGoals: Record<GoalKey, GoalItem> = {
  long: {
    id: "long",
    label: "Long-term",
    value: "Break into a big-tech or high profile startup.",
  },
  short: {
    id: "short",
    label: "Short-term",
    value: "Ship a polished feature in this app each week.",
  },
  daily: {
    id: "daily",
    label: "Daily",
    value: "Keep the chain — one concrete step every day.",
  },
};

export default function ActiveGoals() {
  const [goals, setGoals] = useState<Record<GoalKey, GoalItem>>(initialGoals);
  const textareaRefs = useRef<{ [key in GoalKey]?: HTMLTextAreaElement | null }>({});

  // Handle text selection when transitioning from completion to edit
  useEffect(() => {
    (Object.keys(goals) as GoalKey[]).forEach((key) => {
      const goal = goals[key];
      if (goal.highlightText && goal.editing) {
        const textarea = textareaRefs.current[key];
        if (textarea) {
          textarea.focus();
          textarea.select();
        }
      }
    });
  }, [goals]);

  const startEdit = (key: GoalKey) =>
    setGoals((gs) => ({ ...gs, [key]: { ...gs[key], editing: true, draft: gs[key].value } }));

  const updateDraft = (key: GoalKey, v: string) =>
    setGoals((gs) => ({ ...gs, [key]: { ...gs[key], draft: v, highlightText: false } }));

  const save = (key: GoalKey) =>
    setGoals((gs) => ({
      ...gs,
      [key]: {
        ...gs[key],
        value: gs[key].draft ?? gs[key].value,
        draft: undefined,
        editing: false,
        highlightText: false,
      },
    }));

  const cancel = (key: GoalKey) =>
    setGoals((gs) => ({ ...gs, [key]: { ...gs[key], draft: undefined, editing: false, highlightText: false } }));

  const startComplete = (key: GoalKey) =>
    setGoals((gs) => ({ ...gs, [key]: { ...gs[key], completing: true } }));

  const confirmComplete = (key: GoalKey) =>
    setGoals((gs) => ({
      ...gs,
      [key]: {
        ...gs[key],
        completing: false,
        editing: true,
        draft: gs[key].value,
        highlightText: true,
      },
    }));

  const cancelComplete = (key: GoalKey) =>
    setGoals((gs) => ({ ...gs, [key]: { ...gs[key], completing: false } }));

  const iconFor = (label: GoalItem["label"]) => {
    if (label === "Long-term") return <Turtle className="h-4 w-4" />;
    if (label === "Short-term") return <Target className="h-4 w-4" />;
    return <Rabbit className="h-4 w-4" />;
  };

  const renderRow = (key: GoalKey) => {
    const g = goals[key];
    return (
      <div key={g.id} className="grid grid-cols-[1fr_auto] items-start gap-2 px-6 py-3 sm:gap-3">
        <dt className="text-muted-foreground flex items-center gap-2">
          {iconFor(g.label)}
          {g.label}
        </dt>
        <div className="flex items-center justify-end gap-2">
          {g.editing ? (
            <>
              <Button variant="outline" size="icon-sm" aria-label="Save goal" onClick={() => save(key)}>
                <Check className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon-sm" aria-label="Cancel editing" onClick={() => cancel(key)}>
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : g.completing ? (
            <>
              <ConfettiEmoji size="icon-sm" variant="outline">
                <Button variant="outline" size="icon-sm" aria-label="Confirm completion" onClick={() => confirmComplete(key)}>
                  <Check className="h-4 w-4" />
                </Button>
              </ConfettiEmoji>
              <Button variant="outline" size="icon-sm" aria-label="Cancel completion" onClick={() => cancelComplete(key)}>
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="icon-sm" aria-label="Edit goal" onClick={() => startEdit(key)}>
                <SquarePen className="h-4 w-4" />
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon-sm" aria-label="Complete goal" onClick={() => startComplete(key)}>
                    <Trophy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={6}>Complete goal</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
        <dd className={(g.editing ? "animate-in fade-in-0 duration-300 " : "") + "col-span-2"}>
          {g.editing ? (
            <div>
              {g.highlightText && (
                <p className="mb-2 text-sm text-muted-foreground">
                  Goal completed! Enter your new {g.label.toLowerCase()} goal:
                </p>
              )}
              <Textarea
                ref={(el) => {
                  textareaRefs.current[key] = el;
                }}
                className="w-full"
                value={g.draft ?? ""}
                onChange={(e) => updateDraft(key, e.target.value)}
                placeholder={`Edit your ${g.label.toLowerCase()} goal...`}
              />
            </div>
          ) : (
            <span>{g.value}</span>
          )}
        </dd>
      </div>
    );
  };

  return (
    <Card className="scrollbar-thin max-h-[37vh] w-full gap-0 overflow-y-auto rounded-xl px-2 pt-0">
      <CardHeader className="text-popover-foreground bg-card sticky top-0 z-10 flex items-center gap-2 border-b-2 py-2">
        <TabsList className="shrink-0">
          <TabsTrigger value="active" aria-label="Active" className="gap-2">
            <span className="sm:hidden inline-flex"><Activity className="size-4" /></span>
            <span className="hidden sm:inline">Active</span>
          </TabsTrigger>
          <TabsTrigger value="completed" aria-label="Completed" className="gap-2">
            <span className="sm:hidden inline-flex"><Check className="size-4" /></span>
            <span className="hidden sm:inline">Completed</span>
          </TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent className="px-0 py-2">
        <dl className="divide-y">
          {renderRow("long")}
          {renderRow("short")}
          {renderRow("daily")}
        </dl>
      </CardContent>
    </Card>
  );
}
