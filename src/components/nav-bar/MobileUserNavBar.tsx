"use client";
import { useAppContext } from "@/app/app-provider";
import {
  cn,
  getContrastingColor,
  getInitials,
  stringToColor,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import accountIcon from "/public/account-icon.svg";

export const MobileUserNavBar = () => {
  const { user } = useAppContext();
  if (user) {
    return (
      <Link
        href="/nguoi-dung/thong-tin-ca-nhan"
        className={cn("flex flex-row items-center gap-3 px-4 py-3")}
      >
        <Avatar
          className={cn("size-9")}
          style={{
            backgroundColor: `${stringToColor(user?.fullName)}`,
          }}
        >
          <AvatarFallback
            className={cn("text-base leading-none")}
            style={{
              color: `${getContrastingColor(stringToColor(user?.fullName))}`,
            }}
          >
            {`${getInitials(user?.fullName ?? "undefined undefined")}`}
          </AvatarFallback>
        </Avatar>
        <div className="line-clamp-1 shrink-0 text-center text-lg font-semibold capitalize leading-none text-white">
          {user?.fullName?.split(" ").slice(-2).join(" ")}
        </div>
      </Link>
    );
  }

  return (
    <Link href="/dang-nhap" className="flex flex-row items-center gap-4 px-4 py-3">
      <Image src={accountIcon} alt="" className="size-8" />
      <div>
        <p className="text-center text-base font-bold text-white">Tài khoản</p>
        <p className="text-center text-[0.875rem] font-medium text-white">
          Đăng nhập
        </p>
      </div>
    </Link>
  );
};
