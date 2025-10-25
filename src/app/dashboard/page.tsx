import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentLog } from "./services/log";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ rangeEnd?: string }>;
}) {
  const currentLog = await getCurrentLog();
  const resolvedSearchParams = await searchParams;
  const rangeEnd =
    typeof resolvedSearchParams?.rangeEnd === "string"
      ? resolvedSearchParams.rangeEnd
      : undefined;

  return <Dashboard currentLog={currentLog} mode="real" rangeEnd={rangeEnd} />;
}
