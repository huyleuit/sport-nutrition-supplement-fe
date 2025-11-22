"use client";

import Image from "next/image";
import Link from "next/link";

import { topProducts } from "@/data/admin/top-products";

export function TopProducts() {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Sản phẩm bán chạy
          </h3>
          <p className="mt-1 text-sm text-gray-500">Top 5 sản phẩm tháng này</p>
        </div>
        <Link
          href="/admin/products"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Xem tất cả →
        </Link>
      </div>

      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-3 transition-shadow hover:shadow-md"
          >
            {/* Rank */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
              {index + 1}
            </div>

            {/* Image */}
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 overflow-hidden">
              <Link
                href={`/admin/products/${product.id}`}
                className="block truncate text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                {product.name}
              </Link>
              <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                <span>Đã bán: {product.sold}</span>
                <span>•</span>
                <span>Kho: {product.stock}</span>
              </div>
            </div>

            {/* Revenue */}
            <div className="flex-shrink-0 text-right">
              <p className="text-sm font-semibold text-gray-900">
                {product.revenue} ₫
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
