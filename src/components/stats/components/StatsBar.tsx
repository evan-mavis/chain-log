import { ChartPie } from "lucide-react";
import { getStatsData } from "@/app/dashboard/queries/stats";
import StatsTiles from "@/components/stats/components/StatsTiles";

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
        "bg-card/50 supports-backdrop-filter:bg-card/60 mt-4 flex h-full w-full flex-col rounded-lg border p-2.5 shadow-xs backdrop-blur sm:mt-0 " +
        (className ?? "")
      }
    >
      <div className="flex items-center justify-center text-sm font-semibold lg:text-base">
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
          className="w-full sm:max-w-[560px]"
        />
      </div>
    </div>
  );
}
