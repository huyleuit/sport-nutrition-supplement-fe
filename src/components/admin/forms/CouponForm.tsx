"use client";

import { useState } from "react";
import type { Coupon } from "@/data/admin/promotions";

type CouponFormProps = {
  coupon?: Coupon | null;
  onSubmit: (data: Partial<Coupon>) => void;
};

export function CouponForm({ coupon, onSubmit }: CouponFormProps) {
  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    description: coupon?.description || "",
    type: coupon?.type || "PERCENTAGE",
    value: coupon?.value || 0,
    maxDiscount: coupon?.maxDiscount || null,
    minOrderValue: coupon?.minOrderValue || 0,
    usageLimit: coupon?.usageLimit || 0,
    startDate: coupon?.startDate
      ? new Date(coupon.startDate).toISOString().slice(0, 16)
      : "",
    endDate: coupon?.endDate
      ? new Date(coupon.endDate).toISOString().slice(0, 16)
      : "",
    status: coupon?.status || "ACTIVE",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "value" ||
        name === "maxDiscount" ||
        name === "minOrderValue" ||
        name === "usageLimit"
          ? value === ""
            ? null
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} data-form="coupon" className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Code */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Mã coupon <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="VD: SUMMER2024"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Trạng thái
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ACTIVE">Hoạt động</option>
            <option value="INACTIVE">Tạm dừng</option>
            <option value="EXPIRED">Hết hạn</option>
          </select>
        </div>

        {/* Description */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập mô tả cho mã giảm giá"
          />
        </div>

        {/* Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Loại giảm giá <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="PERCENTAGE">Phần trăm (%)</option>
            <option value="FIXED">Số tiền cố định (đ)</option>
          </select>
        </div>

        {/* Value */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Giá trị {formData.type === "PERCENTAGE" ? "(%)" : "(đ)"}{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="value"
            value={formData.value || ""}
            onChange={handleChange}
            required
            min="0"
            max={formData.type === "PERCENTAGE" ? "100" : undefined}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={
              formData.type === "PERCENTAGE" ? "VD: 15" : "VD: 50000"
            }
          />
        </div>

        {/* Max Discount (only for PERCENTAGE) */}
        {formData.type === "PERCENTAGE" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Giảm tối đa (đ)
            </label>
            <input
              type="number"
              name="maxDiscount"
              value={formData.maxDiscount || ""}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="VD: 200000"
            />
          </div>
        )}

        {/* Min Order Value */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Giá trị đơn hàng tối thiểu (đ)
          </label>
          <input
            type="number"
            name="minOrderValue"
            value={formData.minOrderValue || ""}
            onChange={handleChange}
            min="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="VD: 500000"
          />
        </div>

        {/* Usage Limit */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Giới hạn sử dụng
          </label>
          <input
            type="number"
            name="usageLimit"
            value={formData.usageLimit || ""}
            onChange={handleChange}
            min="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="VD: 100 (0 = không giới hạn)"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ngày bắt đầu <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ngày kết thúc <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Hidden submit button */}
      <input type="submit" className="hidden" />
    </form>
  );
}
