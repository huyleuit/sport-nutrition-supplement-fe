import ProfileSection from "@/components/user/profile/ProfileSection";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Thông tin cá nhân",
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className={cn("w-full rounded-[0.625em] bg-white pb-[2.5em]")}>
        <div
          className={cn(
            "w-full border-b-[0.125em] border-solid border-[#EDF0F3] pb-[1em] pl-[2em] pt-[1.5em] text-[1em] font-bold leading-[1.21]",
          )}
        >
          Thông tin cá nhân
        </div>
        <div className="flex w-full flex-col items-center pt-[1em]">
          <ProfileSection />
          <Link
            href="/doi-mat-khau"
            className="mx-auto mt-[3.5em] rounded-[1.25em] bg-[#004FFF]/[0.23] px-[2.5em] py-[0.75em] text-[1em] font-bold leading-[1.21] text-[#1F5ADD] transition-all duration-200 hover:bg-[#004FFF]/[0.3]"
          >
            Đổi mật khẩu
          </Link>
        </div>
      </div>
    </Suspense>
  );
}
