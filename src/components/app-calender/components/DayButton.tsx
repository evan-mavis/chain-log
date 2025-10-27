"use client";

import { DayButton as RDPDayButton } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Unlink2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogForm from "@/components/log-form/LogForm";
import type { LogDTOOrNull } from "@/types/logs";
import { useState } from "react";

type Props = React.ComponentProps<typeof RDPDayButton> & {
  getLogForDate?: (date: Date) => LogDTOOrNull;
};

export default function DayButton({
  className,
  day,
  getLogForDate,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const { modifiers, ...buttonProps } = props as Omit<
    Props,
    keyof React.ComponentProps<typeof RDPDayButton>
  > &
    React.ComponentProps<typeof RDPDayButton>;

  const today = new Date();
  const isFutureDate = day.date > today;
  const hasLogForDate = Boolean(getLogForDate ? getLogForDate(day.date) : null);
  const isDisabled = isFutureDate || !hasLogForDate;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDisabled) {
      setOpen(true);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative h-full w-full transition-colors",
            isDisabled
              ? "cursor-not-allowed opacity-50"
              : "hover:rounded-md hover:bg-red-100 hover:text-red-900 dark:hover:bg-red-900/20 dark:hover:text-red-100",
            className,
          )}
          onClick={handleClick}
          disabled={isDisabled}
          {...buttonProps}
        >
          {(modifiers?.achieved ?? false) ? (
            <Unlink2
              className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-8 -translate-x-1/2 -translate-y-1/2 text-red-700"
              strokeWidth={2}
            />
          ) : null}

          <span className="pointer-events-none absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-[11px] leading-none opacity-90">
            {day.date.getDate()}
          </span>

          <span
            className="pointer-events-none absolute top-1/2 left-0 z-10 h-0.75 w-[calc(50%-14px)] -translate-y-1/2 bg-red-700 opacity-0 data-[active=true]:opacity-100"
            data-active={modifiers?.streakLeft ?? false}
          />
          <span
            className="pointer-events-none absolute top-1/2 right-0 z-10 h-0.75 w-[calc(50%-14px)] -translate-y-1/2 bg-red-700 opacity-0 data-[active=true]:opacity-100"
            data-active={modifiers?.streakRight ?? false}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <LogForm
          date={day.date}
          currentLog={getLogForDate ? getLogForDate(day.date) : null}
        />
      </PopoverContent>
    </Popover>
  );
}
