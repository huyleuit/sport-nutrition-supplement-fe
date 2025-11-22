"use client";

import { useState } from "react";
import { DataTable, Column } from "@/components/admin/shared/DataTable";
import { Modal } from "@/components/admin/shared/Modal";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { ProductForm } from "@/components/admin/forms/ProductForm";
import { Button } from "@/components/ui/button";
import {
  mockProducts,
  mockCategories,
  mockBrands,
  type Product,
} from "@/data/admin/products";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns: Column<Product>[] = [
    {
      key: "image",
      label: "Hình ảnh",
      render: (product: Product) => (
        <div className="h-12 w-12 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      ),
    },
    {
      key: "name",
      label: "Tên sản phẩm",
      sortable: true,
      className: "text-left",
      render: (product) => (
        <div className="text-left">
          <p className="font-medium text-gray-900">{product.name}</p>
          <p className="text-xs text-gray-500">{product.categoryName}</p>
        </div>
      ),
    },
    {
      key: "sku",
      label: "SKU",
      sortable: true,
    },
    {
      key: "price",
      label: "Giá",
      sortable: true,
      render: (product) => (
        <span className="font-medium text-gray-900">
          {product.price.toLocaleString("vi-VN")} ₫
        </span>
      ),
    },
    {
      key: "stock",
      label: "Tồn kho",
      sortable: true,
      render: (product) => (
        <span
          className={
            product.stock < 20 ? "font-semibold text-red-600" : "text-gray-900"
          }
        >
          {product.stock}
        </span>
      ),
    },
    {
      key: "sold",
      label: "Đã bán",
      sortable: true,
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (product) => (
        <StatusBadge status={product.status} variant="product" />
      ),
    },
    {
      key: "actions",
      label: "Hành động",
      render: (product) => (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/products/${product.id}`}>
            <Button variant="ghost" size="sm">
              <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
              setIsEditMode(true);
              setIsFormModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
              setIsDeleteModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleSubmitForm = (data: Partial<Product>) => {
    if (isEditMode && selectedProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...data } : p,
        ),
      );
    } else {
      // Add new product
      const categoryName =
        mockCategories.find((c) => c.id === data.categoryId)?.name || "";
      const brandName =
        mockBrands.find((b) => b.id === data.brandId)?.name || "";

      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        name: data.name || "",
        sku: data.sku || "",
        slug: data.slug || "",
        categoryId: data.categoryId || 0,
        categoryName,
        brandId: data.brandId || 0,
        brandName,
        price: data.price || 0,
        salePrice: data.salePrice || null,
        discount: 0,
        stock: data.stock || 0,
        sold: 0,
        description: data.description || "",
        images: ["/product-banners/banner-1.webp"],
        status: data.status || "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Product;
      setProducts([...products, newProduct]);
    }
    setIsFormModalOpen(false);
    setSelectedProduct(null);
    setIsEditMode(false);
  };

  const handleCloseForm = () => {
    setIsFormModalOpen(false);
    setSelectedProduct(null);
    setIsEditMode(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Quản lý sản phẩm
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Tổng {products.length} sản phẩm
          </p>
        </div>
        <Button
          onClick={() => {
            setIsEditMode(false);
            setSelectedProduct(null);
            setIsFormModalOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 rounded-lg bg-white p-4 shadow">
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">Tất cả danh mục</option>
          {mockCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">Tất cả thương hiệu</option>
          {mockBrands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">Tất cả trạng thái</option>
          <option value="PUBLISHED">Đã xuất bản</option>
          <option value="DRAFT">Nháp</option>
          <option value="HIDDEN">Ẩn</option>
        </select>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={products}
        keyExtractor={(product) => product.id}
        searchable
        itemsPerPage={10}
        emptyMessage="Không có sản phẩm nào"
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Xác nhận xóa sản phẩm"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedProduct(null);
              }}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </div>
        }
      >
        <p className="text-sm text-gray-600">
          Bạn có chắc chắn muốn xóa sản phẩm{" "}
          <span className="font-semibold">{selectedProduct?.name}</span>? Hành
          động này không thể hoàn tác.
        </p>
      </Modal>

      {/* Form Modal (Add/Edit) */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseForm}
        title={isEditMode ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseForm}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                // Trigger form submit
                const form = document.querySelector(
                  'form[data-form="product"]',
                ) as HTMLFormElement;
                if (form) form.requestSubmit();
              }}
            >
              {isEditMode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        }
      >
        <ProductForm
          product={isEditMode ? selectedProduct : null}
          onSubmit={handleSubmitForm}
        />
      </Modal>
    </div>
  );
}
