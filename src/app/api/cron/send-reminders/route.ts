import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { sendReminderEmailReact } from "@/lib/email";
import { signUnsubscribeToken } from "@/lib/unsubscribe-token";

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
      emailTimezone: true,
      name: true,
    },
  });

  let sent = 0;
  for (const u of rows) {
    if (!u.email || !u.emailReminderTime || !u.emailTimezone) continue;

    const { hhmm, ymd } = inTz(now, u.emailTimezone);

    if (hhmm !== u.emailReminderTime) continue;

    const startStr = ymd;

    const existing = await db.query.logs.findFirst({
      where: (t, { and, eq }) => and(eq(t.userId, u.id), eq(t.day, startStr)),
      columns: { id: true },
    });

    if (existing) continue;

    const base = process.env.APP_ORIGIN ?? "http://localhost:3000";
    const token = signUnsubscribeToken(u.id);
    const unsubscribeUrl = `${base}/api/email/unsubscribe?token=${encodeURIComponent(token)}`;
    await sendReminderEmailReact(
      u.email,
      u.name,
      `${base}/dashboard`,
      unsubscribeUrl,
    );

    sent++;
  }

  return NextResponse.json({ sent });
}
