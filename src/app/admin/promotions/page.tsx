"use client";

import { useState } from "react";
import { DataTable, Column } from "@/components/admin/shared/DataTable";
import { Modal } from "@/components/admin/shared/Modal";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { CouponForm } from "@/components/admin/forms/CouponForm";
import { FlashSaleForm } from "@/components/admin/forms/FlashSaleForm";
import { Button } from "@/components/ui/button";
import {
  mockCoupons,
  mockFlashSales,
  type Coupon,
  type FlashSale,
} from "@/data/admin/promotions";
import { formatPrice } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faPercentage,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState<"coupons" | "flashsales">(
    "coupons",
  );
  const [coupons, setCoupons] = useState(mockCoupons);
  const [flashSales, setFlashSales] = useState(mockFlashSales);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [selectedFlashSale, setSelectedFlashSale] = useState<FlashSale | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const couponColumns: Column<Coupon>[] = [
    {
      key: "code",
      label: "Mã giảm giá",
      sortable: true,
      render: (coupon) => (
        <span className="font-mono font-semibold text-blue-600">
          {coupon.code}
        </span>
      ),
    },
    {
      key: "description",
      label: "Mô tả",
      sortable: true,
    },
    {
      key: "type",
      label: "Loại",
      render: (coupon) => (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={coupon.type === "PERCENTAGE" ? faPercentage : faDollarSign}
            className="h-4 w-4 text-gray-400"
          />
          <span className="text-sm">
            {coupon.type === "PERCENTAGE"
              ? `${coupon.value}%`
              : formatPrice(coupon.value)}
          </span>
        </div>
      ),
    },
    {
      key: "minOrderValue",
      label: "Đơn tối thiểu",
      sortable: true,
      render: (coupon) => (
        <span className="text-sm">{formatPrice(coupon.minOrderValue)}</span>
      ),
    },
    {
      key: "usage",
      label: "Lượt sử dụng",
      render: (coupon) => (
        <div className="text-sm">
          <span className="font-semibold">{coupon.usageCount}</span> /{" "}
          {coupon.usageLimit}
        </div>
      ),
    },
    {
      key: "endDate",
      label: "Hết hạn",
      sortable: true,
      render: (coupon) => (
        <span className="text-sm text-gray-600">
          {new Date(coupon.endDate).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (coupon) => <StatusBadge status={coupon.status} />,
    },
    {
      key: "actions",
      label: "Hành động",
      render: (coupon) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCoupon(coupon);
              setIsDetailModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCoupon(coupon);
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
              setSelectedCoupon(coupon);
              setIsDeleteModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  const flashSaleColumns: Column<FlashSale>[] = [
    {
      key: "name",
      label: "Tên chương trình",
      sortable: true,
      render: (sale) => (
        <div>
          <p className="font-medium text-gray-900">{sale.name}</p>
          <p className="text-xs text-gray-500">{sale.description}</p>
        </div>
      ),
    },
    {
      key: "products",
      label: "Sản phẩm",
      render: (sale) => (
        <span className="text-sm text-gray-600">
          {sale.products.length} sản phẩm
        </span>
      ),
    },
    {
      key: "startDate",
      label: "Bắt đầu",
      sortable: true,
      render: (sale) => (
        <span className="text-sm text-gray-600">
          {new Date(sale.startDate).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      key: "endDate",
      label: "Kết thúc",
      sortable: true,
      render: (sale) => (
        <span className="text-sm text-gray-600">
          {new Date(sale.endDate).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (sale) => <StatusBadge status={sale.status} />,
    },
    {
      key: "actions",
      label: "Hành động",
      render: (sale) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFlashSale(sale);
              setIsDetailModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFlashSale(sale);
              setIsEditMode(true);
              setIsFormModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleDeleteCoupon = () => {
    if (selectedCoupon) {
      setCoupons(coupons.filter((c) => c.id !== selectedCoupon.id));
      setIsDeleteModalOpen(false);
      setSelectedCoupon(null);
    }
  };

  const handleCloseForm = () => {
    setIsFormModalOpen(false);
    setIsEditMode(false);
    setSelectedCoupon(null);
    setSelectedFlashSale(null);
  };

  const handleSubmitCoupon = (data: Partial<Coupon>) => {
    if (isEditMode && selectedCoupon) {
      // Update
      setCoupons(
        coupons.map((c) =>
          c.id === selectedCoupon.id ? { ...c, ...data } : c,
        ),
      );
    } else {
      // Add
      const newCoupon: Coupon = {
        id: Math.max(...coupons.map((c) => c.id)) + 1,
        ...data,
        usageCount: 0,
        createdAt: new Date().toISOString(),
      } as Coupon;
      setCoupons([newCoupon, ...coupons]);
    }
    handleCloseForm();
  };

  const handleSubmitFlashSale = (data: Partial<FlashSale>) => {
    if (isEditMode && selectedFlashSale) {
      // Update
      setFlashSales(
        flashSales.map((fs) =>
          fs.id === selectedFlashSale.id ? { ...fs, ...data } : fs,
        ),
      );
    } else {
      // Add
      const newFlashSale: FlashSale = {
        id: Math.max(...flashSales.map((fs) => fs.id)) + 1,
        ...data,
        createdAt: new Date().toISOString(),
      } as FlashSale;
      setFlashSales([newFlashSale, ...flashSales]);
    }
    handleCloseForm();
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Quản lý khuyến mãi
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Tạo và quản lý các chương trình khuyến mãi
          </p>
        </div>
        <Button
          onClick={() => {
            setIsEditMode(false);
            setIsFormModalOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
          {activeTab === "coupons" ? "Tạo mã giảm giá" : "Tạo flash sale"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 overflow-x-auto sm:space-x-8">
          <button
            onClick={() => setActiveTab("coupons")}
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "coupons"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Mã giảm giá ({coupons.length})
          </button>
          <button
            onClick={() => setActiveTab("flashsales")}
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "flashsales"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Flash Sale ({flashSales.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "coupons" ? (
        <>
          {/* Filters for Coupons */}
          <div className="flex flex-wrap gap-4 rounded-lg bg-white p-4 shadow">
            <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Tất cả trạng thái</option>
              <option value="ACTIVE">Hoạt động</option>
              <option value="EXPIRED">Hết hạn</option>
              <option value="INACTIVE">Không hoạt động</option>
            </select>
            <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Tất cả loại</option>
              <option value="PERCENTAGE">Phần trăm</option>
              <option value="FIXED">Số tiền cố định</option>
            </select>
          </div>

          {/* Coupons Table */}
          <DataTable
            columns={couponColumns}
            data={coupons}
            keyExtractor={(coupon) => coupon.id}
            searchable
            itemsPerPage={10}
            emptyMessage="Không có mã giảm giá nào"
          />
        </>
      ) : (
        <>
          {/* Filters for Flash Sales */}
          <div className="flex flex-wrap gap-4 rounded-lg bg-white p-4 shadow">
            <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Tất cả trạng thái</option>
              <option value="ACTIVE">Đang diễn ra</option>
              <option value="SCHEDULED">Đã lên lịch</option>
              <option value="EXPIRED">Đã kết thúc</option>
            </select>
          </div>

          {/* Flash Sales Table */}
          <DataTable
            columns={flashSaleColumns}
            data={flashSales}
            keyExtractor={(sale) => sale.id}
            searchable
            itemsPerPage={10}
            emptyMessage="Không có flash sale nào"
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCoupon(null);
        }}
        title="Xác nhận xóa"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedCoupon(null);
              }}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteCoupon}>
              Xóa
            </Button>
          </div>
        }
      >
        <p className="text-sm text-gray-600">
          Bạn có chắc chắn muốn xóa mã giảm giá{" "}
          <span className="font-semibold">{selectedCoupon?.code}</span>? Hành
          động này không thể hoàn tác.
        </p>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCoupon(null);
          setSelectedFlashSale(null);
        }}
        title={
          activeTab === "coupons"
            ? `Chi tiết mã giảm giá: ${selectedCoupon?.code}`
            : `Chi tiết Flash Sale: ${selectedFlashSale?.name}`
        }
        size="lg"
      >
        {activeTab === "coupons" && selectedCoupon ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Mã giảm giá</p>
                <p className="mt-1 font-mono text-lg font-bold text-blue-600">
                  {selectedCoupon.code}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <div className="mt-1">
                  <StatusBadge status={selectedCoupon.status} />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Mô tả</p>
              <p className="mt-1 text-gray-900">{selectedCoupon.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Loại giảm giá</p>
                <p className="mt-1 text-gray-900">
                  {selectedCoupon.type === "PERCENTAGE"
                    ? `Giảm ${selectedCoupon.value}%`
                    : `Giảm ${formatPrice(selectedCoupon.value)}`}
                </p>
              </div>
              {selectedCoupon.maxDiscount && (
                <div>
                  <p className="text-sm text-gray-600">Giảm tối đa</p>
                  <p className="mt-1 text-gray-900">
                    {formatPrice(selectedCoupon.maxDiscount)}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Đơn hàng tối thiểu</p>
                <p className="mt-1 text-gray-900">
                  {formatPrice(selectedCoupon.minOrderValue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lượt sử dụng</p>
                <p className="mt-1 text-gray-900">
                  {selectedCoupon.usageCount} / {selectedCoupon.usageLimit}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Bắt đầu</p>
                <p className="mt-1 text-gray-900">
                  {new Date(selectedCoupon.startDate).toLocaleString("vi-VN")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Kết thúc</p>
                <p className="mt-1 text-gray-900">
                  {new Date(selectedCoupon.endDate).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          selectedFlashSale && (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600">Tên chương trình</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {selectedFlashSale.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Mô tả</p>
                <p className="mt-1 text-gray-900">
                  {selectedFlashSale.description}
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium text-gray-900">
                  Sản phẩm trong chương trình (
                  {selectedFlashSale.products.length})
                </p>
                <div className="space-y-3">
                  {selectedFlashSale.products.map((product, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <p className="font-medium text-gray-900">
                        {product.productName}
                      </p>
                      <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Giá gốc</p>
                          <p className="font-semibold text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Giá sale</p>
                          <p className="font-semibold text-red-600">
                            {formatPrice(product.salePrice)} (-
                            {product.discount}%)
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Đã bán</p>
                          <p className="font-semibold text-gray-900">
                            {product.soldCount} / {product.stockLimit}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bắt đầu</p>
                  <p className="mt-1 text-gray-900">
                    {new Date(selectedFlashSale.startDate).toLocaleString(
                      "vi-VN",
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kết thúc</p>
                  <p className="mt-1 text-gray-900">
                    {new Date(selectedFlashSale.endDate).toLocaleString(
                      "vi-VN",
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <div className="mt-1">
                  <StatusBadge status={selectedFlashSale.status} />
                </div>
              </div>
            </div>
          )
        )}
      </Modal>

      {/* Form Modal for Coupons */}
      {activeTab === "coupons" && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={handleCloseForm}
          title={isEditMode ? "Sửa mã giảm giá" : "Tạo mã giảm giá mới"}
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleCloseForm}>
                Hủy
              </Button>
              <Button
                onClick={() => {
                  const form = document.querySelector(
                    'form[data-form="coupon"]',
                  ) as HTMLFormElement;
                  if (form) form.requestSubmit();
                }}
              >
                {isEditMode ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          }
        >
          <CouponForm
            coupon={isEditMode ? selectedCoupon : null}
            onSubmit={handleSubmitCoupon}
          />
        </Modal>
      )}

      {/* Form Modal for Flash Sales */}
      {activeTab === "flashsales" && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={handleCloseForm}
          title={isEditMode ? "Sửa Flash Sale" : "Tạo Flash Sale mới"}
          size="lg"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleCloseForm}>
                Hủy
              </Button>
              <Button
                onClick={() => {
                  const form = document.querySelector(
                    'form[data-form="flashsale"]',
                  ) as HTMLFormElement;
                  if (form) form.requestSubmit();
                }}
              >
                {isEditMode ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          }
        >
          <FlashSaleForm
            flashSale={isEditMode ? selectedFlashSale : null}
            onSubmit={handleSubmitFlashSale}
          />
        </Modal>
      )}
    </div>
  );
}
