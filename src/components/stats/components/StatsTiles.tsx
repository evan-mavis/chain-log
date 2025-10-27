import { Award, CalendarCheck, CalendarDays, Flame, ListChecks, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type StatsTilesProps = {
  currentStreak: number;
  last7Days: number;
  thisMonth: number;
  bestStreak: number;
  totalCompletedGoals: number;
  completedGoalsLastYear: number;
  className?: string;
};

export default function StatsTiles({
  currentStreak,
  last7Days,
  thisMonth,
  bestStreak,
  totalCompletedGoals,
  completedGoalsLastYear,
  className,
}: StatsTilesProps) {
  return (
    <div className={cn("mt-2 flex flex-col gap-3 xl:gap-1.5", className)}>
      <div className="bg-background rounded-xl border p-1.5 text-center">
        <div className="text-muted-foreground flex h-5 items-center justify-center gap-1 text-[11px] leading-none whitespace-nowrap">
          <span>Streak</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm font-semibold sm:text-base">
          <Flame className="size-3.5 shrink-0 text-orange-500" />
          <span className="animate-[shine_5s_ease-in-out_infinite] bg-linear-to-r from-orange-600 via-orange-300 to-orange-600 bg-size-[300%_100%] bg-clip-text text-transparent">
            {currentStreak}d
          </span>
        </div>
      </div>

      <div className="bg-background overflow-visible rounded-xl border p-1.5 text-center">
        <div className="text-muted-foreground flex h-5 items-center justify-center gap-1 text-[11px] leading-none whitespace-nowrap">
          <span>Last 7 Days</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm font-semibold sm:text-base">
          <CalendarDays className="size-3.5 shrink-0 text-blue-500" />
          <span className="animate-[shine_5s_ease-in-out_infinite] bg-linear-to-r from-blue-600 via-blue-300 to-blue-600 bg-size-[300%_100%] bg-clip-text text-transparent">
            {last7Days}/7
          </span>
        </div>
      </div>

      <div className="bg-background overflow-visible rounded-xl border p-1.5 text-center">
        <div className="text-muted-foreground flex h-5 items-center justify-center gap-1 text-[11px] leading-none whitespace-nowrap">
          <span>This Month</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm font-semibold sm:text-base">
          <CalendarCheck className="size-3.5 shrink-0 text-emerald-600" />
          <span className="animate-[shine_5s_ease-in-out_infinite] bg-linear-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-size-[300%_100%] bg-clip-text text-transparent">
            {thisMonth}
          </span>
        </div>
      </div>

      <div className="bg-background overflow-visible rounded-xl border p-1.5 text-center">
        <div className="text-muted-foreground flex h-5 items-center justify-center gap-1 text-[11px] leading-none whitespace-nowrap">
          <span>Best Streak</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-sm font-semibold sm:text-base">
          <Award className="size-3.5 shrink-0 text-yellow-500" />
          <span className="animate-[shine_5s_ease-in-out_infinite] bg-linear-to-r from-yellow-600 via-yellow-300 to-yellow-600 bg-size-[300%_100%] bg-clip-text text-transparent">
            {bestStreak}d
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2 xl:gap-1.5">
        <div className="bg-background overflow-visible rounded-xl border p-1.5 text-center">
          <div className="text-muted-foreground flex h-5 items-center justify-center gap-1 text-[11px] leading-none whitespace-nowrap">
            <span>Completed Goals</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm font-semibold sm:text-base">
            <ListChecks className="size-3.5 shrink-0 text-emerald-600" />
            <span className="animate-[shine_5s_ease-in-out_infinite] bg-linear-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-size-[300%_100%] bg-clip-text text-transparent">
              {totalCompletedGoals}
            </span>
          </div>
        </div>
        <div className="bg-background overflow-visible rounded-xl border p-1.5 text-center">
          <div className="text-muted-foreground flex h-5 items-center justify-center gap-1 text-[11px] leading-none whitespace-nowrap">
            <span>Completed Last Year</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm font-semibold sm:text-base">
            <Calendar className="size-3.5 shrink-0 text-purple-600" />
            <span className="animate-[shine_5s_ease-in-out_infinite] bg-linear-to-r from-purple-700 via-purple-400 to-purple-700 bg-size-[300%_100%] bg-clip-text text-transparent">
              {completedGoalsLastYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

