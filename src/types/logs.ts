import { logs } from "@/db/schemas/schema";

export type LogRow = typeof logs.$inferSelect;
export type CurrentLog = LogRow | null;
