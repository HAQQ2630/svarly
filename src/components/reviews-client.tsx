"use client";

import { useState } from "react";
import { ReviewItem } from "@/components/review-item";
import { cn } from "@/lib/utils";
import type { Review, ReviewStatus } from "@/types/review";
import type { ReviewStats } from "@/lib/queries";

const PRIMARY = "#2F4F3E";

type FilterKey = "all" | ReviewStatus;

const filters: { label: string; key: FilterKey }[] = [
  { label: "Alle", key: "all" },
  { label: "Nye", key: "new" },
  { label: "Afventer", key: "pending" },
  { label: "Besvaret", key: "replied" },
];

export function ReviewsClient({
  reviews,
  stats,
}: {
  reviews: Review[];
  stats: ReviewStats;
}) {
  const [active, setActive] = useState<FilterKey>("all");
  const counts: Record<FilterKey, number> = {
    all: stats.total,
    new: stats.newCount,
    pending: stats.pendingCount,
    replied: stats.repliedCount,
  };

  const filtered = reviews.filter((r) => active === "all" || r.status === active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Anmeldelser</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {stats.total} anmeldelser på tværs af dine lokationer.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1 border-b border-[#E0DDD5]">
        {filters.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors",
              )}
              style={{
                color: isActive ? PRIMARY : "#5C6B62",
                fontWeight: isActive ? 600 : 400,
                borderBottom: isActive ? `2px solid ${PRIMARY}` : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {f.label}
              <span
                className="rounded-full px-1.5 py-0.5 text-xs tabular-nums"
                style={{
                  background: isActive ? PRIMARY + "14" : "#EFEDE7",
                  color: isActive ? PRIMARY : "#5C6B62",
                }}
              >
                {counts[f.key]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <ReviewItem key={r.id} review={r} />
        ))}
        {filtered.length === 0 && (
          <div className="py-10 text-center text-muted-foreground">
            <div className="text-2xl mb-2">✓</div>
            <div className="text-sm font-medium">Alt er håndteret!</div>
            <div className="text-xs mt-1">
              {stats.total === 0
                ? "Ingen anmeldelser endnu — de dukker op her, så snart kunder begynder at anmelde."
                : "Ingen anmeldelser i denne kategori."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
