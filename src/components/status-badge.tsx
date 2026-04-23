import { Badge } from "@/components/ui/badge";
import type { ReviewStatus } from "@/types/review";
import { cn } from "@/lib/utils";

const styles: Record<ReviewStatus, string> = {
  new: "border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/15",
  pending:
    "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/15",
  replied:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15",
};

const labels: Record<ReviewStatus, string> = {
  new: "New",
  pending: "Pending",
  replied: "Replied",
};

export function StatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <Badge variant="outline" className={cn("font-medium", styles[status])}>
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "new" && "bg-sky-400",
          status === "pending" && "bg-amber-400",
          status === "replied" && "bg-emerald-400",
        )}
      />
      {labels[status]}
    </Badge>
  );
}
