import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentLog } from "./services/log";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { rangeEnd?: string };
}) {
  const currentLog = await getCurrentLog();
  const rangeEnd =
    typeof searchParams?.rangeEnd === "string"
      ? searchParams.rangeEnd
      : undefined;

  return <Dashboard currentLog={currentLog} mode="real" rangeEnd={rangeEnd} />;
}
