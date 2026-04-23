import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewItem } from "@/components/review-item";
import { Stars } from "@/components/stars";
import { getReviewStats, mockReviews } from "@/lib/mock-data";
import {
  MessageSquareText,
  Sparkles,
  CheckCheck,
  Star,
} from "lucide-react";

export default function DashboardPage() {
  const stats = getReviewStats();
  const recent = [...mockReviews]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const cards = [
    {
      label: "Total reviews",
      value: stats.total.toString(),
      icon: MessageSquareText,
      hint: "Across all platforms",
    },
    {
      label: "Average rating",
      value: stats.avgRating.toFixed(1),
      icon: Star,
      hint: `${stats.total} reviews`,
      custom: <Stars rating={Math.round(stats.avgRating)} className="mt-2" />,
    },
    {
      label: "Awaiting reply",
      value: (stats.newCount + stats.pendingCount).toString(),
      icon: Sparkles,
      hint: `${stats.newCount} new, ${stats.pendingCount} drafted`,
    },
    {
      label: "Replied",
      value: stats.repliedCount.toString(),
      icon: CheckCheck,
      hint: "This month",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A snapshot of your reviews across every platform.
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
            Recent activity
          </h2>
          <a
            href="/reviews"
            className="text-sm text-indigo-400 hover:underline"
          >
            View all →
          </a>
        </div>
        <div className="space-y-3">
          {recent.map((r) => (
            <ReviewItem key={r.id} review={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
