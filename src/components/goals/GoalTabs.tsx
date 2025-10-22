import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Activity, Check } from "lucide-react";
import ActiveGoals from "./ActiveGoals";
import CompletedGoals from "./CompletedGoals";

export default function GoalTabs({ className }: { className?: string }) {
  return (
    <Tabs
      className={cn("mt-4 flex w-full flex-col sm:ml-6 sm:mt-0", className)}
      defaultValue="active"
    >
      <TabsContent value="active" className="w-full">
        <ActiveGoals
          headerAction={
            <TabsList>
              <TabsTrigger value="active" aria-label="Active goals">
                <span className="inline-flex sm:hidden">
                  <Activity className="size-4" />
                </span>
                <span className="hidden sm:inline">Active</span>
              </TabsTrigger>
              <TabsTrigger value="completed" aria-label="Completed goals">
                <span className="inline-flex sm:hidden">
                  <Check className="size-4" />
                </span>
                <span className="hidden sm:inline">Completed</span>
              </TabsTrigger>
            </TabsList>
          }
        />
      </TabsContent>
      <TabsContent value="completed" className="w-full">
        <CompletedGoals
          headerAction={
            <TabsList>
              <TabsTrigger value="active" aria-label="Active goals">
                <span className="inline-flex sm:hidden">
                  <Activity className="size-4" />
                </span>
                <span className="hidden sm:inline">Active</span>
              </TabsTrigger>
              <TabsTrigger value="completed" aria-label="Completed goals">
                <span className="inline-flex sm:hidden">
                  <Check className="size-4" />
                </span>
                <span className="hidden sm:inline">Completed</span>
              </TabsTrigger>
            </TabsList>
          }
        />
      </TabsContent>
    </Tabs>
  );
}
