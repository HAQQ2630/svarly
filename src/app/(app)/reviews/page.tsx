import { ReviewItem } from "@/components/review-item";
import { getReviewStats, mockReviews } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const filters = [
  { label: "All", key: "all" as const },
  { label: "New", key: "new" as const },
  { label: "Pending", key: "pending" as const },
  { label: "Replied", key: "replied" as const },
];

export default function ReviewsPage() {
  const stats = getReviewStats();
  const counts = {
    all: stats.total,
    new: stats.newCount,
    pending: stats.pendingCount,
    replied: stats.repliedCount,
  };

  const reviews = [...mockReviews].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {stats.total} reviews across all your locations.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-3">
        {filters.map((f, i) => (
          <button
            key={f.key}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              i === 0
                ? "bg-sidebar-accent text-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            {f.label}
            <span className="rounded bg-background/60 px-1.5 py-0.5 text-xs tabular-nums text-muted-foreground">
              {counts[f.key]}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {reviews.map((r) => (
          <ReviewItem key={r.id} review={r} />
        ))}
      </div>
    </div>
  );
}
