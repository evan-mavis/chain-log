"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MailCheck, MailX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { updateEmailNotifications } from "@/app/dashboard/actions/notification";

export default function NotificationsToggle() {
  const [optIn, setOptIn] = useState(false);
  const [time, setTime] = useState("09:00");
  const [state, formAction, pending] = useActionState(
    updateEmailNotifications,
    {
      status: "idle",
    },
  );

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
            <span className="text-sm">Email reminders</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOptIn((v) => !v)}
            >
              {optIn ? "Unsubscribe" : "Subscribe"}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm">Time (24h)</label>
            <Input
              className="w-24"
              name="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <input type="hidden" name="optIn" value={optIn ? "true" : "false"} />
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Saving..." : "Save"}
          </Button>
          {state.status === "error" ? (
            <div className="text-destructive text-xs">{state.message}</div>
          ) : null}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
