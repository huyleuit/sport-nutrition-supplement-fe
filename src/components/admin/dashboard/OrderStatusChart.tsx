"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { useMemo } from "react";

const statusConfig = {
  PAID: { label: "Đã thanh toán", color: "bg-green-500" },
  PENDING: { label: "Chờ xử lý", color: "bg-yellow-500" },
  CANCELLED: { label: "Đã hủy", color: "bg-red-500" },
};

const statusColors = {
  PAID: "#10b981",
  PENDING: "#eab308",
  CANCELLED: "#ef4444",
};

export function OrderStatusChart() {
  const { orders, isLoading } = useAdmin();

  const orderStats = useMemo(() => {
    const stats = {
      PAID: orders.filter((o) => o.status === "PAID").length,
      PENDING: orders.filter((o) => o.status === "PENDING").length,
      CANCELLED: orders.filter((o) => o.status === "CANCELLED").length,
    };

    return Object.entries(stats).map(([status, count]) => ({
      status,
      count,
      label: statusConfig[status as keyof typeof statusConfig].label,
      color: statusConfig[status as keyof typeof statusConfig].color,
      strokeColor: statusColors[status as keyof typeof statusColors],
    }));
  }, [orders]);

  const totalOrders = useMemo(
    () => orderStats.reduce((sum, stat) => sum + stat.count, 0),
    [orderStats],
  );

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-lg bg-white p-6 shadow" />;
  }

  // Calculate angles for donut chart
  const getStrokeDashArray = (count: number) => {
    if (totalOrders === 0) return "0 251.2";
    const percentage = (count / totalOrders) * 100;
    const length = (percentage / 100) * 251.2;
    return `${length} 251.2`;
  };

  const getStrokeDashOffset = (index: number) => {
    if (totalOrders === 0) return 0;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      const percentage = (orderStats[i].count / totalOrders) * 100;
      offset += (percentage / 100) * 251.2;
    }
    return -offset;
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Trạng thái đơn hàng
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Tổng quan đơn hàng tháng này
        </p>
      </div>

      {/* Donut Chart Representation */}
      {totalOrders > 0 ? (
        <>
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="20"
                />
                {orderStats.map((stat, index) => (
                  <circle
                    key={stat.status}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={stat.strokeColor}
                    strokeWidth="20"
                    strokeDasharray={getStrokeDashArray(stat.count)}
                    strokeDashoffset={getStrokeDashOffset(index)}
                    transform="rotate(-90 50 50)"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                <p className="text-sm text-gray-500">Đơn hàng</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 space-y-3">
            {orderStats.map((stat) => (
              <div key={stat.status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${stat.color}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {stat.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">
                    {stat.count}
                  </span>
                  <span className="w-12 text-right text-xs text-gray-500">
                    {totalOrders > 0
                      ? ((stat.count / totalOrders) * 100).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex h-48 items-center justify-center">
          <p className="text-gray-500">Chưa có đơn hàng</p>
        </div>
      )}
    </div>
  );
}
