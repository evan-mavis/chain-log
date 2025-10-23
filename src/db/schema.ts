import {
  pgTable,
  uuid,
  serial,
  text,
  timestamp,
  date,
  pgEnum,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// Enums
export const goalType = pgEnum("goal_type", [
  "daily",
  "short_term",
  "long_term",
]);
export const moodEnum = pgEnum("mood", ["happy", "sad", "meh"]);

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  provider: text("provider"),
  providerId: text("provider_id"),
  avatarUrl: text("avatar_url"),
  phone: text("phone"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

export const goals = pgTable(
  "goals",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: goalType("type").notNull(),
    description: text("description").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [
    index("goals_by_user_idx").on(t.userId),
    index("goals_by_user_type_idx").on(t.userId, t.type),
  ],
);

export const logs = pgTable(
  "logs",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    day: date("day").notNull(),
    mood: moodEnum("mood").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (t) => [index("logs_by_user_day_idx").on(t.userId, t.day)],
);

export const usersRelations = relations(users, ({ many }) => ({
  goals: many(goals),
  logs: many(logs),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(users, { fields: [goals.userId], references: [users.id] }),
}));

export const logsRelations = relations(logs, ({ one }) => ({
  user: one(users, { fields: [logs.userId], references: [users.id] }),
}));
