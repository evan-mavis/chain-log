import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { quoteOfDay } from "@/db/schemas/schema";
import { FALLBACK_QUOTES } from "@/app/dashboard/queries/fallback-quotes";
import type { Quote } from "@/app/dashboard/queries/quotes";

async function fetchQuotesRaw(): Promise<Quote[]> {
  if (process.env.NODE_ENV !== "production") {
    return FALLBACK_QUOTES;
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 1500);

  try {
    const res = await fetch("https://zenquotes.io/api/quotes", {
      signal: controller.signal,
      next: { revalidate: 86400 },
    });

    if (!res.ok) return FALLBACK_QUOTES;

    const data: unknown = await res.json();
    const arr: Array<Record<string, unknown>> = Array.isArray(data)
      ? (data as Array<Record<string, unknown>>)
      : [];

    const list: Quote[] = arr
      .map((q) => ({
        text: typeof q.q === "string" ? q.q : "",
        author: typeof q.a === "string" ? q.a : undefined,
      }))
      .filter((q) => q.text);

    return list.length > 0 ? list : FALLBACK_QUOTES;
  } catch {
    return FALLBACK_QUOTES;
  } finally {
    clearTimeout(t);
  }
}

export async function GET(req: Request) {
  const vercelCron = req.headers.get("x-vercel-cron");
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const hasToken =
    Boolean(process.env.CRON_SECRET) && token === process.env.CRON_SECRET;

  if (!vercelCron && !hasToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().split("T")[0];

    const existing = await db.query.quoteOfDay.findFirst({
      where: (t, { eq }) => eq(t.quoteDate, today),
      columns: { id: true },
    });

    if (existing) {
      return NextResponse.json({
        message: "Quote already exists for today",
        date: today,
      });
    }

    const quotes = await fetchQuotesRaw();

    function getDailyKey() {
      const now = new Date();
      return `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
    }

    function getIndexFromKey(total: number, key: string) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
      }
      return hash % Math.max(1, total);
    }

    const idx = getIndexFromKey(quotes.length, getDailyKey());
    const quote = quotes[idx];

    await db.insert(quoteOfDay).values({
      quoteDate: today,
      text: quote.text,
      author: quote.author,
    });

    return NextResponse.json({
      message: "Quote updated successfully",
      date: today,
      quote: quote.text,
    });
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 },
    );
  }
}
