import Dashboard from "@/components/dashboard/Dashboard";
import { getCurrentLog } from "./services/log";

export default async function DashboardPage() {
  const currentLog = await getCurrentLog();

  return <Dashboard currentLog={currentLog} mode="real" />;
}
