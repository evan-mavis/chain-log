import { Frown, Laugh, Meh } from "lucide-react";
import { ConfettiSideCannons } from "../ui/confetti-side-cannons";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { cn } from "@/lib/utils";

export default function LogForm({ className }: { className?: string }) {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div
      className={cn(
        "mt-3 flex flex-col items-center justify-center sm:mr-4 sm:mt-0",
        className,
      )}
    >
      <h3 className="mb-2 text-sm font-bold">Notes // {currentDate}</h3>
      <Textarea
        className="min-h-28 w-full"
        placeholder="What did you do today to keep your chain going?"
      />
      <div className="m-4 flex flex-nowrap items-center justify-center gap-3">
        <ToggleGroup variant="outline" className="border-1" type="single">
          <ToggleGroupItem value="sad">
            <Frown className="text-red-700" />
          </ToggleGroupItem>
          <ToggleGroupItem value="neutral">
            <Meh className="text-yellow-500" />
          </ToggleGroupItem>
          <ToggleGroupItem value="happy">
            <Laugh className="text-green-500" />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="shrink-0">
          <ConfettiSideCannons>Log today</ConfettiSideCannons>
        </div>
      </div>
    </div>
  );
}
