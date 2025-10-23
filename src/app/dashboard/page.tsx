import AppCalendar from "@/components/app-calender/AppCalendar";
import AppHeader from "@/components/app-header/AppHeader";
import GoalTabs from "@/components/goals/GoalTabs";
import LogForm from "@/components/log-form/LogForm";
import { Separator } from "@/components/ui/separator";
import StatsBar from "@/components/stats/StatsBar";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AppHeader />
      <div className="flex w-[85%] flex-col items-center justify-center">
        <div className="w-full flex justify-center">
          <AppCalendar />
        </div>
        <div className="flex w-full flex-col items-center justify-center sm:mt-6 sm:flex-row sm:items-start">
          <div className="w-full sm:w-[45%]">
            <StatsBar className="mb-3" />
            <LogForm />
          </div>
          <Separator className="my-4 w-full sm:hidden" />
          <GoalTabs className="sm:w-[55%]" />
        </div>
      </div>
    </div>
  );
}
