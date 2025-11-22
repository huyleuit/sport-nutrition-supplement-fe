"use client";
import { useAppContext } from "@/app/app-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cartIcon from "/public/cart-icon.svg";

export const HeaderCart = () => {
  const { user } = useAppContext();
  const router = useRouter();

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/dang-nhap");
    } else {
      router.push("/gio-hang");
    }
  };

  return (
    <div className="hidden xl:block">
      <button
        onClick={handleCartClick}
        className="flex cursor-pointer flex-row items-center gap-2 rounded-[3.125rem] bg-[#1250DC] px-4 py-2"
      >
        <Image src={cartIcon} alt="" className="size-7" />
        <p className="text-center text-[0.875rem] font-semibold tracking-[0.025rem] text-white">
          Giỏ hàng
        </p>
      </button>
    </div>
  );
};
