"use client";

import { useState } from "react";
import { DataTable, Column } from "@/components/admin/shared/DataTable";
import { Modal } from "@/components/admin/shared/Modal";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { OrderForm } from "@/components/admin/forms/OrderForm";
import { Button } from "@/components/ui/button";
import { mockOrders, orderStatuses, type Order } from "@/data/admin/orders";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns: Column<Order>[] = [
    {
      key: "orderNumber",
      label: "Mã đơn",
      sortable: true,
      render: (order) => (
        <Link
          href={`/admin/orders/${order.id}`}
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          {order.orderNumber}
        </Link>
      ),
    },
    {
      key: "customerName",
      label: "Khách hàng",
      sortable: true,
      className: "text-left",
      render: (order) => (
        <div className="text-left">
          <p className="font-medium text-gray-900">{order.customerName}</p>
          <p className="text-xs text-gray-500">{order.customerPhone}</p>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Ngày đặt",
      sortable: true,
      render: (order) => (
        <span className="text-sm text-gray-600">
          {new Date(order.createdAt).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      key: "total",
      label: "Tổng tiền",
      sortable: true,
      render: (order) => (
        <span className="font-semibold text-gray-900">
          {formatPrice(order.total)}
        </span>
      ),
    },
    {
      key: "paymentMethod",
      label: "Phương thức thanh toán",
      render: (order) => (
        <span className="text-sm text-gray-900">
          {order.paymentMethod === "CASH" && "Tiền mặt"}
          {order.paymentMethod === "INTERNET_BANKING" && "Chuyển khoản"}
          {order.paymentMethod === "MOMO" && "MoMo"}
          {order.paymentMethod === "VNPAY" && "VNPay"}
        </span>
      ),
    },
    {
      key: "paymentStatus",
      label: "Trạng thái thanh toán",
      render: (order) => (
        <StatusBadge status={order.paymentStatus} variant="payment" />
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (order) => <StatusBadge status={order.status} variant="order" />,
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
              setSelectedOrder(order);
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
              setSelectedOrder(order);
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

  const handleCloseForm = () => {
    setIsFormModalOpen(false);
    setIsEditMode(false);
    setSelectedOrder(null);
  };

  const handleSubmitForm = (data: Partial<Order>) => {
    if (isEditMode && selectedOrder) {
      // Update existing order
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, ...data, updatedAt: new Date().toISOString() }
            : order,
        ),
      );
    } else {
      // Add new order
      const newOrder: Order = {
        id: Math.max(...orders.map((o) => o.id)) + 1,
        orderNumber: `ORD-${Math.max(...orders.map((o) => o.id)) + 1}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        timeline: [
          {
            status: data.status || "PENDING",
            description: "Đơn hàng đã được tạo",
            timestamp: new Date().toISOString(),
          },
        ],
      } as Order;
      setOrders([newOrder, ...orders]);
    }
    handleCloseForm();
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Quản lý đơn hàng
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Tổng {orders.length} đơn hàng
          </p>
        </div>
        <Button
          onClick={() => {
            setIsEditMode(false);
            setIsFormModalOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
          Tạo đơn hàng
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 rounded-lg bg-white p-4 shadow">
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">Tất cả trạng thái</option>
          {orderStatuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <span className="flex items-center text-sm text-gray-500">đến</span>
        <input
          type="date"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Button variant="outline">Xuất Excel</Button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={orders}
        keyExtractor={(order) => order.id}
        searchable
        itemsPerPage={10}
        emptyMessage="Không có đơn hàng nào"
      />

      {/* Order Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedOrder(null);
        }}
        title={`Chi tiết đơn hàng ${selectedOrder?.orderNumber}`}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                Thông tin khách hàng
              </h4>
              <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                <p>
                  <span className="font-medium">Tên:</span>{" "}
                  {selectedOrder.customerName}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedOrder.customerEmail}
                </p>
                <p>
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  {selectedOrder.customerPhone}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span>{" "}
                  {selectedOrder.shippingAddress}
                </p>
                {selectedOrder.note && (
                  <p>
                    <span className="font-medium">Ghi chú:</span>{" "}
                    {selectedOrder.note}
                  </p>
                )}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">Sản phẩm</h4>
              <div className="space-y-3">
                {selectedOrder.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border border-gray-200 p-3"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {product.productName}
                      </p>
                      <p className="text-sm text-gray-500">{product.variant}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        x{product.quantity}
                      </p>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(product.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                Thông tin thanh toán
              </h4>
              <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span>{formatPrice(selectedOrder.shippingFee)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span>-{formatPrice(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-300 pt-2 text-base font-semibold">
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                Lịch sử đơn hàng
              </h4>
              <div className="space-y-3">
                {selectedOrder.timeline.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      {index < selectedOrder.timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-gray-900">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal (Add/Edit) */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseForm}
        title={isEditMode ? "Sửa đơn hàng" : "Tạo đơn hàng mới"}
        size="xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseForm}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                const form = document.querySelector(
                  'form[data-form="order"]',
                ) as HTMLFormElement;
                if (form) form.requestSubmit();
              }}
            >
              {isEditMode ? "Cập nhật" : "Tạo đơn"}
            </Button>
          </div>
        }
      >
        <OrderForm
          order={isEditMode ? selectedOrder : null}
          onSubmit={handleSubmitForm}
        />
      </Modal>
    </div>
  );
}
