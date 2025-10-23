import { LinkIcon, Unlink2 } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import ThemeLoginRow from "@/components/theme-login-row/ThemeLoginRow";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-keyboard-wave text-xl sm:text-2xl">Chain</span>
          <LinkIcon className="text-red-500" />
          <span className="text-keyboard-wave text-xl sm:text-2xl">Log</span>
        </div>
        <ThemeLoginRow />
      </div>

      <div
        aria-hidden
        className="bg-primary/15 dark:bg-primary/10 pointer-events-none absolute -top-24 -left-24 size-[28rem] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-secondary/20 dark:bg-secondary/10 pointer-events-none absolute -right-24 -bottom-24 size-[28rem] rounded-full blur-3xl"
      />

      <section className="relative mx-auto flex min-h-[100dvh] w-[92%] max-w-5xl flex-col items-center justify-center text-center">
        <div className="bg-background/60 text-muted-foreground mb-6 inline-flex items-center gap-0 rounded-full border px-3 py-1 text-xs backdrop-blur">
          <Unlink2 className="h-5 w-5" />
          <span aria-hidden className="mx-0 h-px w-8 bg-current" />
          <Unlink2 className="h-5 w-5" />
          <span aria-hidden className="mx-0 h-px w-8 bg-current" />
          <Unlink2 className="h-5 w-5" />
          <span aria-hidden className="mx-0 h-px w-8 bg-current" />
          <Unlink2 className="h-5 w-5" />
          <span aria-hidden className="mx-0 h-px w-8 bg-current" />
          <Unlink2 className="h-5 w-5" />
          <span aria-hidden className="mx-0 h-px w-8 bg-current" />
          <Unlink2 className="h-5 w-5" />
        </div>

        <h1 className="flex items-center justify-center text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          Chain Log
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7 text-pretty sm:text-lg">
          A micro accountability app to help you meet your goals. Inspired by
          Jerry Seinfeld’s “
          <a
            href="https://jamesclear.com/stop-procrastinating-seinfeld-strategy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:underline"
          >
            chain method
          </a>
          ” — make progress every day and keep the streak alive.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            Start your chain
            <ArrowRight className="ml-1" />
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Preview dashboard
          </Link>
        </div>

        <div className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <FeatureCard
            title="Simple commitments"
            text="Set one daily, short-term, and long-term goal at a time."
          />
          <FeatureCard
            title="Visual streaks"
            text="See your progress at a glance on the calendar."
          />
          <FeatureCard
            title="Gentle momentum"
            text="Miss a day? No shame. Just restart the chain."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-card rounded-lg border p-4 text-left shadow-sm">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{text}</p>
    </div>
  );
}
