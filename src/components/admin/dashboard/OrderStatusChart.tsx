"use client";

import { orderStats } from "@/data/admin/order-status";

export function OrderStatusChart() {
  const totalOrders = orderStats.reduce((sum, stat) => sum + stat.count, 0);

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
      <div className="flex items-center justify-center">
        <div className="relative h-48 w-48">
          {/* Simple circular progress */}
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray={`${(156 / totalOrders) * 251.2} 251.2`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray={`${(89 / totalOrders) * 251.2} 251.2`}
              strokeDashoffset={`-${(156 / totalOrders) * 251.2}`}
              transform="rotate(-90 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#eab308"
              strokeWidth="20"
              strokeDasharray={`${(45 / totalOrders) * 251.2} 251.2`}
              strokeDashoffset={`-${((156 + 89) / totalOrders) * 251.2}`}
              transform="rotate(-90 50 50)"
            />
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
                {stat.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">
                {stat.count}
              </span>
              <span className="w-12 text-right text-xs text-gray-500">
                {((stat.count / totalOrders) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
