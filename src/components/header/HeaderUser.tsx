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

export const HeaderUser = () => {
  const { user } = useAppContext();
  if (user) {
    return (
      <Link
        href="/nguoi-dung/thong-tin-ca-nhan"
        className="hidden w-[10rem] flex-row items-center justify-center gap-2 xl:flex"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/50">
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
        </div>
        <div className="line-clamp-1 text-base font-medium capitalize text-white">
          {user?.fullName?.split(" ").slice(-2).join(" ")}
        </div>
      </Link>
    );
  }
  return (
    <Link
      href="/dang-nhap"
      className="hidden flex-row items-center gap-2 xl:flex"
    >
      <Image src={accountIcon} alt="" className="size-7" />
      <p className="text-center text-[0.875rem] font-semibold text-white">
        Đăng nhập
      </p>
    </Link>
  );
};
