CREATE TABLE "sent_email_reminders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"reminder_date" date NOT NULL,
	"sent_at" timestamp DEFAULT now() NOT NULL
);
ALTER TABLE "sent_email_reminders" ADD CONSTRAINT "sent_email_reminders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
CREATE UNIQUE INDEX "sent_email_reminders_by_user_date_idx" ON "sent_email_reminders" USING btree ("user_id","reminder_date");
