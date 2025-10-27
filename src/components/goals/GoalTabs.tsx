import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ActiveGoals from "./ActiveGoals";
import CompletedGoals from "./CompletedGoals";
import {
  getActiveGoals,
  getCompletedGoals,
} from "@/app/dashboard/queries/goal";
import type { ActiveGoalsData } from "@/types/goals";

export default async function GoalTabs({
  className,
  data,
}: {
  className?: string;
  data?: {
    activeGoals?: ActiveGoalsData | null;
    completedGoals?: Array<{
      id: string;
      value: string;
      type: "Long-term" | "Short-term" | "Daily";
      completedAt: string;
    }>;
  };
}) {
  const activeGoals =
    data?.activeGoals ?? ((await getActiveGoals()) as ActiveGoalsData | null);
  const completedGoals = data?.completedGoals ?? (await getCompletedGoals());

  return (
    <Tabs
      className={cn(
        "mt-4 mb-3 flex w-full flex-col text-xs sm:mt-0 sm:ml-6 sm:text-sm",
        className,
      )}
      defaultValue="active"
    >
      <TabsContent value="active" className="w-full">
        <ActiveGoals activeGoals={activeGoals} />
      </TabsContent>
      <TabsContent value="completed" className="w-full">
        <CompletedGoals completedGoals={completedGoals} />
      </TabsContent>
    </Tabs>
  );
}
