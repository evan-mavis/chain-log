import { Award, CalendarCheck, CalendarDays, Flame } from "lucide-react";
import { getStatsData } from "@/app/dashboard/queries/stats";

type Props = {
  className?: string;
  data?: {
    currentStreak: number;
    last7Days: number;
    thisMonth: number;
    bestStreak: number;
  };
};

export default async function StatsBar({ className, data }: Props) {
  const { currentStreak, last7Days, thisMonth, bestStreak } =
    data ?? (await getStatsData());
  return (
    <div
      className={
        "bg-card/50 supports-[backdrop-filter]:bg-card/60 w-full rounded-lg border p-3 shadow-xs backdrop-blur " +
        (className ?? "")
      }
    >
      <div className="grid grid-cols-2 gap-2 min-[950px]:grid-cols-4">
        <div className="bg-background rounded-xl border p-2 text-center">
          <div className="text-muted-foreground flex h-6 items-center justify-center gap-1 text-xs leading-none whitespace-nowrap">
            <span>Streak</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-base font-semibold sm:text-lg">
            <Flame className="size-4 shrink-0 text-orange-500" />
            <span className="animate-[shine_5s_ease-in-out_infinite] bg-gradient-to-r from-orange-600 via-orange-300 to-orange-600 bg-[length:300%_100%] bg-clip-text text-transparent">
              {currentStreak}d
            </span>
          </div>
        </div>
        <div className="bg-background hidden overflow-visible rounded-xl border p-2 text-center min-[950px]:block">
          <div className="text-muted-foreground flex h-6 items-center justify-center gap-1 text-xs leading-none whitespace-nowrap">
            <span>Last 7 Days</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <CalendarDays className="size-4 shrink-0 text-blue-500" />
            <span className="animate-[shine_5s_ease-in-out_infinite] bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600 bg-[length:300%_100%] bg-clip-text text-transparent">
              {last7Days}/7
            </span>
          </div>
        </div>
        <div className="bg-background hidden overflow-visible rounded-xl border p-2 text-center min-[950px]:block">
          <div className="text-muted-foreground flex h-6 items-center justify-center gap-1 text-xs leading-none whitespace-nowrap">
            <span>This Month</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <CalendarCheck className="size-4 shrink-0 text-emerald-600" />
            <span className="animate-[shine_5s_ease-in-out_infinite] bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:300%_100%] bg-clip-text text-transparent">
              {thisMonth}
            </span>
          </div>
        </div>
        <div className="bg-background overflow-visible rounded-xl border p-2 text-center sm:block">
          <div className="text-muted-foreground flex h-6 items-center justify-center gap-1 text-xs leading-none whitespace-nowrap">
            <span>Best Streak</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-lg font-semibold">
            <Award className="size-4 shrink-0 text-yellow-500" />
            <span className="animate-[shine_5s_ease-in-out_infinite] bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 bg-[length:300%_100%] bg-clip-text text-transparent">
              {bestStreak}d
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
