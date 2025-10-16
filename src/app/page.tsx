import AppCalendar from "@/components/app-calender/AppCalendar";
import AppHeader from "@/components/app-header/AppHeader";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <AppHeader />
      <div className="w-[85%]">
        <AppCalendar />
      </div>
    </div>
  );
}
