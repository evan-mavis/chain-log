"use client";

import { Frown, Laugh, Meh } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { ConfettiSideCannons } from "../ui/confetti-side-cannons";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";
import { upsertLog, type LogFormState } from "@/app/dashboard/actions/log";
import { formatDateForDB } from "@/lib/date-utils";
import { CurrentLog } from "@/types/logs";
import { Spinner } from "@/components/ui/spinner";
import { useAppMode } from "@/components/mode/ModeProvider";

type MinimalLog = Pick<NonNullable<CurrentLog>, "mood" | "notes">;

type LogFormProps = {
  className?: string;
  currentLog: MinimalLog | null;
  date?: Date;
};

export default function LogForm({ className, currentLog, date }: LogFormProps) {
  const { mode } = useAppMode();
  const currentDate = new Date();

  const displayDate = date
    ? date.toLocaleDateString()
    : currentDate.toLocaleDateString();

  const [isDirty, setIsDirty] = useState(false);
  const [textareaValue, setTextareaValue] = useState(currentLog?.notes ?? "");
  const [moodValue, setMoodValue] = useState(currentLog?.mood ?? "happy");

  const initialState: LogFormState = { status: "idle" };
  const [state, formAction, pending] = useActionState(upsertLog, initialState);

  useEffect(() => {
    setTextareaValue(currentLog?.notes ?? "");
    setMoodValue(currentLog?.mood ?? "happy");
    setIsDirty(false);
  }, [currentLog, date]);

  const handleTextareaChange = (value: string) => {
    setTextareaValue(value);
    setIsDirty(true);
  };

  const handleMoodChange = (value: string) => {
    setMoodValue(value as "happy" | "sad" | "meh");
    setIsDirty(true);
  };

  const getButtonText = () => {
    if (!currentLog) {
      return "Log Today";
    } else {
      return "Save Edits";
    }
  };

  return (
    <form
      className={cn(
        "mt-3 flex flex-col items-center justify-center sm:mt-0",
        className,
      )}
      action={mode === "demo" ? undefined : formAction}
      onSubmit={(e) => {
        if (mode === "demo") {
          e.preventDefault();
        }
      }}
    >
      <input
        type="hidden"
        name="day"
        value={formatDateForDB(date ?? new Date())}
      />
      <input type="hidden" name="mood" value={moodValue} />
      <label htmlFor="notes" className="mt-3 mb-2 text-sm font-bold">
        Notes // {displayDate}
      </label>
      <Textarea
        id="notes"
        name="notes"
        className="min-h-24 w-full sm:min-h-60"
        placeholder="What did you do today to keep your chain going?"
        value={textareaValue}
        onChange={(e) => handleTextareaChange(e.target.value)}
      />
      <div className="m-4 flex flex-col items-center justify-center gap-2">
        <div className="flex flex-nowrap items-center justify-center gap-3">
          <ToggleGroup
            variant="outline"
            className="border-1"
            type="single"
            value={moodValue}
            onValueChange={handleMoodChange}
          >
            <ToggleGroupItem value="sad">
              <Frown className="text-red-700" />
            </ToggleGroupItem>
            <ToggleGroupItem value="meh">
              <Meh className="text-yellow-500" />
            </ToggleGroupItem>
            <ToggleGroupItem value="happy">
              <Laugh className="text-green-500" />
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="shrink-0">
            {!currentLog ? (
              <ConfettiSideCannons
                disabled={(Boolean(currentLog) && !isDirty) || pending}
              >
                {pending ? (
                  <>
                    <Spinner className="mr-2" />
                    Saving...
                  </>
                ) : (
                  getButtonText()
                )}
              </ConfettiSideCannons>
            ) : (
              <Button
                type="submit"
                disabled={
                  mode === "demo" ||
                  (Boolean(currentLog) && !isDirty) ||
                  pending
                }
                variant="outline"
              >
                {pending ? (
                  <>
                    <Spinner className="mr-2" />
                    Saving...
                  </>
                ) : (
                  getButtonText()
                )}
              </Button>
            )}
          </div>
        </div>
        {state.status === "error" ? (
          <p className="mt-2 text-center text-sm text-red-600">
            {state.message ?? "Something went wrong"}
          </p>
        ) : null}
      </div>
    </form>
  );
}
