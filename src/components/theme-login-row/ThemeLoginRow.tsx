"use client";

import Login from "../login/Login";
import ThemeToggle from "../theme-toggle/ThemeToggle";

export default function ThemeLoginRow() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <Login />
    </div>
  );
}
