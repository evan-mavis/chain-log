CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TYPE "public"."goal_type" AS ENUM('daily', 'short_term', 'long_term');--> statement-breakpoint
CREATE TYPE "public"."mood" AS ENUM('happy', 'sad', 'meh');--> statement-breakpoint
CREATE TABLE "goals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "goal_type" NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"day" date NOT NULL,
	"mood" "mood" NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"provider" text,
	"provider_id" text,
	"avatar_url" text,
	"phone" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logs" ADD CONSTRAINT "logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "goals_by_user_idx" ON "goals" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "goals_by_user_type_idx" ON "goals" USING btree ("user_id","type");--> statement-breakpoint
CREATE INDEX "logs_by_user_day_idx" ON "logs" USING btree ("user_id","day");

-- one active goal per type per user (partial unique index)
create unique index if not exists goals_one_active_per_type_per_user
  on public.goals (user_id, type)
  where is_active = true;

-- (optional) one log per user per day (ignoring soft-deleted)
create unique index if not exists logs_user_day_unique
  on public.logs (user_id, day)
  where deleted_at is null;