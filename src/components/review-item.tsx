import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stars } from "@/components/stars";
import { StatusBadge } from "@/components/status-badge";
import type { Review } from "@/types/review";
import { Sparkles } from "lucide-react";

const platformLabel: Record<Review["platform"], string> = {
  google: "Google",
  yelp: "Yelp",
  facebook: "Facebook",
  tripadvisor: "TripAdvisor",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ReviewItem({ review }: { review: Review }) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-indigo-500/15 text-sm text-indigo-300">
            {review.reviewerInitials}
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
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
            <StatusBadge status={review.status} />
          </div>

          <p className="text-sm leading-relaxed text-foreground/90">
            {review.content}
          </p>

          {review.aiReply && (
            <div className="rounded-md border border-indigo-500/20 bg-indigo-500/5 p-3">
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-indigo-300">
                <Sparkles className="h-3 w-3" />
                {review.status === "replied" ? "Reply sent" : "Suggested reply"}
              </div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {review.aiReply}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            {review.status === "new" && (
              <Button size="sm" className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Generate reply
              </Button>
            )}
            {review.status === "pending" && (
              <>
                <Button size="sm">Approve & send</Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </>
            )}
            {review.status === "replied" && (
              <Button size="sm" variant="outline">
                View on {platformLabel[review.platform]}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
