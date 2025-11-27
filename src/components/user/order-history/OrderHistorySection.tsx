"use client";
import cartApiRequests from "@/apiRequests/cart";
import { cn } from "@/lib/utils";
import { OrderHistoryResType } from "@/types/order-history";
import Image from "next/image";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import emptyBox from "/public/empty-box.webp";

const ITEMS_PER_PAGE = 5;

const OrderHistorySection = () => {
  const [data, setData] = useState<OrderHistoryResType>([]);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    cartApiRequests.getAllOrders().then((res) => {
      setData(res.payload);
    });
  }, []);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const displayedOrders = data.slice(0, displayCount);
  const hasMoreOrders = displayCount < data.length;

  if (!data[0]) {
    return (
      <div className="mt-[0.75em] flex h-[25em] w-full flex-col items-center justify-center gap-[0.5em] rounded-[0.625em] bg-white md:h-[30em]">
        <Image
          src={emptyBox}
          alt="empty box"
          className="size-[10em] opacity-70"
        />
        <p className="text-center text-[1.25em] font-bold text-[#4a4f63]">
          Bạn chưa có đơn hàng nào
        </p>
      </div>
    );
  }

  return (
    <div className="mt-[0.75em] w-full rounded-[0.625em] bg-white md:min-h-[30em]">
      <div className="hidden w-full flex-row items-center justify-between border-b-[0.125em] border-solid px-[1em] py-[0.75em] text-center text-[1em] leading-[1.21] text-[#333] md:flex">
        <div className="shrink-0 basis-[27.5em]">Sản phẩm</div>
        <div className="shrink-0 basis-[7em]">Ngày đặt hàng</div>
        <div className="shrink-0 basis-[6.875em]">Tổng tiền</div>
        <div className="shrink-0 basis-[8em]">Trạng thái</div>
      </div>
      <div className="divide-y md:px-[1em]">
        {displayedOrders.map((order, index) => (
          <OrderCard key={order.id || index} order={order} />
        ))}
      </div>
      {hasMoreOrders && (
        <div className="flex justify-center py-4">
          <button
            onClick={handleLoadMore}
            className={cn(
              "flex flex-row items-center justify-center gap-2 rounded-lg border border-solid border-[#1250DC] px-6 py-2 text-sm font-medium text-[#1250DC] transition-colors hover:bg-[#1250DC] hover:text-white",
            )}
          >
            Xem thêm đơn hàng
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistorySection;
