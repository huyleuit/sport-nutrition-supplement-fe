"use client";
import cartApiRequests from "@/apiRequests/cart";
import { OrderHistoryResType } from "@/types/order-history";
import Image from "next/image";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import emptyBox from "/public/empty-box.webp";

const OrderHistorySection = () => {
  const [data, setData] = useState<OrderHistoryResType>([]);

  useEffect(() => {
    cartApiRequests.getAllOrders().then((res) => {
      setData(res.payload);
    });
  }, []);
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
        {data.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistorySection;
