import {
  pgTable,
  serial,
  text,
  timestamp,
  date,
  pgEnum,
  boolean,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

// Enums
export const goalType = pgEnum("goal_type", [
  "daily",
  "short_term",
  "long_term",
]);
export const moodEnum = pgEnum("mood", ["happy", "sad", "meh"]);

export const goals = pgTable(
  "goals",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: goalType("type").notNull(),
    description: text("description").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    index("goals_by_user_idx").on(t.userId),
    index("goals_by_user_type_active_idx").on(t.userId, t.type, t.isActive),
    // Note: Additional constraints created in migration:
    // 1. Partial unique index: Only 1 active goal per type per user
    //    CREATE UNIQUE INDEX "goals_by_user_type_active_unique_idx"
    //    ON "goals" USING btree ("user_id", "type") WHERE "is_active" = true;
    // 2. Trigger function: Maximum 3 active goals per user total
    //    CREATE TRIGGER goals_max_active_trigger ...
  ],
);

export const logs = pgTable(
  "logs",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    day: date("day").notNull(),
    mood: moodEnum("mood").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [uniqueIndex("logs_by_user_day_idx").on(t.userId, t.day)],
);
