import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Loading = () => {
  return (
    <div className="w-full rounded-[0.625em] bg-white pb-[2.5em]">
      <div
        className={cn(
          "w-full border-b-[0.125em] border-solid border-[#EDF0F3] pb-[1em] pl-[2em] pt-[1.5em] text-[1em] font-bold leading-[1.21]",
        )}
      >
        Thông tin cá nhân
      </div>
      <div className="flex w-full flex-col items-center pt-[1em]">
        <Skeleton className="size-[5.625em] rounded-full" />
        <div className="mt-[1em] w-[20.375em] divide-y text-[0.875em] leading-[1.21] text-[#333]">
          <Skeleton className="h-4 w-full py-[0.875em]" />
          <Skeleton className="h-4 w-full py-[0.875em]" />
          <Skeleton className="h-4 w-full py-[0.875em]" />
        </div>
        <Link
          href="/doi-mat-khau"
          className="mx-auto mt-[3.5em] rounded-[1.25em] bg-[#004FFF]/[0.23] px-[2.5em] py-[0.75em] text-[1em] font-bold leading-[1.21] text-[#1F5ADD] transition-all duration-200 hover:bg-[#004FFF]/[0.3]"
        >
          Đổi mật khẩu
        </Link>
      </div>
    </div>
  );
};

export default Loading;
