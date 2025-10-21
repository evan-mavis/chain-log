import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ActiveGoals from "./ActiveGoals";
import CompletedGoals from "./CompletedGoals";

export default function GoalTabs({ className }: { className?: string }) {
  return (
    <Tabs
      className={cn("mt-4 w-full sm:ml-6 sm:mt-0", className)}
      defaultValue="active"
    >
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <ActiveGoals />
      </TabsContent>
      <TabsContent value="completed">
        <CompletedGoals />
      </TabsContent>
    </Tabs>
  );
}
