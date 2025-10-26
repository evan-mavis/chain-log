import { unstable_cache } from "next/cache";

export type Quote = { text: string; author?: string };

const FALLBACK_QUOTES: Quote[] = [
  { text: "Small steps every day lead to big results.", author: "Unknown" },
  {
    text: "We are what we repeatedly do. Excellence, then, is a habit.",
    author: "Aristotle",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  {
    text: "What you do every day matters more than what you do once in a while.",
    author: "Gretchen Rubin",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  { text: "If you get tired, learn to rest, not to quit.", author: "Banksy" },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
];

async function fetchQuotesRaw(): Promise<Quote[]> {
  if (process.env.NODE_ENV !== "production") {
    const sortedFallback = [...FALLBACK_QUOTES].sort(
      (a, b) =>
        a.text.localeCompare(b.text) ||
        (a.author ?? "").localeCompare(b.author ?? ""),
    );
    return sortedFallback;
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 1500);
  try {
    const res = await fetch("https://zenquotes.io/api/quotes", {
      signal: controller.signal,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return FALLBACK_QUOTES;
    const data = await res.json();
    const list: Quote[] = (Array.isArray(data) ? data : [])
      .map((q: any) => ({
        text: (q?.q as string) || "",
        author: (q?.a as string) || undefined,
      }))
      .filter((q) => q.text);
    const sorted = list.sort(
      (a, b) =>
        a.text.localeCompare(b.text) ||
        (a.author ?? "").localeCompare(b.author ?? ""),
    );
    return sorted.length > 0 ? sorted : FALLBACK_QUOTES;
  } catch {
    return FALLBACK_QUOTES;
  } finally {
    clearTimeout(t);
  }
}

export const getQuotes = unstable_cache(fetchQuotesRaw, ["quotes-daily"], {
  revalidate: 86400,
});

export function getDailyKey() {
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

export const getQuoteOfTheDay = unstable_cache(
  async (): Promise<Quote> => {
    const quotes = await getQuotes();
    const idx = getIndexFromKey(quotes.length, getDailyKey());
    return quotes[idx];
  },
  [`qotd-daily-${getDailyKey()}`],
  { revalidate: 86400 },
);
