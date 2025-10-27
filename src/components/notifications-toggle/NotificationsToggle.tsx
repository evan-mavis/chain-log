"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MailCheck, MailX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { updateEmailNotifications } from "@/app/dashboard/actions/notification";
import { useAppMode } from "@/components/mode/ModeProvider";

export default function NotificationsToggle({
  initialOptIn,
  initialTime,
  initialTimezone,
}: {
  initialOptIn?: boolean;
  initialTime?: string | null;
  initialTimezone?: string | null;
}) {
  const { mode } = useAppMode();
  const isDemo = mode === "demo";
  const [optIn, setOptIn] = useState(initialOptIn ?? false);
  const [time, setTime] = useState(initialTime ?? "17:00");
  const defaultTz =
    typeof window !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC";
  const [timezone, setTimezone] = useState(initialTimezone ?? defaultTz);
  const [state, formAction, pending] = useActionState(
    updateEmailNotifications,
    {
      status: "idle",
    },
  );

  const formatTime12h = (t: string) => {
    const [hStr, mStr] = t.split(":");
    const h = Number(hStr);
    const m = Number(mStr);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const mm = String(m).padStart(2, "0");
    return `${hour12}:${mm} ${period}`;
  };

  useEffect(() => {
    if (initialTimezone) return;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz !== timezone) setTimezone(tz);
    } catch {}
  }, [initialTimezone, timezone]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label={
            optIn ? "Email reminders enabled" : "Email reminders disabled"
          }
        >
          {optIn ? (
            <MailCheck className="text-green-500" />
          ) : (
            <MailX className="text-red-500" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-3">
        <form
          action={isDemo ? undefined : formAction}
          onSubmit={(e) => {
            if (isDemo) {
              e.preventDefault();
            }
          }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm">Email Reminders:</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                const next = !optIn;
                setOptIn(next);
              }}
            >
              {optIn ? "Unsubscribe" : "Subscribe"}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Time:</label>
            <div className="flex items-center gap-2">
              <input type="hidden" name="time" value={time} />
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => {
                  const [h, m] = time.split(":").map(Number);
                  const minutes = (h * 60 + m - 30 + 1440) % 1440;
                  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
                  const mm = String(minutes % 60).padStart(2, "0");
                  setTime(`${hh}:${mm}`);
                }}
                aria-label="Decrease time by 30 minutes"
              >
                −
              </Button>
              <Badge className="w-24 justify-center">{formatTime12h(time)}</Badge>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => {
                  const [h, m] = time.split(":").map(Number);
                  const minutes = (h * 60 + m + 30) % 1440;
                  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
                  const mm = String(minutes % 60).padStart(2, "0");
                  setTime(`${hh}:${mm}`);
                }}
                aria-label="Increase time by 30 minutes"
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="text-sm">Timezone:</label>
            <div className="flex items-center gap-2">
              <input type="hidden" name="timezone" value={timezone} />
              <Badge title={timezone} className="max-w-40 truncate">
                {timezone.split("/").slice(-1)[0]?.replaceAll("_", " ") ||
                  timezone}
              </Badge>
            </div>
          </div>
          <input type="hidden" name="optIn" value={optIn ? "true" : "false"} />
          <div className="flex justify-center">
            <Button type="submit" size="sm" disabled={pending || isDemo}>
              {pending ? "Saving..." : "Save"}
            </Button>
          </div>
          {state.status === "error" ? (
            <div className="text-destructive text-xs">{state.message}</div>
          ) : null}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
