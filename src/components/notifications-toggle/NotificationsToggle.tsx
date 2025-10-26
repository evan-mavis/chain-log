"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MailCheck, MailX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { updateEmailNotifications } from "@/app/dashboard/actions/notification";

export default function NotificationsToggle({
  initialOptIn,
  initialTime,
  initialTimezone,
}: {
  initialOptIn?: boolean;
  initialTime?: string | null;
  initialTimezone?: string | null;
}) {
  const [optIn, setOptIn] = useState(initialOptIn ?? false);
  const [time, setTime] = useState(initialTime ?? "09:00");
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

  useEffect(() => {
    if (initialTimezone) return;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && tz !== timezone) setTimezone(tz);
    } catch {}
  }, []);

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
        <form action={formAction} className="space-y-2">
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
            <label className="text-sm">Time (24h):</label>
            <Input
              className="w-24"
              name="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
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
            <Button type="submit" size="sm" disabled={pending}>
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
