import Dashboard from "@/components/dashboard/Dashboard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Login from "@/components/login/Login";

export default function DashboardPreview() {
  return (
    <div>
      <div className="mx-auto mt-4 mb-4 w-[85%]">
        <div className="bg-card text-muted-foreground rounded-lg border p-3 text-sm">
          This preview shows demo data only. Sign in to save and manage your
          real data.
          <span className="ml-2 inline-flex items-center justify-center gap-3">
            <Login />
            <Button asChild size="default" variant="outline">
              <Link href="/">Home</Link>
            </Button>
          </span>
        </div>
      </div>
      <Dashboard currentLog={null} mode="demo" />
    </div>
  );
}
