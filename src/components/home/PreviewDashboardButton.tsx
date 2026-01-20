"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { track } from "@vercel/analytics/react";

export default function PreviewDashboardButton() {
  return (
    <Link
      href="/dashboard-preview"
      className={buttonVariants({ variant: "outline", size: "default" })}
      onClick={() => track("preview_dashboard_click")}
    >
      Preview Dashboard
    </Link>
  );
}
