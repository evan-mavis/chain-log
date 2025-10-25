import { logs } from "@/db/schemas/schema";

export type LogRow = typeof logs.$inferSelect;
export type CurrentLog = LogRow | null;

export type CurrentLogDTO = {
  day: string; // "YYYY-MM-DD"
  mood: "happy" | "sad" | "meh";
  notes?: string | null;
} | null;
