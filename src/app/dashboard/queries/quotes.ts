import { db } from "@/db/db";
import { FALLBACK_QUOTES } from "./fallback-quotes";

export type Quote = { text: string; author?: string };

export async function getQuoteOfTheDay(): Promise<Quote> {
  const today = new Date().toISOString().split("T")[0];

  const dbQuote = await db.query.quoteOfDay.findFirst({
    where: (t, { eq }) => eq(t.quoteDate, today),
    columns: {
      text: true,
      author: true,
    },
  });

  const quote: Quote = dbQuote
    ? { text: dbQuote.text, author: dbQuote.author ?? undefined }
    : FALLBACK_QUOTES[0];

  return quote;
}
