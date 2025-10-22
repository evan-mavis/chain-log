"use client";

import { DayButton as RDPDayButton } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof RDPDayButton>;

export default function DayButton({ className, day, ...props }: Props) {
  return (
    <Button
      variant="ghost"
      className={cn("relative w-full h-full hover:bg-red-100 hover:text-red-900 dark:hover:bg-red-900/20 dark:hover:text-red-100 hover:rounded-md transition-colors", className)}
      {...props}
    >
      <span className="pointer-events-none absolute left-1/2 top-[calc(50%+0.75rem)] z-10 -translate-x-1/2 text-[11px] leading-none opacity-80">
        {day.date.getDate()}
      </span>

      <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 items-center text-red-600">
        <div
          className="h-0.5 w-full bg-current opacity-0 data-[active=true]:opacity-100"
          data-active={(props as any).modifiers?.streakLeft ?? false}
        />
        <div
          className="h-0.5 w-full bg-current opacity-0 data-[active=true]:opacity-100"
          data-active={(props as any).modifiers?.streakRight ?? false}
        />
      </div>

      {(props as any).modifiers?.achieved ? (
        <X className="-top-1.5 size-7 text-red-600" strokeWidth={2} />
      ) : null}
    </Button>
  );
}
