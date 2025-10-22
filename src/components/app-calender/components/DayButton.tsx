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
import { useState } from "react";

type Props = React.ComponentProps<typeof RDPDayButton>;

export default function DayButton({ className, day, ...props }: Props) {
  const [open, setOpen] = useState(false);
  const { modifiers, onClick, ...buttonProps } = props as any;
  
  const today = new Date();
  const isFutureDate = day.date > today;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isFutureDate) {
      setOpen(true);
    }
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative w-full h-full transition-colors",
            isFutureDate 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:bg-red-100 hover:text-red-900 dark:hover:bg-red-900/20 dark:hover:text-red-100 hover:rounded-md",
            className
          )}
          onClick={handleClick}
          disabled={isFutureDate}
          {...buttonProps}
        >
          {(modifiers?.achieved ?? false) ? (
            <Unlink2
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 size-8 text-red-700 "
              strokeWidth={2}
            />
          ) : null}

          <span className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-[11px] leading-none opacity-90">
            {day.date.getDate()}
          </span>

          <span
            className="pointer-events-none absolute left-0 top-1/2 z-10 h-1 w-[calc(50%-14px)] -translate-y-1/2  bg-red-700 opacity-0 data-[active=true]:opacity-100"
            data-active={modifiers?.streakLeft ?? false}
          />
          <span
            className="pointer-events-none absolute right-0 top-1/2 z-10 h-1 w-[calc(50%-14px)] -translate-y-1/2  bg-red-700 opacity-0 data-[active=true]:opacity-100"
            data-active={modifiers?.streakRight ?? false}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <LogForm 
          date={day.date} 
          isLogged={modifiers?.achieved ?? false}
        />
      </PopoverContent>
    </Popover>
  );
}
