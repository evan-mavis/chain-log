import AppCalendar from "@/components/app-calender/AppCalendar";
import AppHeader from "@/components/app-header/AppHeader";
import GoalTabs from "@/components/goals/GoalTabs";
import LogForm from "@/components/log-form/LogForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AppHeader />
      <div className="w-[85%]">
        <AppCalendar />
        <div className="flex flex-col items-center justify-center sm:mt-6 sm:flex-row">
          <LogForm className="sm:w-[45%]" />
          <GoalTabs className="sm:w-[55%]" />
        </div>
      </div>
    </div>
  );
}
