"use client";

import { useAppContext } from "@/app/app-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  cn,
  getContrastingColor,
  getInitials,
  stringToColor,
} from "@/lib/utils";

const ProfileSection = () => {
  const { user } = useAppContext();
  return (
    <>
      <Avatar
        className={cn("size-[5.625em]")}
        style={{
          backgroundColor: `${stringToColor(user?.fullName || "undefined undefined")}`,
        }}
      >
        <AvatarFallback
          className={cn("text-[1.75em]")}
          style={{
            color: `${getContrastingColor(stringToColor(user?.fullName || "undefined undefined"))}`,
          }}
        >
          {`${getInitials(user?.fullName ?? "undefined undefined")}`}
        </AvatarFallback>
      </Avatar>
      <div className="mt-[1em] w-[20.375em] divide-y text-[0.875em] leading-[1.21] text-[#333]">
        <div
          className={cn("flex w-full flex-row justify-between py-[0.875em]")}
        >
          <span>Họ và tên</span>
          <span>{user?.fullName}</span>
        </div>
        <div
          className={cn("flex w-full flex-row justify-between py-[0.875em]")}
        >
          <span>Số điện thoại</span>
          <span>{user?.phoneNumber}</span>
        </div>
        <div
          className={cn("flex w-full flex-row justify-between py-[0.875em]")}
        >
          <span>Email</span>
          <span>{user?.email}</span>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
