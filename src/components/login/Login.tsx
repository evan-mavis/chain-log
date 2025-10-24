"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signInWithGithub, signInWithGoogle } from "@/lib/auth-client";

export default function Login() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="default">
          Login
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signInWithGoogle()}>
          Login w/ Google
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signInWithGithub()}>
          Login w/ Github
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
