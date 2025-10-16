"use client";

import {
  MessageSquare,
  MessageSquareX,
  Moon,
  PersonStanding,
  Sun,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";

export default function UserPreferenceControls() {
  const [textsEnabled, setTextsEnabled] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="mr-6 flex items-center justify-center space-x-2 rounded-md border-2 p-2">
      <Tooltip>
        <TooltipTrigger>
          <Toggle pressed={textsEnabled} onPressedChange={setTextsEnabled}>
            {textsEnabled ? (
              <MessageSquare className="text-green-500" />
            ) : (
              <MessageSquareX className="text-red-500" />
            )}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          {textsEnabled ? (
            <p>Message Notifications Enabled</p>
          ) : (
            <p>Message Notifications Disabled</p>
          )}
        </TooltipContent>
      </Tooltip>
      <Toggle
        className="data-[state=pressed]:bg-transparent"
        pressed={theme === "light"}
        onPressedChange={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <Sun className="text-yellow-500" />
        ) : (
          <Moon className="text-purple-500" />
        )}
      </Toggle>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <PersonStanding />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
