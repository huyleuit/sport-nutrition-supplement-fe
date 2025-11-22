"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { recentOrders } from "@/data/admin/recent-orders";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  SHIPPING: "bg-blue-100 text-blue-800",
  SUCCESS: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export function RecentOrders() {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Đơn hàng gần đây
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {recentOrders.length} đơn hàng mới nhất
          </p>
        </div>
        <Link
          href="/admin/orders"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Xem tất cả →
        </Link>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Mã đơn
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Khách hàng
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Ngày
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Tổng tiền
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-gray-50">
                <td className="whitespace-nowrap px-3 py-4">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    #{order.id}
                  </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <p className="text-sm font-medium text-gray-900">
                    {order.customer}
                  </p>
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <p className="text-sm text-gray-500">{order.date}</p>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {order.total} ₫
                  </p>
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <div className="flex justify-center">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                        statusColors[order.status as keyof typeof statusColors],
                      )}
                    >
                      {order.statusText}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
