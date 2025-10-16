import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Hello World</h1>
      <Calendar mode="single" className="rounded-lg border" />
    </div>
  );
}
