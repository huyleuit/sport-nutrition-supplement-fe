"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import arrow from "/public/arrow.svg";

type TProps = {
  url: string;
};

export const SeeMoreButton = ({ url }: TProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(url)}
      className="flex flex-row items-center rounded-[0.625rem] border border-solid border-[#8C8F8D] px-2 py-1 text-[0.875rem]"
    >
      Xem tất cả{" "}
      <Image src={arrow} alt="arrow" className="size-4 leading-[1.21]" />
    </button>
  );
};
