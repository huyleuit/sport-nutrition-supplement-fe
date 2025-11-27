"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { formatPrice } from "@/lib/utils";
import { useMemo } from "react";

const monthNames = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
];

export function RevenueChart() {
  const { orders, isLoading } = useAdmin();

  const monthlyData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => {
      const paidOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdDate);
        return (
          orderDate.getMonth() === i &&
          orderDate.getFullYear() === currentYear &&
          order.status === "PAID"
        );
      });
      const revenue = paidOrders.reduce(
        (sum, order) => sum + order.totalAmount,
        0,
      );
      return {
        month: monthNames[i],
        revenue: revenue / 1000000, // Convert to millions
      };
    });
    return months;
  }, [orders]);

  const maxRevenue = useMemo(
    () => Math.max(...monthlyData.map((d) => d.revenue), 1),
    [monthlyData],
  );

  const totalRevenue = useMemo(
    () => monthlyData.reduce((sum, d) => sum + d.revenue * 1000000, 0),
    [monthlyData],
  );

  const avgRevenue = useMemo(() => {
    const monthsWithRevenue = monthlyData.filter((d) => d.revenue > 0).length;
    return monthsWithRevenue > 0 ? totalRevenue / monthsWithRevenue : 0;
  }, [monthlyData, totalRevenue]);

  if (isLoading) {
    return (
      <div className="h-96 animate-pulse rounded-lg bg-white p-6 shadow" />
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Doanh thu theo tháng
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Biểu đồ doanh thu năm 2025
          </p>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="relative h-64">
        <div className="flex h-full items-end justify-between gap-2">
          {monthlyData.map((data, index) => {
            const height = (data.revenue / maxRevenue) * 100;
            return (
              <div key={index} className="flex flex-1 flex-col items-center">
                <div className="relative w-full">
                  <div
                    className="group relative w-full rounded-t-md bg-blue-500 transition-all hover:bg-blue-600"
                    style={{ height: `${height * 2}px` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white group-hover:block">
                      {data.revenue.toFixed(1)}M VNĐ
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </div>
                </div>
                <span className="mt-2 text-xs text-gray-600">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-4">
        <div>
          <p className="text-xs text-gray-500">Tổng doanh thu</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatPrice(totalRevenue)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">TB/Tháng</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {formatPrice(avgRevenue)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tổng đơn đã thanh toán</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {orders.filter((o) => o.status === "PAID").length}
          </p>
        </div>
      </div>
    </div>
  );
}
