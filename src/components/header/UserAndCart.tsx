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
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import accountIcon from "/public/account-icon.svg";
import cartIcon from "/public/cart-icon.svg";

export const UserAndCart = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const MobileUser = () => {
    if (user) {
      return (
        <Link
          href="/nguoi-dung/thong-tin-ca-nhan"
          className="flex max-w-[9rem] flex-row items-center gap-2"
        >
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/50 xs:size-8">
            <Avatar
              className={cn("size-[1.375rem] xs:size-7")}
              style={{
                backgroundColor: `${stringToColor(user?.name)}`,
              }}
            >
              <AvatarFallback
                className={cn("text-[0.7rem] xs:text-sm")}
                style={{
                  color: `${getContrastingColor(stringToColor(user?.name))}`,
                }}
              >
                {`${getInitials(user?.name ?? "undefined undefined")}`}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="line-clamp-1 hidden shrink-0 text-center text-sm font-semibold capitalize leading-none text-white md:flex">
            {user?.name.split(" ").slice(-2).join(" ")}
          </div>
        </Link>
      );
    }

    return (
      <Link href="/dang-nhap" className="flex flex-row items-center gap-2">
        <Image src={accountIcon} alt="" className="size-5 xs:size-7" />
        <p className="hidden text-center text-[0.875rem] font-semibold text-white lg:block">
          Đăng nhập
        </p>
      </Link>
    );
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/dang-nhap");
    } else {
      router.push("/gio-hang");
    }
  };

  return (
    <div className="absolute right-[4%] flex flex-row items-center gap-1 xs:gap-4 xl:hidden">
      <MobileUser />
      <div>
        <button
          onClick={handleCartClick}
          className="flex cursor-pointer flex-row items-center gap-2 rounded-[3.125rem] px-4 py-2 lg:bg-[#1250DC]"
        >
          <Image src={cartIcon} alt="" className="size-5 xs:size-7" />
          <p className="hidden text-center text-[0.875rem] font-semibold tracking-[0.025rem] text-white lg:block">
            Giỏ hàng
          </p>
        </button>
      </div>
    </div>
  );
};
