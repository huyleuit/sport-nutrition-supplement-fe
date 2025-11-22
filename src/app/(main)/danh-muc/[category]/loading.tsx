import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const Loading = () => {
  return (
    <div className="relative w-full leading-[1.21]">
      <div className="mx-auto w-full max-w-[75rem] space-y-4 py-4 xs:py-8 xl:w-full">
        <div className="mx-auto w-[95%] max-w-[75rem] space-y-4 px-[0.625rem] xl:w-full">
          <Skeleton className="h-4 w-60 lg:w-[25rem]" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className={cn("flex w-full flex-row justify-around")}>
          <Skeleton className="hidden h-[50vh] w-[18rem] rounded-xl xl:block" />
          <div className="w-full xl:w-[54.5rem]">
            <div className="w-full">
              <Skeleton className="h-[6.875rem] w-full rounded-none xl:hidden" />
              <div className="hidden flex-row items-center justify-between xl:flex">
                <Skeleton className="h-[1.25rem] w-36" />
                <div className="flex flex-row items-center gap-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
