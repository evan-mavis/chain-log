CREATE TABLE "quote_of_day" (
	"id" serial PRIMARY KEY NOT NULL,
	"quote_date" date NOT NULL,
	"text" text NOT NULL,
	"author" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "quote_of_day_quote_date_idx" ON "quote_of_day" USING btree ("quote_date");

