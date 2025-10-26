import { cn } from "@/lib/utils";
import { getQuoteOfTheDay } from "@/app/dashboard/queries/quotes";

export default async function QuoteOfTheDay({
  className,
}: {
  className?: string;
}) {
  const quote = await getQuoteOfTheDay();
  const full = quote.author ? `${quote.text} — ${quote.author}` : quote.text;

  return (
    <div
      className={cn(
        "max-w-[70ch] flex-1 items-center justify-center px-2",
        className,
      )}
    >
      <div className="text-center">
        <div className="text-muted-foreground text-[10px] font-medium tracking-wide uppercase">
          Quote of the Day
        </div>
        <p
          className="text-foreground/80 text-center text-sm break-words whitespace-normal italic"
          title={full}
        >
          “{quote.text}”{quote.author ? <span> — {quote.author}</span> : null}
        </p>
      </div>
    </div>
  );
}
