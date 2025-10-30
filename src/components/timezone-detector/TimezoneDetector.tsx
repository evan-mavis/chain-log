"use client";

import { useEffect } from "react";
import { updateTimezone } from "@/app/dashboard/actions/notification";
import { useAppMode } from "@/components/mode/ModeProvider";

export default function TimezoneDetector() {
  const { mode } = useAppMode();

  if (mode === "demo") return null;

  useEffect(() => {
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
  }, []);

  return null;
}
