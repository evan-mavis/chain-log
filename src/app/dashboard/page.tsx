import Dashboard from "@/components/dashboard/Dashboard";
import * as actions from "@/app/actions/dashboard";

export default function DashboardPage() {
  const data = {} as any; // fetch real data later
  return <Dashboard data={data} actions={actions} mode="real" />;
}
