"use client";

import {
  MessageSquare,
  MessageSquareX,
  Moon,
  PersonStanding,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export default function UserPreferenceControls() {
  const [textsEnabled, setTextsEnabled] = useState(false);
  const { setTheme } = useTheme();

  return (
    <div className="mr-6 flex items-center justify-center space-x-2 rounded-md border-2 border-red-700 p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-yellow-500 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-purple-500 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          <PersonStanding />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
