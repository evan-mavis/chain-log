"use client";

import { useMemo, useState } from "react";
import {
  Calendar as CalendarIcon,
  Filter,
  Search,
  Activity,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardAction,
} from "../ui/card";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar } from "../ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type CompletedGoal = {
  id: string;
  value: string;
  type: "Long-term" | "Short-term" | "Daily";
  completedAt: string;
};

export default function CompletedGoals({
  completedGoals,
}: {
  completedGoals: CompletedGoal[];
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"All" | CompletedGoal["type"]>("All");

  // Date picker state (From)
  const [fromOpen, setFromOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [fromMonth, setFromMonth] = useState<Date | undefined>(fromDate);
  const [fromValue, setFromValue] = useState("");
  // Date picker state (To)
  const [toOpen, setToOpen] = useState(false);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [toMonth, setToMonth] = useState<Date | undefined>(toDate);
  const [toValue, setToValue] = useState("");

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const isValidDate = (date: Date | undefined) => {
    if (!date) return false;
    return !isNaN(date.getTime());
  };

  const filtered = useMemo(() => {
    return completedGoals.filter((g) => {
      if (search && !g.value.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (type !== "All" && g.type !== type) return false;
      if (fromDate || toDate) {
        const d = new Date(g.completedAt);
        const normalized = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        if (fromDate) {
          const f = new Date(
            fromDate.getFullYear(),
            fromDate.getMonth(),
            fromDate.getDate(),
          );
          if (normalized < f) return false;
        }
        if (toDate) {
          const t = new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate(),
          );
          if (normalized > t) return false;
        }
      }
      return true;
    });
  }, [search, type, fromDate, toDate, completedGoals]);

  return (
    <Card className="scrollbar-thin max-h-[65vh] sm:max-h-[37vh] w-full gap-0 overflow-y-auto rounded-xl px-2 pt-0 pb-2">
      <CardHeader className="text-popover-foreground bg-card sticky top-0 z-10 flex items-center justify-between gap-2 border-b-2 py-2">
        <TabsList className="shrink-0">
          <TabsTrigger value="active" aria-label="Active" className="gap-2">
            <span className="inline-flex sm:hidden">
              <Activity className="size-4" />
            </span>
            <span className="hidden sm:inline">Active</span>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            aria-label="Completed"
            className="gap-2"
          >
            <span className="inline-flex sm:hidden">
              <Check className="size-4" />
            </span>
            <span className="hidden sm:inline">Completed</span>
          </TabsTrigger>
        </TabsList>
        <CardAction className="shrink-0 self-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Filters">
                <Filter className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80"
              side="top"
              align="end"
              sideOffset={8}
            >
              <div className="grid gap-4">
                {/* Search goals */}
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Search Goals</h4>
                  <div className="relative">
                    <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      className="h-9 pl-9"
                      placeholder="Search by text..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                {/* Filters */}
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Filters</h4>
                </div>
                <div className="grid gap-3">
                  {/* Date range (shadcn-style input + popover calendar) */}
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      {/* From */}
                      <div className="grid gap-1">
                        <span className="text-muted-foreground text-xs">
                          From
                        </span>
                        <div className="relative">
                          <Input
                            value={fromValue}
                            placeholder="Select date"
                            className="bg-background pr-9"
                            onChange={(e) => {
                              const d = new Date(e.target.value);
                              setFromValue(e.target.value);
                              if (isValidDate(d)) {
                                setFromDate(d);
                                setFromMonth(d);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "ArrowDown") {
                                e.preventDefault();
                                setFromOpen(true);
                              }
                            }}
                          />
                          <Popover open={fromOpen} onOpenChange={setFromOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                className="absolute top-1/2 right-1.5 size-7 -translate-y-1/2"
                                aria-label="Open from date"
                              >
                                <CalendarIcon className="size-3.5" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="end"
                              alignOffset={-8}
                              sideOffset={10}
                            >
                              <Calendar
                                mode="single"
                                selected={fromDate}
                                captionLayout="dropdown"
                                month={fromMonth}
                                onMonthChange={setFromMonth}
                                onSelect={(d) => {
                                  setFromDate(d);
                                  setFromValue(formatDate(d));
                                  setFromOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      {/* To */}
                      <div className="grid gap-1">
                        <span className="text-muted-foreground text-xs">
                          To
                        </span>
                        <div className="relative">
                          <Input
                            value={toValue}
                            placeholder="Select date"
                            className="bg-background pr-9"
                            onChange={(e) => {
                              const d = new Date(e.target.value);
                              setToValue(e.target.value);
                              if (isValidDate(d)) {
                                setToDate(d);
                                setToMonth(d);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "ArrowDown") {
                                e.preventDefault();
                                setToOpen(true);
                              }
                            }}
                          />
                          <Popover open={toOpen} onOpenChange={setToOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                className="absolute top-1/2 right-1.5 size-7 -translate-y-1/2"
                                aria-label="Open to date"
                              >
                                <CalendarIcon className="size-3.5" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="end"
                              alignOffset={-8}
                              sideOffset={10}
                            >
                              <Calendar
                                mode="single"
                                selected={toDate}
                                captionLayout="dropdown"
                                month={toMonth}
                                onMonthChange={setToMonth}
                                onSelect={(d) => {
                                  setToDate(d);
                                  setToValue(formatDate(d));
                                  setToOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Type select via dropdown menu */}
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Type</label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-between">
                          {type === "All" ? "All Types" : type}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="min-w-[12rem]"
                      >
                        {(
                          ["All", "Long-term", "Short-term", "Daily"] as const
                        ).map((t) => (
                          <DropdownMenuItem
                            key={t}
                            onSelect={() =>
                              setType(t as "All" | CompletedGoal["type"])
                            }
                          >
                            {t === "All" ? "All Types" : t}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0 py-2">
        {filtered.length === 0 ? (
          <div className="text-muted-foreground px-6 py-8 text-center">
            {completedGoals.length === 0
              ? "No completed goals yet. Complete some goals to see them here!"
              : "No goals match your current filters."}
          </div>
        ) : (
          <ul className="divide-y">
            {filtered.map((g) => (
              <li
                key={g.id}
                className="grid grid-cols-1 gap-2 px-6 py-3 sm:grid-cols-[1fr_auto_auto] sm:gap-4"
              >
                <span className="order-1 sm:order-none">{g.value}</span>
                <span className="text-muted-foreground sm:justify-self-end">
                  {g.type}
                </span>
                <time className="text-muted-foreground sm:justify-self-end">
                  {g.completedAt}
                </time>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
