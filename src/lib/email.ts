import { Resend } from "resend";
import React from "react";
import { ReminderEmail } from "@/components/email-template/EmailTemplate";
import { signUnsubscribeToken } from "@/lib/unsubscribe-token";

export const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function sendReminderEmailReact(
  to: string,
  name: string | null | undefined,
  actionUrl: string,
  unsubscribeUrl: string,
) {
  if (!process.env.RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set; skipping send");
    console.warn("RESEND_API_KEY not set; skipping send");
    return { skipped: true } as const;
  }
  console.log("Sending reminder email to!!!!", to);
  return await resend.emails.send({
    from:
      process.env.RESEND_FROM ||
      "Reminders <no-reply@notifications.chain-log.app>",
    to,
    subject: "Don’t break the chain!",
    react: React.createElement(ReminderEmail, {
      name,
      actionUrl,
      unsubscribeUrl,
    }),
  } as any);
}
