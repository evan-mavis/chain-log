"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Check, Activity } from "lucide-react";
import { TabsList, TabsTrigger } from "../ui/tabs";

import type { GoalItem, GoalKey, ActiveGoalsData } from "@/types/goals";
import GoalRow from "./components/GoalRow";

function toInitialGoals(
  active: ActiveGoalsData | null,
): Record<GoalKey, GoalItem> {
  return {
    long: {
      id: "long",
      label: "Long-term",
      value: active?.long ?? "",
    },
    short: {
      id: "short",
      label: "Short-term",
      value: active?.short ?? "",
    },
    daily: {
      id: "daily",
      label: "Daily",
      value: active?.daily ?? "",
    },
  };
}

export default function ActiveGoals({
  activeGoals,
}: {
  activeGoals: ActiveGoalsData | null;
}) {
  const [goals, setGoals] = useState<Record<GoalKey, GoalItem>>(
    toInitialGoals(activeGoals),
  );
  const textareaRefs = useRef<{
    [key in GoalKey]?: HTMLTextAreaElement | null;
  }>({});

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

  const startEdit = useCallback(
    (key: GoalKey) =>
      setGoals((gs) => ({
        ...gs,
        [key]: { ...gs[key], editing: true, draft: gs[key].value },
      })),
    [],
  );

  const updateDraft = useCallback(
    (key: GoalKey, v: string) =>
      setGoals((gs) => ({
        ...gs,
        [key]: { ...gs[key], draft: v, highlightText: false },
      })),
    [],
  );

  const save = useCallback((key: GoalKey) => {
    setGoals((gs) => {
      const newGoals = {
        ...gs,
        [key]: {
          ...gs[key],
          value: gs[key].draft ?? gs[key].value,
          draft: undefined,
          editing: false,
          highlightText: false,
        },
      };
      return newGoals;
    });
  }, []);

  const cancel = useCallback(
    (key: GoalKey) =>
      setGoals((gs) => ({
        ...gs,
        [key]: {
          ...gs[key],
          draft: undefined,
          editing: false,
          highlightText: false,
        },
      })),
    [],
  );

  const startComplete = useCallback(
    (key: GoalKey) =>
      setGoals((gs) => ({ ...gs, [key]: { ...gs[key], completing: true } })),
    [],
  );

  const confirmComplete = useCallback(
    (key: GoalKey) =>
      setGoals((gs) => ({
        ...gs,
        [key]: {
          ...gs[key],
          completing: false,
          editing: true,
          draft: gs[key].value,
          highlightText: true,
        },
      })),
    [],
  );

  const cancelComplete = useCallback(
    (key: GoalKey) =>
      setGoals((gs) => ({ ...gs, [key]: { ...gs[key], completing: false } })),
    [],
  );

  const handleCompleteSuccess = useCallback(
    (key: GoalKey) =>
      setGoals((gs) => ({
        ...gs,
        [key]: {
          ...gs[key],
          completing: false,
          editing: true,
          draft: "",
          highlightText: true,
        },
      })),
    [],
  );

  const renderRow = (key: GoalKey) => (
    <GoalRow
      key={goals[key].id}
      goal={goals[key]}
      goalKey={key}
      textareaRef={(el) => {
        textareaRefs.current[key] = el;
      }}
      onStartEdit={startEdit}
      onUpdateDraft={updateDraft}
      onCancel={cancel}
      onStartComplete={startComplete}
      onConfirmComplete={confirmComplete}
      onCancelComplete={cancelComplete}
      onSaveSuccess={save}
      onCompleteSuccess={handleCompleteSuccess}
    />
  );

  return (
    <Card className="scrollbar-thin max-h-[37vh] w-full gap-0 overflow-y-auto rounded-xl px-2 pt-0">
      <CardHeader className="text-popover-foreground bg-card sticky top-0 z-10 flex items-center gap-2 border-b-2 py-2">
        <TabsList className="shrink-0">
          <TabsTrigger value="active" aria-label="Active" className="gap-2">
            <span className="inline-flex sm:hidden">
              <Activity className="size-4" />
            </span>
            <span className="hidden sm:inline">Active</span>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            aria-label="Completed"
            className="gap-2"
          >
            <span className="inline-flex sm:hidden">
              <Check className="size-4" />
            </span>
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
