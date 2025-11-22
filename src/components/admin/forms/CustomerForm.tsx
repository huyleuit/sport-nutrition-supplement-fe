"use client";

import { useState } from "react";
import type { Customer } from "@/data/admin/customers";

type CustomerFormProps = {
  customer?: Customer | null;
  onSubmit: (data: Partial<Customer>) => void;
};

export function CustomerForm({ customer, onSubmit }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    status: customer?.status || "ACTIVE",
    addresses: customer?.addresses || [],
  });

  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    isDefault: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddAddress = () => {
    if (newAddress.label && newAddress.address) {
      const id = formData.addresses.length + 1;
      const addressToAdd = {
        id,
        ...newAddress,
      };

      setFormData((prev) => ({
        ...prev,
        addresses: [...prev.addresses, addressToAdd],
      }));

      // Reset form
      setNewAddress({
        label: "",
        address: "",
        isDefault: false,
      });
    }
  };

  const handleRemoveAddress = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== id),
    }));
  };

  const handleSetDefaultAddress = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} data-form="customer" className="space-y-6">
      {/* Basic Information */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Thông tin cơ bản
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Name */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nhập email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nhập số điện thoại (10 số)"
            />
          </div>

          {/* Status */}
          <div className="lg:col-span-2">
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
              <option value="INACTIVE">Không hoạt động</option>
              <option value="BLOCKED">Bị chặn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Địa chỉ</h3>

        {/* Existing Addresses */}
        {formData.addresses.length > 0 && (
          <div className="mb-4 space-y-2">
            {formData.addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {addr.label}
                    </p>
                    {addr.isDefault && (
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{addr.address}</p>
                </div>
                <div className="flex gap-2">
                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Đặt mặc định
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveAddress(addr.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Address */}
        <div className="space-y-3 rounded-lg border border-dashed border-gray-300 p-3">
          <p className="text-sm font-medium text-gray-700">Thêm địa chỉ mới</p>
          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <input
                type="text"
                name="label"
                value={newAddress.label}
                onChange={handleAddressChange}
                placeholder="Nhãn (Nhà riêng, Văn phòng...)"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={handleAddressChange}
                id="isDefault"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700">
                Đặt làm địa chỉ mặc định
              </label>
            </div>
          </div>
          <input
            type="text"
            name="address"
            value={newAddress.address}
            onChange={handleAddressChange}
            placeholder="Địa chỉ chi tiết"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddAddress}
            disabled={!newAddress.label || !newAddress.address}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Thêm địa chỉ
          </button>
        </div>
      </div>

      {/* Hidden submit button */}
      <input type="submit" className="hidden" />
    </form>
  );
}
