import AppCalendar from "@/components/app-calender/AppCalendar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="m-3 text-2xl font-bold">Chain Log</h1>
      <div className="w-[85%]">
        <AppCalendar />
      </div>
    </div>
  );
}
