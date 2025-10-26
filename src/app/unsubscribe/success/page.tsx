import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnsubscribeSuccessPage() {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <div className="bg-card rounded-lg border p-6 shadow-sm">
        <h1 className="text-foreground text-lg font-semibold">
          You’re unsubscribed.
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          You will no longer receive daily email reminders from Chain Log.
        </p>
        <div className="mt-4">
          <Button asChild>
            <Link href="/">Go to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
