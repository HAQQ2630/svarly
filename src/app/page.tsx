import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, MessageSquareText, Sparkles, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Svarly</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Sign in
          </Link>
          <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
            Open demo
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-16 pb-24 text-center md:pt-28">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          <Sparkles className="h-3 w-3" />
          AI review replies for local businesses
        </span>
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Reply to every review.
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Without writing any of them.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-muted-foreground md:text-lg">
          Svarly drafts warm, on-brand replies to every Google, Yelp, Facebook
          and TripAdvisor review — so your customers feel heard and your
          ratings climb while you run the business.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/dashboard" className={buttonVariants({ size: "lg" })}>
            See the dashboard
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Sign in
          </Link>
        </div>

        <div className="mt-20 grid w-full gap-4 md:grid-cols-3">
          {[
            {
              icon: MessageSquareText,
              title: "Every platform, one inbox",
              body: "Pull reviews from Google, Yelp, Facebook and TripAdvisor into a single queue.",
            },
            {
              icon: Sparkles,
              title: "Drafts that sound like you",
              body: "Replies match your voice and reference what the reviewer actually said.",
            },
            {
              icon: Star,
              title: "Ratings that move",
              body: "Businesses that reply to reviews see a measurable lift in star average over 90 days.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border/60 bg-card/50 p-5 text-left backdrop-blur"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
                <f.icon className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
