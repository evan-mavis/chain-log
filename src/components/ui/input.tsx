"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "bg-background text-foreground placeholder:text-muted-foreground has-focus:border-ring border-input has-focus:ring-ring/50 flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-hidden transition-colors disabled:cursor-not-allowed disabled:opacity-50 has-focus:ring-[3px]",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
