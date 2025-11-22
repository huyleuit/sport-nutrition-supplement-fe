"use client";
import { cn } from "@/lib/utils";
import copy from "clipboard-copy";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import coupon from "/public/home/coupon.svg";

type TProps = {
  title: string;
  shortDescription: Array<string>;
  conditionUrl: string;
  code: string;
};

const CouponCard = ({
  title,
  shortDescription,
  conditionUrl,
  code,
}: TProps) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = async () => {
    if (isCopied) {
      router.push("#");
    } else {
      try {
        await copy(code);
        setIsCopied(true);
      } catch (error) {
        console.error("Sao chép mã giảm giá thất bại!", error);
      }
    }
  };
  return (
    <div className="flex h-full w-[17rem] flex-shrink-0 flex-row">
      <Image src={coupon} alt="coupon" className="h-full w-auto" />
      <div className="grow rounded-e-[1.25rem] bg-white">
        <strong className="px-1 text-[0.75rem] font-bold leading-[1.21] text-[#C11616]">
          {title}
        </strong>
        <ul>
          {shortDescription.map((description, index) => (
            <li
              key={index}
              className="px-1 text-[0.6875rem] font-bold text-black"
            >
              {description}
            </li>
          ))}
        </ul>
        <div className="mt-1 flex w-full flex-row items-center justify-between px-3">
          <button
            onClick={handleCopyClick}
            className={cn(
              "rounded-[0.625rem] px-3 py-2 text-[0.6875rem] font-medium text-white transition-all duration-300 hover:scale-105 active:scale-100",
              isCopied
                ? "border-[1.5px] border-solid border-[#AD1706] bg-white text-[#C11616]"
                : "bg-[#AD1706]",
            )}
          >
            {isCopied ? "Dùng ngay" : "Lấy mã"}
          </button>
          <Link
            href={conditionUrl}
            className="text-[0.75rem] font-normal leading-[1.21] text-[#2E72D2] underline"
          >
            Điều kiện
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
