"use client";

import { useState } from "react";
import { Order, orderStatuses, paymentMethods } from "@/data/admin/orders";
import { mockCustomers } from "@/data/admin/customers";
import { mockProducts } from "@/data/admin/products";

type OrderFormProps = {
  order?: Order | null;
  onSubmit: (data: Partial<Order>) => void;
};

export function OrderForm({ order, onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState({
    customerId: order?.customerId || 0,
    customerName: order?.customerName || "",
    customerEmail: order?.customerEmail || "",
    customerPhone: order?.customerPhone || "",
    status: order?.status || "PENDING",
    paymentMethod: order?.paymentMethod || "CASH",
    paymentStatus: order?.paymentStatus || "PENDING",
    shippingMethod: order?.shippingMethod || "TPHCM",
    shippingAddress: order?.shippingAddress || "",
    note: order?.note || "",
    products: order?.products || [],
    shippingFee: order?.shippingFee || 30000,
    discount: order?.discount || 0,
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
        name === "shippingFee" || name === "discount" || name === "customerId"
          ? Number(value)
          : value,
    }));
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = Number(e.target.value);
    const customer = mockCustomers.find((c) => c.id === customerId);

    if (customer) {
      setFormData((prev) => ({
        ...prev,
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
      }));
    }
  };

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = Number(e.target.value);
    const product = mockProducts.find((p) => p.id === productId);

    if (product && !formData.products.find((p) => p.productId === productId)) {
      const newProduct = {
        productId: product.id,
        productName: product.name,
        variant: "Default",
        image: product.images[0] || "",
        quantity: 1,
        price: product.salePrice || product.price,
        total: product.salePrice || product.price,
      };

      setFormData((prev) => ({
        ...prev,
        products: [...prev.products, newProduct],
      }));
    }

    // Reset select
    e.target.value = "";
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.productId === productId
          ? { ...p, quantity, total: p.price * quantity }
          : p,
      ),
    }));
  };

  const handleRemoveProduct = (productId: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.productId !== productId),
    }));
  };

  const calculateSubtotal = () => {
    return formData.products.reduce((sum, p) => sum + p.total, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + formData.shippingFee - formData.discount;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      subtotal: calculateSubtotal(),
      total: calculateTotal(),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} data-form="order" className="space-y-4">
      {/* Customer Information */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Thông tin khách hàng
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Select Customer */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Chọn khách hàng <span className="text-red-500">*</span>
            </label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleCustomerChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">-- Chọn khách hàng --</option>
              {mockCustomers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Customer Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tên khách hàng
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-600"
            />
          </div>

          {/* Customer Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-600"
            />
          </div>

          {/* Customer Email */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Sản phẩm</h3>

        {/* Add Product */}
        <div className="mb-3">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Thêm sản phẩm
          </label>
          <select
            onChange={handleProductSelect}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- Chọn sản phẩm --</option>
            {mockProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.price.toLocaleString()}đ
              </option>
            ))}
          </select>
        </div>

        {/* Product List */}
        {formData.products.length > 0 ? (
          <div className="space-y-2">
            {formData.products.map((product) => (
              <div
                key={product.productId}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.productName}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {product.productName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {product.price.toLocaleString()}đ
                  </p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      product.productId,
                      Number(e.target.value),
                    )
                  }
                  className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-center text-sm"
                />
                <p className="w-28 text-right text-sm font-semibold text-gray-900">
                  {product.total.toLocaleString()}đ
                </p>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.productId)}
                  className="text-red-600 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500">
            Chưa có sản phẩm nào
          </p>
        )}
      </div>

      {/* Shipping & Payment */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Shipping Address */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Địa chỉ giao hàng <span className="text-red-500">*</span>
          </label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
            rows={2}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập địa chỉ giao hàng"
          />
        </div>

        {/* Shipping Method */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phương thức vận chuyển
          </label>
          <select
            name="shippingMethod"
            value={formData.shippingMethod}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="TPHCM">Nội thành TP.HCM</option>
            <option value="PROVINCES">Tỉnh thành khác</option>
          </select>
        </div>

        {/* Shipping Fee */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phí vận chuyển
          </label>
          <input
            type="number"
            name="shippingFee"
            value={formData.shippingFee}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phương thức thanh toán
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {paymentMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Trạng thái thanh toán
          </label>
          <select
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="PENDING">Chờ thanh toán</option>
            <option value="PAID">Đã thanh toán</option>
            <option value="REFUNDED">Đã hoàn tiền</option>
          </select>
        </div>

        {/* Discount */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Giảm giá
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Order Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Trạng thái đơn hàng
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {orderStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Note */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Ghi chú
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={2}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập ghi chú cho đơn hàng"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Tổng quan đơn hàng
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tạm tính:</span>
            <span className="font-medium text-gray-900">
              {calculateSubtotal().toLocaleString()}đ
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Phí vận chuyển:</span>
            <span className="font-medium text-gray-900">
              {formData.shippingFee.toLocaleString()}đ
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Giảm giá:</span>
            <span className="font-medium text-red-600">
              -{formData.discount.toLocaleString()}đ
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-2 text-base">
            <span className="font-semibold text-gray-900">Tổng cộng:</span>
            <span className="font-bold text-blue-600">
              {calculateTotal().toLocaleString()}đ
            </span>
          </div>
        </div>
      </div>

      {/* Hidden submit button */}
      <input type="submit" className="hidden" />
    </form>
  );
}
