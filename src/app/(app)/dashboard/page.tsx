import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewItem } from "@/components/review-item";
import { Stars } from "@/components/stars";
import { getReviewStats, getReviews } from "@/lib/queries";
import {
  MessageSquareText,
  Sparkles,
  CheckCheck,
  Star,
} from "lucide-react";
import Link from "next/link";

const PRIMARY = "#2F4F3E";

export default async function DashboardPage() {
  const [stats, reviews] = await Promise.all([getReviewStats(), getReviews()]);
  const recent = reviews.slice(0, 3);

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
                Når dine kunder begynder at anmelde, dukker de op her.
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
