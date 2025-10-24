"use client";

import { MessageSquare, MessageSquareX, PersonStanding } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import AppAvatar from "../app-avatar/AppAvatar";

export default function UserPreferenceControls() {
  const [textsEnabled, setTextsEnabled] = useState(false);

  return (
    <div className="mr-6 flex items-center justify-center space-x-2 rounded-md border-2 border-red-700 p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Message notifications menu"
          >
            {textsEnabled ? (
              <MessageSquare className="text-green-500" />
            ) : (
              <MessageSquareX className="text-red-500" />
            )}
            <span className="sr-only">Message notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTextsEnabled(true)}>
            Enable messages
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTextsEnabled(false)}>
            Disable messages
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeToggle />

      <AppAvatar />
    </div>
  );
}
