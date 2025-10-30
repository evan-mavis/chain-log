import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentLog } from "./queries/log";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
