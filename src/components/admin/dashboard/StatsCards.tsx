"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { cn, formatPrice } from "@/lib/utils";
import {
  faDollarSign,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

export function StatsCards() {
  const { orders, isLoading } = useAdmin();

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((order) => order.status === "PAID")
      .reduce((sum, order) => sum + order.totalAmount, 0);
    const paidOrders = orders.filter((order) => order.status === "PAID").length;
    const pendingOrders = orders.filter(
      (order) => order.status === "PENDING",
    ).length;

    // Tính doanh thu tháng hiện tại và tháng trước
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthRevenue = orders
      .filter((order) => {
        const orderDate = new Date(order.createdDate);
        return (
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear &&
          order.status === "PAID"
        );
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const lastMonthRevenue = orders
      .filter((order) => {
        const orderDate = new Date(order.createdDate);
        return (
          orderDate.getMonth() === lastMonth &&
          orderDate.getFullYear() === lastMonthYear &&
          order.status === "PAID"
        );
      })
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const revenueChange =
      lastMonthRevenue > 0
        ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
        : 0;

    return [
      {
        name: "Tổng đơn hàng",
        value: totalOrders,
        change: "0%",
        changeType: "increase" as const,
        icon: "faShoppingCart",
        bgColor: "bg-blue-500",
      },
      {
        name: "Tổng doanh thu",
        value: formatPrice(totalRevenue),
        change:
          revenueChange >= 0
            ? `+${revenueChange.toFixed(1)}%`
            : `${revenueChange.toFixed(1)}%`,
        changeType:
          revenueChange >= 0 ? ("increase" as const) : ("decrease" as const),
        icon: "faDollarSign",
        bgColor: "bg-green-500",
      },
      {
        name: "Đơn đã thanh toán",
        value: paidOrders,
        change: "0%",
        changeType: "increase" as const,
        icon: "faShoppingCart",
        bgColor: "bg-purple-500",
      },
      {
        name: "Đơn chờ xử lý",
        value: pendingOrders,
        change: "0%",
        changeType: "increase" as const,
        icon: "faShoppingCart",
        bgColor: "bg-yellow-500",
      },
    ];
  }, [orders]);

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-lg bg-white shadow"
          />
        ))}
      </div>
    );
  }

  const iconMap = {
    faShoppingCart,
    faDollarSign,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {stat.change !== "0%" && (
                    <>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          stat.changeType === "increase"
                            ? "text-green-600"
                            : "text-red-600",
                        )}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">
                        so với tháng trước
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full",
                  stat.bgColor,
                )}
              >
                <FontAwesomeIcon
                  icon={iconMap[stat.icon as keyof typeof iconMap]}
                  className="h-7 w-7 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
