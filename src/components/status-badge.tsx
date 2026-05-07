import { Badge } from "@/components/ui/badge";
import type { ReviewStatus } from "@/types/review";
import { cn } from "@/lib/utils";

const styles: Record<ReviewStatus, string> = {
  new: "border-sky-200 bg-sky-50 text-sky-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  replied: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const dotStyles: Record<ReviewStatus, string> = {
  new: "bg-sky-500",
  pending: "bg-amber-500",
  replied: "bg-emerald-500",
};

const labels: Record<ReviewStatus, string> = {
  new: "Ny",
  pending: "Afventer",
  replied: "Besvaret",
};

export function StatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", styles[status])}>
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          dotStyles[status],
        )}
      />
      {labels[status]}
    </Badge>
  );
}
