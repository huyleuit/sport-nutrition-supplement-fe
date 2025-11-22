import OrderHistorySection from "@/components/user/order-history/OrderHistorySection";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch sử đơn hàng",
};

export default function Page() {
  return (
    <div className="w-full">
      <h2 className={cn("text-[1em] font-bold leading-[1.21] text-[#333]")}>
        Đơn hàng của tôi
      </h2>
      <OrderHistorySection />
    </div>
  );
}
