import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-[#EFEDE7] motion-safe:animate-pulse",
        className,
      )}
      {...rest}
    />
  );
}
