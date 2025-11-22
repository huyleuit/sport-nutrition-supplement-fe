"use client";

import { useState } from "react";
import type { FlashSale } from "@/data/admin/promotions";
import { mockProducts } from "@/data/admin/products";

type FlashSaleFormProps = {
  flashSale?: FlashSale | null;
  onSubmit: (data: Partial<FlashSale>) => void;
};

export function FlashSaleForm({ flashSale, onSubmit }: FlashSaleFormProps) {
  const [formData, setFormData] = useState({
    name: flashSale?.name || "",
    description: flashSale?.description || "",
    products: flashSale?.products || [],
    startDate: flashSale?.startDate
      ? new Date(flashSale.startDate).toISOString().slice(0, 16)
      : "",
    endDate: flashSale?.endDate
      ? new Date(flashSale.endDate).toISOString().slice(0, 16)
      : "",
    status: flashSale?.status || "SCHEDULED",
  });

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [productDiscount, setProductDiscount] = useState(0);
  const [productStock, setProductStock] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (selectedProductId && productDiscount > 0 && productStock > 0) {
      const product = mockProducts.find((p) => p.id === selectedProductId);
      if (
        product &&
        !formData.products.find((p) => p.productId === selectedProductId)
      ) {
        const salePrice =
          product.price - (product.price * productDiscount) / 100;
        const newProduct = {
          productId: product.id,
          productName: product.name,
          originalPrice: product.price,
          salePrice,
          discount: productDiscount,
          stockLimit: productStock,
          soldCount: 0,
        };

        setFormData((prev) => ({
          ...prev,
          products: [...prev.products, newProduct],
        }));

        // Reset
        setSelectedProductId(null);
        setProductDiscount(0);
        setProductStock(0);
      }
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.productId !== productId),
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
    <form onSubmit={handleSubmit} data-form="flashsale" className="space-y-6">
      {/* Basic Information */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Thông tin cơ bản
        </h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Name */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tên chương trình <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="VD: Flash Sale Cuối Tuần"
            />
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
              placeholder="Nhập mô tả cho chương trình Flash Sale"
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
              <option value="SCHEDULED">Đã lên lịch</option>
              <option value="ACTIVE">Đang diễn ra</option>
              <option value="EXPIRED">Đã kết thúc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Sản phẩm tham gia
        </h3>

        {/* Existing Products */}
        {formData.products.length > 0 && (
          <div className="mb-4 space-y-2">
            {formData.products.map((product) => (
              <div
                key={product.productId}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {product.productName}
                  </p>
                  <div className="mt-1 flex gap-4 text-xs text-gray-600">
                    <span>
                      Giá gốc:{" "}
                      <span className="font-medium">
                        {product.originalPrice.toLocaleString()}đ
                      </span>
                    </span>
                    <span>
                      Giá sale:{" "}
                      <span className="font-medium text-red-600">
                        {product.salePrice.toLocaleString()}đ
                      </span>
                    </span>
                    <span>
                      Giảm:{" "}
                      <span className="font-medium">{product.discount}%</span>
                    </span>
                    <span>
                      Số lượng:{" "}
                      <span className="font-medium">{product.stockLimit}</span>
                    </span>
                  </div>
                </div>
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
        )}

        {/* Add New Product */}
        <div className="space-y-3 rounded-lg border border-dashed border-gray-300 p-3">
          <p className="text-sm font-medium text-gray-700">Thêm sản phẩm</p>
          <div className="grid gap-3 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <select
                value={selectedProductId || ""}
                onChange={(e) =>
                  setSelectedProductId(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">-- Chọn sản phẩm --</option>
                {mockProducts
                  .filter(
                    (p) =>
                      !formData.products.find((fp) => fp.productId === p.id),
                  )
                  .map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.price.toLocaleString()}đ
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                value={productDiscount}
                onChange={(e) => setProductDiscount(Number(e.target.value))}
                min="1"
                max="100"
                placeholder="% Giảm giá"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(Number(e.target.value))}
                min="1"
                placeholder="Số lượng"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleAddProduct}
                disabled={
                  !selectedProductId ||
                  productDiscount <= 0 ||
                  productStock <= 0
                }
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden submit button */}
      <input type="submit" className="hidden" />
    </form>
  );
}
