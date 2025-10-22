import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ActiveGoals from "./ActiveGoals";
import CompletedGoals from "./CompletedGoals";

export default function GoalTabs({ className }: { className?: string }) {
  return (
    <Tabs
      className={cn("mt-4 flex w-full flex-col sm:ml-6 sm:mt-0 mb-3", className)}
      defaultValue="active"
    >
      <TabsContent value="active" className="w-full">
        <ActiveGoals />
      </TabsContent>
      <TabsContent value="completed" className="w-full">
        <CompletedGoals />
      </TabsContent>
    </Tabs>
  );
}
