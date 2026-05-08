import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewItem } from "@/components/review-item";
import { Stars } from "@/components/stars";
import {
  getCurrentBusiness,
  getReviewStats,
  getReviews,
} from "@/lib/queries";
import {
  MessageSquareText,
  Sparkles,
  CheckCheck,
  Star,
} from "lucide-react";
import Link from "next/link";

const PRIMARY = "#2F4F3E";
const INK = "#1F2A24";
const BARK = "#5C6B62";
const LINEN = "#F8F9F7";

const SERIF = "var(--font-dm-serif), Georgia, serif";

export default async function DashboardPage() {
  const [business, stats, reviews] = await Promise.all([
    getCurrentBusiness(),
    getReviewStats(),
    getReviews(),
  ]);
  const recent = reviews.slice(0, 3);

  const isConnected = !!business?.googleLocationName;

  if (!isConnected) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p
          className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: BARK }}
        >
          Velkommen
        </p>
        <h1
          className="mb-5 max-w-[440px]"
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: "clamp(28px, 3.4vw, 38px)",
            lineHeight: 1.12,
            letterSpacing: "-0.012em",
            color: INK,
          }}
        >
          Din oversigt{" "}
          <em style={{ color: PRIMARY, fontStyle: "italic" }}>venter.</em>
        </h1>
        <p
          className="mb-8 max-w-[440px]"
          style={{ color: BARK, fontSize: "15.5px", lineHeight: 1.7 }}
        >
          Forbind din Google Business Profile, så henter vi dine seneste
          anmeldelser og lægger udkast til svar klar i dit tonefald.
        </p>
        <Link
          href="/settings"
          className="inline-flex items-center gap-2 rounded-[12px] px-6 py-[12px] text-[14.5px] font-semibold transition-all"
          style={{
            background: PRIMARY,
            color: LINEN,
            boxShadow: `0 2px 14px ${PRIMARY}45`,
          }}
        >
          Forbind Google Business Profile
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6h8M6 2l4 4-4 4"
              stroke={LINEN}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <p
          className="mt-5 text-[12.5px]"
          style={{ color: BARK }}
        >
          Tager under et minut. Du kan altid skifte virksomhed senere.
        </p>
      </div>
    );
  }

  const cards = [
    {
      label: "Anmeldelser i alt",
      value: stats.total.toString(),
      icon: MessageSquareText,
      hint: "På tværs af platforme",
    },
    {
      label: "Gennemsnit",
      value: stats.avgRating.toFixed(1),
      icon: Star,
      hint: `${stats.total} anmeldelser`,
      custom: <Stars rating={Math.round(stats.avgRating)} className="mt-2" />,
    },
    {
      label: "Afventer svar",
      value: (stats.newCount + stats.pendingCount).toString(),
      icon: Sparkles,
      hint: `${stats.newCount} nye, ${stats.pendingCount} udkast`,
    },
    {
      label: "Besvaret",
      value: stats.repliedCount.toString(),
      icon: CheckCheck,
      hint: "Denne måned",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Oversigt</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Et overblik over dine anmeldelser på tværs af platforme.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {c.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{c.value}</div>
                <p className="text-xs text-muted-foreground">{c.hint}</p>
                {c.custom}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            Seneste aktivitet
          </h2>
          <Link
            href="/reviews"
            className="text-sm font-medium hover:underline"
            style={{ color: PRIMARY }}
          >
            Vis alle →
          </Link>
        </div>
        <div className="space-y-3">
          {recent.length === 0 ? (
            <Card className="p-10 text-center">
              <p className="text-sm font-medium">Ingen anmeldelser endnu.</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Når dine kunder skriver, dukker de op her. Vi forbereder
                svaret med det samme.
              </p>
            </Card>
          ) : (
            recent.map((r) => <ReviewItem key={r.id} review={r} />)
          )}
        </div>
      </div>
    </div>
  );
}
