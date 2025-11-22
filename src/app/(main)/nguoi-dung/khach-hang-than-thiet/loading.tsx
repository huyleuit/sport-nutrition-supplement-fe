import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className={cn("w-full space-y-6")}>
      {/* Header Section Skeleton */}
      <Skeleton className={cn("h-[280px] w-full rounded-[0.625em]")} />

      {/* Rewards Section Skeleton */}
      <div className={cn("rounded-[0.625em] bg-white p-[1.5em]")}>
        <Skeleton className={cn("mb-[1em] h-[2em] w-[200px]")} />
        <div className={cn("grid gap-4 md:grid-cols-2")}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-[0.5em] border border-gray-200 p-[1em]"
              )}
            >
              <div className={cn("flex items-start gap-3")}>
                <Skeleton className={cn("h-[3em] w-[3em] rounded-[0.5em]")} />
                <div className={cn("flex-1 space-y-2")}>
                  <Skeleton className={cn("h-[1.5em] w-full")} />
                  <Skeleton className={cn("h-[1em] w-3/4")} />
                  <div className={cn("flex items-center justify-between")}>
                    <Skeleton className={cn("h-[1em] w-[80px]")} />
                    <Skeleton className={cn("h-[2em] w-[80px]")} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History Skeleton */}
      <div className={cn("rounded-[0.625em] bg-white p-[1.5em]")}>
        <Skeleton className={cn("mb-[1em] h-[2em] w-[200px]")} />
        <div className={cn("space-y-3")}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "flex items-center justify-between",
                "rounded-[0.5em] border border-gray-200 p-[1em]"
              )}
            >
              <div className={cn("flex items-center gap-3")}>
                <Skeleton className={cn("h-[2.5em] w-[2.5em] rounded-full")} />
                <div className={cn("space-y-2")}>
                  <Skeleton className={cn("h-[1em] w-[200px]")} />
                  <Skeleton className={cn("h-[0.8em] w-[100px]")} />
                </div>
              </div>
              <Skeleton className={cn("h-[1.5em] w-[100px]")} />
            </div>
          ))}
        </div>
      </div>

      {/* Instructions Skeleton */}
      <Skeleton className={cn("h-[200px] w-full rounded-[0.625em]")} />
    </div>
  );
}

