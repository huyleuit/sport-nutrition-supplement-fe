"use client";
import {
  cn,
  convertSlugUrl,
  formatPrice,
  getVietnameseDate,
  getVietnameseTime,
} from "@/lib/utils";
import { OrderHistoryType } from "@/types/order-history";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const STATUS = {
  CANCELLED: "Đã hủy",
  PENDING: "Đang xử lý",
  SHIPPING: "Đang giao hàng",
  SUCCESS: "Giao hàng thành công",
};

type TProps = {
  order: OrderHistoryType;
};

const OrderCard = ({ order }: TProps) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="flex w-full flex-col items-start justify-between px-4 py-[1em] text-[#333] md:flex-row md:px-0">
      <div
        className={cn(
          "flex w-full shrink-0 flex-col md:w-auto md:basis-[27.5em] md:gap-[1em]",
          showAll ? "max-md:divide-y" : "",
        )}
      >
        {order.products
          .slice(0, showAll ? order.products.length : 1)
          .map((product, index) => (
            <div
              key={index}
              className="flex flex-row items-center py-2 md:py-0"
            >
              <div className="flex size-[3.5em] items-center justify-center rounded-[0.375em] border border-solid">
                <Image
                  src={product.image}
                  alt={product.productName}
                  width={48}
                  height={48}
                  className="size-auto max-h-[3em] max-w-[3em]"
                />
              </div>
              <div className="ml-[0.5em] grow">
                <Link
                  href={`/san-pham/${convertSlugUrl(product.productName)}-${product.productId}.html`}
                  className="line-clamp-1 text-[0.9375em] leading-[1.3]"
                >
                  {product.productName}
                </Link>
                <p className="line-clamp-1 text-[0.875em] leading-[1.3]">
                  {product.variantName}
                </p>
                <p className="overflow-hidden text-[0.8em] leading-[1.3]">
                  SL: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        {!showAll && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={cn(
              "flex flex-row items-center justify-center gap-[0.125em] text-[0.8em] text-[#707070]",
              order.products.length > 1 ? "cursor-pointer" : "hidden",
            )}
          >
            Xem thêm{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 22"
              strokeWidth={1.5}
              stroke="#707070"
              className="size-[1em]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        )}
      </div>
      <div
        className={cn(
          "mt-2 flex w-full flex-row justify-between md:mt-0 md:contents",
        )}
      >
        <div className="shrink-0 text-left md:w-auto md:basis-[7em] md:text-center">
          <div className="text-[0.9375em]">
            {getVietnameseDate(order.createdDate)}
          </div>
          <div className="text-[0.875em]">
            {getVietnameseTime(order.createdDate)}
          </div>
        </div>
        <div className={cn("flex flex-col md:contents")}>
          <div
            className={cn(
              "max-md:text-blue-gradient shrink-0 text-right font-bold",
              "md:w-auto md:basis-[6.875em] md:text-center md:font-normal md:text-[#333]",
            )}
          >
            {formatPrice(order.totalAmount)}
          </div>
          <div
            className={cn(
              "shrink-0 text-right text-[0.9375em] font-medium md:w-auto md:basis-[8em] md:text-center",
              order.status === "SUCCESS" && "text-green-500",
              order.status === "CANCELLED" && "text-red-500",
              order.status === "PENDING" && "text-yellow-500",
              order.status === "SHIPPING" && "text-blue-500",
            )}
          >
            {STATUS[order.status]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
