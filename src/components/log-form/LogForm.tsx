"use client";

import { Frown, Laugh, Meh } from "lucide-react";
import { useState } from "react";
import { ConfettiSideCannons } from "../ui/confetti-side-cannons";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";

type LogFormProps = {
  className?: string;
  date?: Date;
  isLogged?: boolean;
};

export default function LogForm({ className, date, isLogged = false }: LogFormProps) {
  const currentDate = new Date();
  const isCurrentDate = date ? 
    date.toDateString() === currentDate.toDateString() : 
    true;
  
  const displayDate = date ? date.toLocaleDateString() : currentDate.toLocaleDateString();
  
  const [isSubmitted, setIsSubmitted] = useState(isLogged);
  const [isDirty, setIsDirty] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [moodValue, setMoodValue] = useState("happy");

  const handleTextareaChange = (value: string) => {
    setTextareaValue(value);
    if (isSubmitted) {
      setIsDirty(true);
    }
  };

  const handleMoodChange = (value: string) => {
    setMoodValue(value);
    if (isSubmitted) {
      setIsDirty(true);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsDirty(false);
    // Here you would typically save the data
    console.log("Log submitted:", { textareaValue, moodValue });
  };

  const getButtonText = () => {
    if (isCurrentDate && !isSubmitted) {
      return "Log today";
    } else {
      return "Save Edits";
    }
  };

  return (
    <div
      className={cn(
        "mt-3 flex flex-col items-center justify-center sm:mt-0",
        className,
      )}
    >
      <h3 className="mb-2 mt-3 text-sm font-bold">Notes // {displayDate}</h3>
      <Textarea
        className="min-h-20 w-full sm:min-h-40"
        placeholder="What did you do today to keep your chain going? (submit only if you made progress toward an active goal)"
        value={textareaValue}
        onChange={(e) => handleTextareaChange(e.target.value)}
      />
      <div className="m-4 flex flex-nowrap items-center justify-center gap-3">
        <ToggleGroup variant="outline" className="border-1" type="single" value={moodValue} onValueChange={handleMoodChange}>
          <ToggleGroupItem value="sad">
            <Frown className="text-red-700" />
          </ToggleGroupItem>
          <ToggleGroupItem value="neutral">
            <Meh className="text-yellow-500" />
          </ToggleGroupItem>
          <ToggleGroupItem value="happy">
            <Laugh className="text-green-500" />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="shrink-0">
          {isCurrentDate && !isSubmitted ? (
            <ConfettiSideCannons 
              onClick={handleSubmit}
              disabled={isSubmitted && !isDirty}
            >
              {getButtonText()}
            </ConfettiSideCannons>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitted && !isDirty}
              variant="outline"
            >
              {getButtonText()}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
