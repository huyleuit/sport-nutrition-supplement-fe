"use client";

import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { useAdmin } from "@/contexts/AdminContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

export function RecentOrders() {
  const { orders, isLoading } = useAdmin();

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
      })
      .slice(0, 5);
  }, [orders]);

  if (isLoading) {
    return (
      <div className="h-96 animate-pulse rounded-lg bg-white p-6 shadow" />
    );
  }

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

      {recentOrders.length > 0 ? (
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Mã đơn
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Địa chỉ
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
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-3 py-4">
                    <Link
                      href={`/admin/orders`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      onClick={(e) => {
                        e.preventDefault();
                        // You can add navigation logic here if needed
                      }}
                    >
                      #{order.id.slice(-8)}
                    </Link>
                  </td>
                  <td className="px-3 py-4">
                    <p className="max-w-xs truncate text-sm text-gray-900">
                      {order.addressDetail || "Không có địa chỉ"}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(order.totalAmount)}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <div className="flex justify-center">
                      <StatusBadge status={order.status} variant="order" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center">
          <p className="text-gray-500">Chưa có đơn hàng</p>
        </div>
      )}
    </div>
  );
}
