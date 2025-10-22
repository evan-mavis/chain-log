"use client";

import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";

export function ConfettiSideCannons({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const handleClick = () => {
    // Call the custom onClick if provided
    if (onClick) {
      onClick();
    }
    
    // Only show confetti if not disabled
    if (!disabled) {
      const end = Date.now() + 3 * 1000;
      const isDark = document.documentElement.classList.contains("dark");
      const colors = [
        "#ff0000", // bright red
        isDark ? "#ffeb3b" : "#000000", // gold (dark) or black (light)
      ];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    }
  };

  return (
    <div className="relative">
      <Button onClick={handleClick} variant="outline" disabled={disabled}>
        {children}
      </Button>
    </div>
  );
}
