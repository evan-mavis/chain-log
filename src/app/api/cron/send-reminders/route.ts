import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { sendReminderEmailReact } from "@/lib/email";
import { signUnsubscribeToken } from "@/lib/unsubscribe-token";
import { sentEmailReminders } from "@/db/schemas/schema";

function inTz(date: Date, tz: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = fmt
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});

  const hhmm = `${parts.hour}:${parts.minute}`;
  const ymd = `${parts.year}-${parts.month}-${parts.day}`;

  return { hhmm, ymd };
}

export async function GET(req: Request) {
  const vercelCron = req.headers.get("x-vercel-cron");
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const hasToken =
    Boolean(process.env.CRON_SECRET) && token === process.env.CRON_SECRET;

  if (!vercelCron && !hasToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const now = new Date();

  const rows = await db.query.user.findMany({
    where: (t, { and, eq }) => and(eq(t.emailOptIn, true)),
    columns: {
      id: true,
      email: true,
      emailReminderTime: true,
      userTimezone: true,
      name: true,
    },
  });

  let sent = 0;

  for (const u of rows) {
    if (!u.email || !u.emailReminderTime || !u.userTimezone) continue;

    const { hhmm, ymd } = inTz(now, u.userTimezone);

    const [userH, userM] = u.emailReminderTime.split(":").map(Number);
    const [nowH, nowM] = hhmm.split(":").map(Number);

    const userMinutes = userH * 60 + userM;
    const nowMinutes = nowH * 60 + nowM;

    let shouldSend = false;
    if (nowMinutes >= userMinutes) {
      shouldSend = true;
    }

    if (!shouldSend) continue;

    const startStr = ymd;

    const existing = await db.query.logs.findFirst({
      where: (t, { and, eq }) => and(eq(t.userId, u.id), eq(t.day, startStr)),
      columns: { id: true },
    });

    if (existing) {
      continue;
    }

    const alreadySent = await db.query.sentEmailReminders.findFirst({
      where: (t, { and, eq }) =>
        and(eq(t.userId, u.id), eq(t.reminderDate, startStr)),
      columns: { id: true },
    });

    if (alreadySent) {
      continue;
    }

    const base = process.env.APP_ORIGIN ?? "http://localhost:3000";
    const token = signUnsubscribeToken(u.id);
    const unsubscribeUrl = `${base}/api/email/unsubscribe?token=${encodeURIComponent(token)}`;

    try {
      await sendReminderEmailReact(
        u.email,
        u.name,
        `${base}/dashboard`,
        unsubscribeUrl,
      );

      await db.insert(sentEmailReminders).values({
        userId: u.id,
        reminderDate: startStr,
      });

      sent++;
    } catch (error) {
      console.error(`Failed to send reminder to ${u.email}:`, error);
    }
  }

  return NextResponse.json({ sent });
}
