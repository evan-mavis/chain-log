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

export const sentEmailReminders = pgTable(
  "sent_email_reminders",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    reminderDate: date("reminder_date").notNull(),
    sentAt: timestamp("sent_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("sent_email_reminders_by_user_date_idx").on(
      t.userId,
      t.reminderDate,
    ),
  ],
);
