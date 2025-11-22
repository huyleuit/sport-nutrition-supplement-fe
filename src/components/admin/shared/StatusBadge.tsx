"use client";

import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: string;
  variant?: "default" | "product" | "order" | "payment";
};

const statusConfig = {
  product: {
    PUBLISHED: { label: "Đã xuất bản", color: "bg-green-100 text-green-800" },
    DRAFT: { label: "Nháp", color: "bg-gray-100 text-gray-800" },
    HIDDEN: { label: "Ẩn", color: "bg-yellow-100 text-yellow-800" },
  },
  order: {
    PENDING: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
    CONFIRMED: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
    SHIPPING: { label: "Đang giao", color: "bg-indigo-100 text-indigo-800" },
    SUCCESS: { label: "Hoàn thành", color: "bg-green-100 text-green-800" },
    CANCELLED: { label: "Đã hủy", color: "bg-red-100 text-red-800" },
  },
  payment: {
    PENDING: {
      label: "Chờ thanh toán",
      color: "bg-yellow-100 text-yellow-800",
    },
    PAID: { label: "Đã thanh toán", color: "bg-green-100 text-green-800" },
    FAILED: { label: "Thất bại", color: "bg-red-100 text-red-800" },
    REFUNDED: { label: "Đã hoàn tiền", color: "bg-gray-100 text-gray-800" },
  },
  default: {
    ACTIVE: { label: "Hoạt động", color: "bg-green-100 text-green-800" },
    INACTIVE: { label: "Không hoạt động", color: "bg-gray-100 text-gray-800" },
    EXPIRED: { label: "Hết hạn", color: "bg-red-100 text-red-800" },
    SCHEDULED: { label: "Đã lên lịch", color: "bg-blue-100 text-blue-800" },
  },
};

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  const variantConfig = statusConfig[variant];
  const config = (variantConfig as any)[status] || {
    label: status,
    color: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        config.color,
      )}
    >
      {config.label}
    </span>
  );
}
