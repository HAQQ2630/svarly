"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stars } from "@/components/stars";
import { StatusBadge } from "@/components/status-badge";
import type { Review } from "@/types/review";
import { Loader2, Sparkles } from "lucide-react";

const PRIMARY = "#2F4F3E";

const platformLabel: Record<Review["platform"], string> = {
  google: "Google",
  yelp: "Yelp",
  facebook: "Facebook",
  tripadvisor: "TripAdvisor",
  trustpilot: "Trustpilot",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ReviewItem({ review: initial }: { review: Review }) {
  const [review, setReview] = useState(initial);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: review.id }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReview((r) => ({ ...r, aiReply: data.aiReply, status: "pending" }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Noget gik galt");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback
            className="text-sm font-semibold"
            style={{ background: PRIMARY + "1A", color: PRIMARY }}
          >
            {review.reviewerInitials ?? review.reviewerName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{review.reviewerName}</h3>
                <span className="text-xs text-muted-foreground">
                  {platformLabel[review.platform]} · {review.businessName}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Stars rating={review.rating} />
                <span className="text-xs text-muted-foreground">
                  {formatDate(review.postedAt)}
                </span>
              </div>
            </div>
            <StatusBadge status={review.status} />
          </div>

          <p className="text-sm leading-relaxed text-foreground/90">
            {review.content}
          </p>

          {review.aiReply && (
            <div
              className="rounded-md p-3"
              style={{
                background: PRIMARY + "0D",
                border: `1px solid ${PRIMARY}26`,
              }}
            >
              <div
                className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: PRIMARY }}
              >
                <Sparkles className="h-3 w-3" />
                {review.status === "replied" ? "Svar sendt" : "Forslag til svar"}
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {review.aiReply}
              </p>
            </div>
          )}

          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}

          <div className="flex items-center gap-2 pt-1">
            {review.status === "new" && (
              <Button
                size="sm"
                className="gap-1.5"
                disabled={generating}
                onClick={handleGenerate}
              >
                {generating ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Genererer…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Generer svar
                  </>
                )}
              </Button>
            )}
            {review.status === "pending" && (
              <>
                <Button size="sm">Godkend & send</Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={generating}
                  onClick={handleGenerate}
                >
                  {generating ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    "Regenerer"
                  )}
                </Button>
              </>
            )}
            {review.status === "replied" && (
              <Button size="sm" variant="outline">
                Vis på {platformLabel[review.platform]}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
