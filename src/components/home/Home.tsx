import { LinkIcon, Unlink2, Pin } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ThemeLoginRow from "@/components/theme-login-row/ThemeLoginRow";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-keyboard-wave text-3xl">Chain</span>
          <LinkIcon className="text-red-500" />
          <span className="text-keyboard-wave text-3xl">Log</span>
        </div>
        <ThemeLoginRow />
      </div>

      <div
        aria-hidden
        className="bg-primary/20 dark:bg-primary/20 pointer-events-none fixed -top-40 -left-40 size-[40rem] rounded-full blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -right-40 -bottom-40 size-[40rem] rounded-full bg-red-500/25 blur-[120px] dark:bg-red-500/25"
      />

      <section className="relative mx-auto flex min-h-[100dvh] w-[92%] max-w-5xl flex-col items-center pt-12 text-center sm:justify-center sm:pt-16">
        <div className="bg-background/60 text-muted-foreground mt-10 mb-2 inline-flex items-center gap-0 rounded-full border px-3 py-1 text-xs backdrop-blur sm:mt-0">
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

        <h1 className="hidden items-center justify-center text-4xl font-bold tracking-tight text-balance sm:flex sm:text-6xl">
          Chain Log
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-base leading-7 text-pretty sm:mt-4 sm:text-lg">
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

        <div className="relative mt-4 flex items-center justify-center">
          <Link
            href="/dashboard-preview"
            className={buttonVariants({ variant: "outline", size: "default" })}
          >
            Preview Dashboard
          </Link>
        </div>

        <Separator className="mt-7 w-full" />

        <div className="mt-8 grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
          <FeatureCard
            title="Simple Commitments"
            text="Set one daily, short-term, and long-term goal at a time."
          />
          <FeatureCard
            title="Visual Streaks"
            text="See your progress at a glance on the calendar."
          />
          <FeatureCard
            title="Gentle Momentum"
            text="Miss a day? No shame. Turn on text notifications."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-card relative mb-2 rounded-lg border p-4 text-left shadow-sm">
      <Pin
        className="absolute top-0 right-0 m-1 rotate-[30deg] text-red-500"
        aria-hidden
      />
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{text}</p>
    </div>
  );
}
