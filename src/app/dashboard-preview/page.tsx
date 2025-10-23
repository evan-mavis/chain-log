import Dashboard from "@/components/dashboard/Dashboard";
import * as demoActions from "@/app/actions/dashboard-demo";

export default function DashboardPreview() {
  const demoData = {} as any; // static/mock data for demo
  return <Dashboard data={demoData} actions={demoActions} mode="demo" />;
}
