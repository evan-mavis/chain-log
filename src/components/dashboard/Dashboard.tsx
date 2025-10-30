import AppCalendar from "@/components/app-calender/AppCalendar";
import AppHeader from "@/components/app-header/AppHeader";
import GoalTabs from "@/components/goals/GoalTabs";
import LogForm from "@/components/log-form/LogForm";
import { Separator } from "@/components/ui/separator";
import { CurrentLog } from "@/types/logs";
import { getLogsInRange } from "@/app/dashboard/queries/log";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ModeProvider } from "@/components/mode/ModeProvider";
import QuoteOfTheDay from "../app-header/QuoteOfTheDay";
import Stats from "../stats/Stats";
import TimezoneDetector from "../timezone-detector/TimezoneDetector";

export default async function Dashboard({
  currentLog,
  mode,
  rangeEnd,
}: {
  currentLog: CurrentLog;
  mode: "real" | "demo";
  rangeEnd?: string;
}) {
  const now = new Date();
  const endMonth = rangeEnd ? new Date(`${rangeEnd}-01T00:00:00`) : now;
  const start = new Date(endMonth.getFullYear(), endMonth.getMonth() - 2, 1);
  const end = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0);

  const prefetchLogs =
    mode === "demo"
      ? (await import("@/app/dashboard-preview/mock-data")).demoLogs
      : await getLogsInRange(start, end);

  const minimalCurrentLog = currentLog
    ? { mood: currentLog.mood, notes: currentLog.notes }
    : null;

  return (
    <ModeProvider mode={mode}>
      <TimezoneDetector />
      <div className="flex flex-col items-center justify-center">
        <AppHeader />
        <div className="flex w-[85%] flex-col items-center justify-center">
          <div className="flex w-full max-w-[1400px] flex-col sm:mt-2 sm:flex-row sm:items-stretch sm:gap-6">
            <div className="h-full w-full sm:w-[70%]">
              <AppCalendar logs={prefetchLogs} />
            </div>
            <div className="hidden w-full sm:flex sm:w-[30%]">
              <Suspense
                fallback={
                  <div className="mb-3 flex h-[96px] items-center justify-center rounded-lg border">
                    <Spinner className="size-5" />
                  </div>
                }
              >
                <Stats mode={mode} />
              </Suspense>
            </div>
          </div>
          <div className="flex w-full max-w-[1400px] flex-col items-center justify-center sm:mt-6 sm:flex-row sm:items-start">
            <div className="w-full sm:w-[45%]">
              <LogForm currentLog={minimalCurrentLog} />
              <Separator className="my-4 w-full sm:hidden" />
              <QuoteOfTheDay className="mt-2 sm:hidden" />
            </div>
            <Separator className="my-4 w-full sm:hidden" />
            <div className="w-full sm:hidden">
              <Suspense
                fallback={
                  <div className="mb-3 flex h-[96px] items-center justify-center rounded-lg border">
                    <Spinner className="size-5" />
                  </div>
                }
              >
                <Stats mode={mode} />
              </Suspense>
            </div>
            <Suspense
              fallback={
                <div className="flex items-center justify-center rounded-lg border p-6 sm:w-[55%]">
                  <Spinner className="size-5" />
                </div>
              }
            >
              {mode === "demo" ? (
                <GoalTabs
                  className="sm:w-[55%]"
                  data={{
                    activeGoals: (
                      await import("@/app/dashboard-preview/mock-data")
                    ).demoActiveGoals,
                    completedGoals: (
                      await import("@/app/dashboard-preview/mock-data")
                    ).demoCompletedGoals,
                  }}
                />
              ) : (
                <GoalTabs className="sm:w-[55%]" />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </ModeProvider>
  );
}
