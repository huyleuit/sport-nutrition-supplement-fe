"use client";

import cartApiRequests from "@/apiRequests/cart";
import { Column, DataTable } from "@/components/admin/shared/DataTable";
import { Modal } from "@/components/admin/shared/Modal";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { formatPrice, handleErrorApi } from "@/lib/utils";
import { OrderDetailResType, OrderHistoryType } from "@/types/order-history";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const orderStatuses = [
  { value: "PENDING", label: "Chờ xử lý" },
  { value: "PAID", label: "Đã thanh toán" },
  { value: "CANCELLED", label: "Đã hủy" },
];

export default function OrdersPage() {
  const { orders, isLoading, refreshOrders } = useAdmin();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetailResType | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Filter orders by status
  const filteredOrders =
    statusFilter === ""
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const handleViewDetail = async (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailModalOpen(true);
    setIsLoadingDetail(true);
    try {
      const result = await cartApiRequests.getDetailOrder(orderId);
      setOrderDetail(result.payload);
    } catch (error) {
      handleErrorApi({ error });
      setIsDetailModalOpen(false);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrderId(null);
    setOrderDetail(null);
  };

  const columns: Column<OrderHistoryType>[] = [
    {
      key: "id",
      label: "Mã đơn",
      sortable: true,
      render: (order) => (
        <Link
          href={`/admin/orders/${order.id}`}
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          #{order.id.slice(-8)}
        </Link>
      ),
    },
    {
      key: "createdDate",
      label: "Ngày đặt",
      sortable: true,
      render: (order) => (
        <span className="text-sm text-gray-600">
          {new Date(order.createdDate).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
    {
      key: "totalAmount",
      label: "Tổng tiền",
      sortable: true,
      render: (order) => (
        <span className="font-semibold text-gray-900">
          {formatPrice(order.totalAmount)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (order) => <StatusBadge status={order.status} variant="order" />,
    },
    {
      key: "addressDetail",
      label: "Địa chỉ",
      render: (order) => (
        <span className="max-w-xs truncate text-sm text-gray-600">
          {order.addressDetail || "Không có địa chỉ"}
        </span>
      ),
    },
    {
      key: "products",
      label: "Số sản phẩm",
      render: (order) => (
        <span className="text-sm text-gray-600">
          {order.products?.length || 0} SP
        </span>
      ),
    },
    {
      key: "actions",
      label: "Hành động",
      render: (order) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetail(order.id);
            }}
          >
            <FontAwesomeIcon icon={faEye} className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Quản lý đơn hàng
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Tổng {filteredOrders.length} đơn hàng
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 rounded-lg bg-white p-4 shadow">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Tất cả trạng thái</option>
          {orderStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <Button variant="outline" onClick={refreshOrders}>
          Làm mới
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredOrders}
        keyExtractor={(order) => order.id}
        searchable
        itemsPerPage={10}
        emptyMessage="Không có đơn hàng nào"
      />

      {/* Order Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        title={`Chi tiết đơn hàng #${selectedOrderId?.slice(-8) || ""}`}
        size="lg"
      >
        {isLoadingDetail ? (
          <div className="flex h-64 items-center justify-center">
            <svg
              className="h-8 w-8 animate-spin text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : orderDetail ? (
          <div className="space-y-6">
            {/* Order Info */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                Thông tin đơn hàng
              </h4>
              <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                <p>
                  <span className="font-medium">Mã đơn:</span> #
                  {orderDetail.id.slice(-8)}
                </p>
                <p>
                  <span className="font-medium">Ngày đặt:</span>{" "}
                  {new Date(orderDetail.orderDate).toLocaleString("vi-VN")}
                </p>
                <p>
                  <span className="font-medium">Trạng thái:</span>{" "}
                  <StatusBadge status={orderDetail.status} variant="order" />
                </p>
                <p>
                  <span className="font-medium">Tổng tiền:</span>{" "}
                  <span className="font-semibold">
                    {formatPrice(orderDetail.totalAmount)}
                  </span>
                </p>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                Thông tin khách hàng
              </h4>
              <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {orderDetail.email}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  {orderDetail.phone}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span>{" "}
                  {orderDetail.location}
                </p>
              </div>
            </div>

            {/* Note */}
            {orderDetail.note && (
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">Ghi chú</h4>
                <div className="rounded-lg bg-gray-50 p-4 text-sm">
                  <p>{orderDetail.note}</p>
                </div>
              </div>
            )}

            {/* Items */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">Sản phẩm</h4>
              <div className="space-y-3">
                {orderDetail.items && orderDetail.items.length > 0 ? (
                  orderDetail.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 p-3"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={item.imgUrl}
                          alt={item.variantName || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {item.variantName || ""}
                        </p>
                        {/* <p className="text-sm text-gray-500">
                          {item.variantName}
                        </p> */}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          x{item.quantity}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Không có sản phẩm</p>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex justify-between border-t border-gray-300 pt-2 text-base font-semibold">
                <span>Tổng cộng:</span>
                <span>{formatPrice(orderDetail.totalAmount)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <p className="text-gray-500">Không tìm thấy thông tin đơn hàng</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
