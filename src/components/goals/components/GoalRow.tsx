"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Rabbit,
  SquarePen,
  Turtle,
  X,
  Target,
  Trophy,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Spinner } from "@/components/ui/spinner";
import { upsertActiveGoal, completeGoal } from "@/app/dashboard/actions/goal";
import { useActionState, useEffect, useState } from "react";
import type { GoalItem, GoalKey } from "@/types/goals";
import React from "react";
import confetti from "canvas-confetti";
import { useAppMode } from "@/components/mode/ModeProvider";

type Props = {
  goal: GoalItem;
  goalKey: GoalKey;
  textareaRef: (el: HTMLTextAreaElement | null) => void;
  onStartEdit: (key: GoalKey) => void;
  onUpdateDraft: (key: GoalKey, v: string) => void;
  onCancel: (key: GoalKey) => void;
  onStartComplete: (key: GoalKey) => void;
  onConfirmComplete: (key: GoalKey) => void;
  onCancelComplete: (key: GoalKey) => void;
  onSaveSuccess: (key: GoalKey) => void;
  onCompleteSuccess: (key: GoalKey) => void;
};

function iconFor(label: GoalItem["label"]) {
  if (label === "Long-term") return <Turtle className="h-4 w-4" />;
  if (label === "Short-term") return <Target className="h-4 w-4" />;
  return <Rabbit className="h-4 w-4" />;
}

// Separate component for the form to ensure fresh state
function GoalForm({
  goalKey,
  description,
  onSaveSuccess,
  onPendingChange,
}: {
  goalKey: GoalKey;
  description: string;
  onSaveSuccess: (key: GoalKey) => void;
  onPendingChange: (pending: boolean) => void;
}) {
  const [formState, formAction, pending] = useActionState(upsertActiveGoal, {
    status: "idle",
  });
  const { mode } = useAppMode();

  React.useEffect(() => {
    onPendingChange(pending);
  }, [pending, onPendingChange]);

  React.useEffect(() => {
    if (formState.status === "success") {
      onSaveSuccess(goalKey);
    }
  }, [formState.status, onSaveSuccess, goalKey]);

  return (
    <form
      action={mode === "demo" ? undefined : formAction}
      onSubmit={(e) => {
        if (mode === "demo") e.preventDefault();
      }}
    >
      <input type="hidden" name="goalType" value={goalKey} />
      <input type="hidden" name="description" value={description} />
      <Button
        type="submit"
        variant="outline"
        size="icon-sm"
        aria-label="Save goal"
        disabled={pending}
      >
        {pending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}

function CompleteGoalForm({
  goalKey,
  onCompleteSuccess,
  onPendingChange,
}: {
  goalKey: GoalKey;
  onCompleteSuccess: (key: GoalKey) => void;
  onPendingChange: (pending: boolean) => void;
}) {
  const [formState, formAction, pending] = useActionState(completeGoal, {
    status: "idle",
  });
  const { mode } = useAppMode();

  useEffect(() => {
    onPendingChange(pending);
  }, [pending, onPendingChange]);

  useEffect(() => {
    if (formState.status === "success") {
      const shootConfetti = () => {
        const scalar = 2;
        const trophy = confetti.shapeFromText({ text: "🏆", scalar });

        const defaults = {
          spread: 90,
          ticks: 160,
          gravity: 0.35,
          decay: 0.985,
          startVelocity: 12,
          shapes: [trophy],
          scalar,
          origin: { x: 0.5, y: 0.5 },
        };

        const shoot = () => {
          confetti({
            ...defaults,
            particleCount: 24,
          });

          confetti({
            ...defaults,
            particleCount: 10,
            scalar: scalar * 0.8,
          });

          confetti({
            ...defaults,
            particleCount: 12,
            scalar: scalar * 0.6,
            shapes: ["circle"],
          });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 250);
        setTimeout(shoot, 500);
      };

      shootConfetti();
      onCompleteSuccess(goalKey);
    }
  }, [formState.status, onCompleteSuccess, goalKey]);

  return (
    <form
      action={mode === "demo" ? undefined : formAction}
      onSubmit={(e) => {
        if (mode === "demo") e.preventDefault();
      }}
    >
      <input type="hidden" name="goalType" value={goalKey} />
      <Button
        type="submit"
        variant="outline"
        size="icon-sm"
        aria-label="Complete goal"
        disabled={pending}
      >
        {pending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}

export default function GoalRow({
  goal,
  goalKey,
  textareaRef,
  onStartEdit,
  onUpdateDraft,
  onCancel,
  onStartComplete,
  onCancelComplete,
  onSaveSuccess,
  onCompleteSuccess,
}: Props) {
  const g = goal;
  const [isPending, setIsPending] = useState(false);
  const [isCompletingPending, setIsCompletingPending] = useState(false);
  const { mode } = useAppMode();

  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-2 px-6 py-3 sm:gap-3">
      <dt className="text-muted-foreground flex items-center gap-2">
        {iconFor(g.label)}
        {g.label}
      </dt>
      <div className="flex items-center justify-end gap-2">
        {g.editing ? (
          <>
            <GoalForm
              goalKey={goalKey}
              description={g.draft ?? g.value}
              onSaveSuccess={onSaveSuccess}
              onPendingChange={setIsPending}
            />
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Cancel editing"
              onClick={() => onCancel(goalKey)}
              disabled={isPending}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : g.completing ? (
          <>
            <CompleteGoalForm
              goalKey={goalKey}
              onCompleteSuccess={onCompleteSuccess}
              onPendingChange={setIsCompletingPending}
            />
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Cancel completion"
              onClick={() => onCancelComplete(goalKey)}
              disabled={isCompletingPending}
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
              onClick={() => onStartEdit(goalKey)}
              disabled={mode === "demo"}
            >
              <SquarePen className="h-4 w-4" />
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Complete goal"
                  onClick={() => onStartComplete(goalKey)}
                  disabled={mode === "demo"}
                >
                  <Trophy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>Complete goal</TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
      <dd
        className={
          (g.editing ? "animate-in fade-in-0 duration-300 " : "") + "col-span-2"
        }
      >
        {g.editing ? (
          <div>
            {g.highlightText && (
              <p className="text-muted-foreground mb-2 text-sm">
                Goal completed! Enter your new {g.label.toLowerCase()} goal:
              </p>
            )}
            <Textarea
              ref={textareaRef}
              className="w-full"
              value={g.draft ?? ""}
              onChange={(e) => onUpdateDraft(goalKey, e.target.value)}
              placeholder={`Edit your ${g.label.toLowerCase()} goal...`}
            />
          </div>
        ) : (
          <p className={g.value ? "wrap-break-word" : "text-muted-foreground wrap-break-word"}>
            {g.value || "-"}
          </p>
        )}
      </dd>
    </div>
  );
}
