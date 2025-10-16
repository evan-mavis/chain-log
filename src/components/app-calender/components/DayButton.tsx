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
      size="icon"
      className={cn("relative w-full", className)}
      {...props}
    >
      <span className="pointer-events-none absolute -bottom-1 right-1.5 z-10 text-[11px] leading-none opacity-80">
        {day.date.getDate()}
      </span>

      <div className="pointer-events-none absolute left-0 right-0 top-1/2 flex -translate-y-1/2 items-center">
        <div
          className="h-0.5 w-full bg-red-600 opacity-0 data-[active=true]:opacity-80"
          data-active={(props as any).modifiers?.streakLeft ?? false}
        />
        <div
          className="h-0.5 w-full bg-red-600 opacity-0 data-[active=true]:opacity-80"
          data-active={(props as any).modifiers?.streakRight ?? false}
        />
      </div>

      {(props as any).modifiers?.achieved ? (
        <X className="-top-1.5 size-7 text-red-600" strokeWidth={2} />
      ) : null}
    </Button>
  );
}
