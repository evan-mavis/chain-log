import { ChartPie, ChevronDown, ChevronUp } from "lucide-react";
import { getStatsData } from "@/app/dashboard/queries/stats";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import StatsTiles from "@/components/stats/StatsTiles";

type Props = {
  className?: string;
  data?: {
    currentStreak: number;
    last7Days: number;
    thisMonth: number;
    bestStreak: number;
    totalCompletedGoals?: number;
    completedGoalsLastYear?: number;
  };
};

export default async function StatsBar({ className, data }: Props) {
  const {
    currentStreak,
    last7Days,
    thisMonth,
    bestStreak,
    totalCompletedGoals = 0,
    completedGoalsLastYear = 0,
  } = data ?? (await getStatsData());

  return (
    <div
      className={
        "bg-card/50 supports-backdrop-filter:bg-card/60 mt-4 h-full w-full rounded-lg border p-2.5 shadow-xs backdrop-blur sm:mt-0 " +
        (className ?? "")
      }
    >
      <div className="sm:hidden">
        <Collapsible>
          <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 border-b pb-1 text-sm font-semibold">
            <span className="flex items-center gap-2">
              <span className="text-sm">Your Stats</span>
              <ChartPie className="size-4" />
            </span>
            <span className="flex items-center">
              <ChevronDown className="size-4 group-data-[state=open]:hidden" />
              <ChevronUp className="hidden size-4 group-data-[state=open]:block" />
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <StatsTiles
              currentStreak={currentStreak}
              last7Days={last7Days}
              thisMonth={thisMonth}
              bestStreak={bestStreak}
              totalCompletedGoals={totalCompletedGoals}
              completedGoalsLastYear={completedGoalsLastYear}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop: always expanded */}
      <div className="hidden sm:flex sm:h-full sm:flex-col">
        <div className="flex items-center justify-center border-b text-sm font-semibold lg:text-base">
          <span className="text-sm lg:text-base">Your Stats</span>
          <ChartPie className="ml-2 size-4 lg:size-5" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <StatsTiles
            currentStreak={currentStreak}
            last7Days={last7Days}
            thisMonth={thisMonth}
            bestStreak={bestStreak}
            totalCompletedGoals={totalCompletedGoals}
            completedGoalsLastYear={completedGoalsLastYear}
            className="w-full max-w-[560px]"
          />
        </div>
      </div>
    </div>
  );
}
