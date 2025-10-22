"use client";

import { DayButton as RDPDayButton } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
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
  // Extract modifiers and other non-button props
  const { modifiers, onClick, ...buttonProps } = props as any;
  
  // Check if this is a future date
  const today = new Date();
  const isFutureDate = day.date > today;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't open popover for future dates
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
          <span className="pointer-events-none absolute left-1/2 top-[calc(50%+0.75rem)] z-10 -translate-x-1/2 text-[11px] leading-none opacity-80">
            {day.date.getDate()}
          </span>

          <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 items-center text-red-600">
            <div
              className="h-0.5 w-full bg-current opacity-0 data-[active=true]:opacity-100"
              data-active={modifiers?.streakLeft ?? false}
            />
            <div
              className="h-0.5 w-full bg-current opacity-0 data-[active=true]:opacity-100"
              data-active={modifiers?.streakRight ?? false}
            />
          </div>

          {modifiers?.achieved ? (
            <X className="-top-1.5 size-7 text-red-600" strokeWidth={2} />
          ) : null}
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
