import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/skeleton";

export default function ReviewsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-36" />
        <Skeleton className="mt-2 h-4 w-72 max-w-full" />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-[#E0DDD5] pb-2">
        {[64, 80, 56, 72, 48].map((w, i) => (
          <Skeleton key={i} className="h-7 rounded-full" style={{ width: w }} />
        ))}
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-3 w-full max-w-md" />
                <Skeleton className="h-3 w-2/3 max-w-sm" />
              </div>
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
