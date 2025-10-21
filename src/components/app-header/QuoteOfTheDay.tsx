import { cn } from "@/lib/utils";

type Quote = {
  text: string;
  author?: string;
};

function getDailyIndex(total: number) {
  const now = new Date();
  const key = `${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % Math.max(1, total);
}

const QUOTES: Quote[] = [
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
    text: "Discipline is choosing what you want most over what you want now.",
    author: "Unknown",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Focus on the step in front of you, not the whole staircase.",
    author: "Unknown",
  },
];

export default function QuoteOfTheDay({ className }: { className?: string }) {
  const idx = getDailyIndex(QUOTES.length);
  const quote = QUOTES[idx];
  const full = quote.author ? `${quote.text} — ${quote.author}` : quote.text;

  return (
    <div
      className={cn(
        "max-w-[60ch] flex-1 items-center justify-center px-2",
        className,
      )}
    >
      <p
        className="text-muted-foreground line-clamp-1 text-center text-sm italic"
        title={full}
      >
        “{quote.text}”{quote.author ? ` — ${quote.author}` : ""}
      </p>
    </div>
  );
}
