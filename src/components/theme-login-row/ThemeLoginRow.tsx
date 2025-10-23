"use client";

import Link from "next/link";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { buttonVariants } from "../ui/button";

export default function ThemeLoginRow() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <Link
        href="/dashboard"
        className={buttonVariants({ variant: "default", size: "sm" })}
      >
        Login
      </Link>
    </div>
  );
}
