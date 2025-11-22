"use client";

import { useState } from "react";
import { Product, mockCategories, mockBrands } from "@/data/admin/products";

type ProductFormProps = {
  product?: Product | null;
  onSubmit: (data: Partial<Product>) => void;
};

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    slug: product?.slug || "",
    categoryId: product?.categoryId || 0,
    brandId: product?.brandId || 0,
    price: product?.price || 0,
    salePrice: product?.salePrice || 0,
    stock: product?.stock || 0,
    description: product?.description || "",
    status: product?.status || "ACTIVE",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "salePrice", "stock", "categoryId", "brandId"].includes(
        name,
      )
        ? Number(value)
        : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} data-form="product" className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Tên sản phẩm */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            SKU <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập mã SKU"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập slug"
          />
        </div>

        {/* Danh mục */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Danh mục <span className="text-red-500">*</span>
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Chọn danh mục</option>
            {mockCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Thương hiệu */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Thương hiệu <span className="text-red-500">*</span>
          </label>
          <select
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Chọn thương hiệu</option>
            {mockBrands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Giá */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Giá gốc (₫) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập giá"
          />
        </div>

        {/* Giá sale */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Giá sale (₫)
          </label>
          <input
            type="number"
            name="salePrice"
            value={formData.salePrice}
            onChange={handleChange}
            min="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập giá sale"
          />
        </div>

        {/* Tồn kho */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tồn kho <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Nhập số lượng"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Trạng thái <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="ACTIVE">Đang bán</option>
            <option value="INACTIVE">Ngừng bán</option>
            <option value="OUT_OF_STOCK">Hết hàng</option>
          </select>
        </div>
      </div>

      {/* Mô tả */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Mô tả
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Nhập mô tả sản phẩm"
        />
      </div>

      {/* Actions - Hidden, will be in Modal footer */}
      <input type="submit" className="hidden" />
    </form>
  );
}
