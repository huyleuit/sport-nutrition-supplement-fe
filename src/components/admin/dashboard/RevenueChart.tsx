"use client";

import { useState } from "react";

import { monthlyData } from "@/data/admin/revenue";

export function RevenueChart() {
  const [period, setPeriod] = useState<"month" | "year">("month");

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Doanh thu theo tháng
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Biểu đồ doanh thu năm 2024
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("month")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              period === "month"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Tháng
          </button>
          <button
            onClick={() => setPeriod("year")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              period === "year"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Năm
          </button>
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
                      {data.revenue}M VNĐ
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
          <p className="mt-1 text-lg font-semibold text-gray-900">7.35B VNĐ</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">TB/Tháng</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">612M VNĐ</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Tăng trưởng</p>
          <p className="mt-1 text-lg font-semibold text-green-600">+15.3%</p>
        </div>
      </div>
    </div>
  );
}
