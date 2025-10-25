import { logs } from "@/db/schemas/schema";

export type LogRow = typeof logs.$inferSelect;
export type CurrentLog = LogRow | null;

export type LogDTO = {
  day: string; // "YYYY-MM-DD"
  mood: "happy" | "sad" | "meh";
  notes: string | null;
};

export type LogDTOOrNull = LogDTO | null;
