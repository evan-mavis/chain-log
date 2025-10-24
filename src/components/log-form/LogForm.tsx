"use client";

import { Frown, Laugh, Meh } from "lucide-react";
import { useEffect, useState } from "react";
import { ConfettiSideCannons } from "../ui/confetti-side-cannons";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";
import { upsertLog } from "@/app/dashboard/actions/log";
import { formatDateForDB } from "@/lib/date-utils";
import { CurrentLog } from "@/types/logs";

type LogFormProps = {
  className?: string;
  currentLog: CurrentLog;
  date?: Date;
};

export default function LogForm({ className, currentLog, date }: LogFormProps) {
  const currentDate = new Date();
  const isCurrentDate = date
    ? date.toDateString() === currentDate.toDateString()
    : true;

  const displayDate = date
    ? date.toLocaleDateString()
    : currentDate.toLocaleDateString();

  const [isDirty, setIsDirty] = useState(false);
  const [textareaValue, setTextareaValue] = useState(currentLog?.notes ?? "");
  const [moodValue, setMoodValue] = useState(currentLog?.mood ?? "happy");

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
    if (isCurrentDate && !currentLog) {
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
      action={upsertLog}
    >
      <input
        type="hidden"
        name="day"
        value={formatDateForDB(date ?? new Date())}
      />
      <label htmlFor="notes" className="mt-3 mb-2 text-sm font-bold">
        Notes // {displayDate}
      </label>
      <Textarea
        id="notes"
        name="notes"
        className="min-h-20 w-full sm:min-h-40"
        placeholder="What did you do today to keep your chain going?"
        value={textareaValue}
        onChange={(e) => handleTextareaChange(e.target.value)}
      />
      <div className="m-4 flex flex-nowrap items-center justify-center gap-3">
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
          {isCurrentDate && !currentLog ? (
            <ConfettiSideCannons disabled={Boolean(currentLog) && !isDirty}>
              {getButtonText()}
            </ConfettiSideCannons>
          ) : (
            <Button
              type="submit"
              disabled={Boolean(currentLog) && !isDirty}
              variant="outline"
            >
              {getButtonText()}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
