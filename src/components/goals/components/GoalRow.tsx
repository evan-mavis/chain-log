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
import { ConfettiEmoji } from "@/components/ui/confetti-emoji";
import { Spinner } from "@/components/ui/spinner";
import { upsertActiveGoal } from "@/app/dashboard/actions/goal";
import { useActionState, useEffect, useRef } from "react";
import type { GoalItem, GoalKey } from "@/types/goals";
import React from "react";

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

  const hasHandledSuccess = useRef(false);

  React.useEffect(() => {
    onPendingChange(pending);
  }, [pending, onPendingChange]);

  React.useEffect(() => {
    if (formState.status === "success" && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true;
      onSaveSuccess(goalKey);
    } else if (formState.status !== "success") {
      hasHandledSuccess.current = false;
    }
  }, [formState.status, onSaveSuccess, goalKey]);

  return (
    <form action={formAction}>
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

export default function GoalRow({
  goal,
  goalKey,
  textareaRef,
  onStartEdit,
  onUpdateDraft,
  onCancel,
  onStartComplete,
  onConfirmComplete,
  onCancelComplete,
  onSaveSuccess,
}: Props) {
  const g = goal;
  const [isPending, setIsPending] = React.useState(false);

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
            <ConfettiEmoji size="icon-sm" variant="outline">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Confirm completion"
                onClick={() => onConfirmComplete(goalKey)}
              >
                <Check className="h-4 w-4" />
              </Button>
            </ConfettiEmoji>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Cancel completion"
              onClick={() => onCancelComplete(goalKey)}
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
          <span className={g.value ? "" : "text-muted-foreground"}>
            {g.value || "-"}
          </span>
        )}
      </dd>
    </div>
  );
}
