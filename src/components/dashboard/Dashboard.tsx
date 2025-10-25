import AppCalendar from "@/components/app-calender/AppCalendar";
import AppHeader from "@/components/app-header/AppHeader";
import GoalTabs from "@/components/goals/GoalTabs";
import LogForm from "@/components/log-form/LogForm";
import { Separator } from "@/components/ui/separator";
import StatsBar from "@/components/stats/StatsBar";
import { CurrentLog } from "@/types/logs";
import { getLogsInRange } from "@/app/dashboard/services/log";

export default async function Dashboard({
  currentLog,
  mode,
}: {
  currentLog: CurrentLog;
  mode: "real" | "demo";
}) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const prefetchLogs = await getLogsInRange(start, end);

  return (
    <div className="flex flex-col items-center justify-center">
      <AppHeader />
      <div className="flex w-[85%] flex-col items-center justify-center">
        <div className="flex w-full justify-center">
          <AppCalendar logs={prefetchLogs} />
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:mt-6 sm:flex-row sm:items-start">
          <div className="w-full sm:w-[45%]">
            <StatsBar className="mb-3" />
            <LogForm currentLog={currentLog} />
          </div>
          <Separator className="my-4 w-full sm:hidden" />
          <GoalTabs className="sm:w-[55%]" />
        </div>
      </div>
    </div>
  );
}
