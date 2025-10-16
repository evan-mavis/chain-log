import AppCalendar from "@/components/app-calender/AppCalendar";
import AppHeader from "@/components/app-header/AppHeader";
import LogButtons from "@/components/log-buttons/LogButtons";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AppHeader />
      <div className="w-[85%]">
        <AppCalendar />
        <LogButtons />
      </div>
    </div>
  );
}
