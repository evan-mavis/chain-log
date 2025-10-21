"use client";

import type React from "react";
import confetti from "canvas-confetti";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type ConfettiEmojiProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
  };

export function ConfettiEmoji({
  children,
  size = "icon-sm",
  variant = "outline",
  ...props
}: ConfettiEmojiProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };

    const scalar = 2;
    const trophy = confetti.shapeFromText({ text: "🏆", scalar });

    const defaults = {
      spread: 90,
      ticks: 160,
      gravity: 0.35,
      decay: 0.985,
      startVelocity: 12,
      shapes: [trophy],
      scalar,
      origin,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 24,
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: scalar * 0.8,
      });

      confetti({
        ...defaults,
        particleCount: 12,
        scalar: scalar * 0.6,
        shapes: ["circle"],
      });
    };

    // Fewer, more spaced bursts for a slower feel
    setTimeout(shoot, 0);
    setTimeout(shoot, 250);
    setTimeout(shoot, 500);
  };

  return (
    <div className="relative justify-center">
      <Button variant={variant} size={size} onClick={handleClick} {...props}>
        {children}
      </Button>
    </div>
  );
}
