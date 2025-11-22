"use client";
import { useAppContext } from "@/app/app-provider";
import { cn, formatPhoneNumber } from "@/lib/utils";
import { AddressResType } from "@/schemaValidations/address.schema";

type TProps = {
  address: AddressResType;
  currentAddressId: string;
};

export const OrderAddressCard = ({ address, currentAddressId }: TProps) => {
  const { user } = useAppContext();
  return (
    <div
      className={cn(
        "rounded-sm border border-solid p-2",
        currentAddressId === address.id
          ? "border-[#1250DC] bg-[#007AFF]/20"
          : "border-[#4A4F63]",
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-x-[0.5em] text-[1em] font-medium md:flex-row",
          currentAddressId === address.id ? "text-[#1250DC]" : "text-[#333]",
        )}
      >
        <div className="line-clamp-1 flex max-w-[20em] flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          {user ? user.name : ""}
        </div>
        <span className="hidden md:block">|</span>
        <div className="line-clamp-1 flex max-w-[20em] flex-row items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-[1.125rem]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          {user ? formatPhoneNumber(user.phone) : ""}
        </div>
      </div>
      <div
        className={cn(
          "line-clamp-3 flex flex-row items-start gap-1 text-left font-normal md:mt-1",
          currentAddressId === address.id ? "text-black" : "text-[#8C8F8D]",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {address.location}
      </div>
    </div>
  );
};
