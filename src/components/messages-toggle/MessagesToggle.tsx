"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MessageSquare, MessageSquareX } from "lucide-react";

export default function MessagesToggle() {
  const [textsEnabled, setTextsEnabled] = useState(false);

  return (
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
  );
}
