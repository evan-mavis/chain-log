"use client";

import { useEffect, useRef } from "react";
import { updateTimezone } from "@/app/dashboard/actions/notification";
import { useAppMode } from "@/components/mode/ModeProvider";

export default function TimezoneDetector() {
  const { mode } = useAppMode();
  const hasAttemptedDetection = useRef(false);

  useEffect(() => {
    if (mode === "demo") return;

    if (hasAttemptedDetection.current) return;
    hasAttemptedDetection.current = true;

    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (detectedTimezone) {
        updateTimezone(detectedTimezone).catch((error) => {
          console.debug("Timezone auto-detect failed:", error);
        });
      }
    } catch (error) {
      console.debug("Timezone detection not available:", error);
    }
  }, [mode]);

  return null;
}
