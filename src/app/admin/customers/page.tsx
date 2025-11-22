"use client";

import { useState } from "react";
import { DataTable, Column } from "@/components/admin/shared/DataTable";
import { Modal } from "@/components/admin/shared/Modal";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { CustomerForm } from "@/components/admin/forms/CustomerForm";
import { Button } from "@/components/ui/button";
import { mockCustomers, type Customer } from "@/data/admin/customers";
import { formatPrice } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faPlus,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const columns: Column<Customer>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "name",
      label: "Khách hàng",
      sortable: true,
      className: "text-left",
      render: (customer) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <span className="text-sm font-semibold text-blue-600">
              {customer.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900">{customer.name}</p>
            <p className="text-xs text-gray-500">{customer.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Số điện thoại",
      sortable: true,
    },
    {
      key: "totalOrders",
      label: "Tổng đơn",
      sortable: true,
      render: (customer) => (
        <span className="font-semibold text-gray-900">
          {customer.totalOrders}
        </span>
      ),
    },
    {
      key: "totalSpent",
      label: "Tổng chi tiêu",
      sortable: true,
      render: (customer) => (
        <span className="font-semibold text-gray-900">
          {formatPrice(customer.totalSpent)}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Ngày đăng ký",
      sortable: true,
      render: (customer) => (
        <span className="text-sm text-gray-600">
          {new Date(customer.createdAt).toLocaleDateString("vi-VN")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (customer) => <StatusBadge status={customer.status} />,
    },
    {
      key: "actions",
      label: "Hành động",
      render: (customer) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCustomer(customer);
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
              setSelectedCustomer(customer);
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
    setSelectedCustomer(null);
  };

  const handleSubmitForm = (data: Partial<Customer>) => {
    if (isEditMode && selectedCustomer) {
      // Update existing customer
      setCustomers(
        customers.map((customer) =>
          customer.id === selectedCustomer.id
            ? { ...customer, ...data }
            : customer,
        ),
      );
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Math.max(...customers.map((c) => c.id)) + 1,
        ...data,
        avatar: null,
        totalOrders: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString(),
        lastOrderAt: "",
      } as Customer;
      setCustomers([newCustomer, ...customers]);
    }
    handleCloseForm();
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Quản lý khách hàng
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Tổng {customers.length} khách hàng
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Xuất Excel</Button>
          <Button
            onClick={() => {
              setIsEditMode(false);
              setIsFormModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2 h-4 w-4" />
            Thêm khách hàng
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-600">Tổng khách hàng</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {customers.length}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-600">
            Khách hàng mới (tháng)
          </p>
          <p className="mt-2 text-3xl font-bold text-green-600">12</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-600">
            Tổng doanh thu (tất cả)
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {formatPrice(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm font-medium text-gray-600">TB chi tiêu/khách</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {formatPrice(
              customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                customers.length,
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 rounded-lg bg-white p-4 shadow">
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">Tất cả trạng thái</option>
          <option value="ACTIVE">Hoạt động</option>
          <option value="INACTIVE">Không hoạt động</option>
        </select>
        <select className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option value="">Sắp xếp theo</option>
          <option value="totalSpent">Chi tiêu nhiều nhất</option>
          <option value="totalOrders">Số đơn hàng</option>
          <option value="createdAt">Mới nhất</option>
        </select>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={customers}
        keyExtractor={(customer) => customer.id}
        searchable
        itemsPerPage={10}
        emptyMessage="Không có khách hàng nào"
      />

      {/* Customer Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedCustomer(null);
        }}
        title="Chi tiết khách hàng"
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <span className="text-2xl font-bold text-blue-600">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedCustomer.name}
                </h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-4 w-4 text-gray-400"
                    />
                    {selectedCustomer.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="h-4 w-4 text-gray-400"
                    />
                    {selectedCustomer.phone}
                  </p>
                </div>
                <div className="mt-3">
                  <StatusBadge status={selectedCustomer.status} />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {selectedCustomer.totalOrders}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Tổng chi tiêu</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {formatPrice(selectedCustomer.totalSpent)}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">TB/Đơn hàng</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {formatPrice(
                    selectedCustomer.totalSpent / selectedCustomer.totalOrders,
                  )}
                </p>
              </div>
            </div>

            {/* Addresses */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-gray-400"
                />
                Địa chỉ giao hàng
              </h4>
              <div className="space-y-3">
                {selectedCustomer.addresses.map((address) => (
                  <div
                    key={address.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                            Mặc định
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {address.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="mb-3 font-semibold text-gray-900">
                Thông tin tài khoản
              </h4>
              <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày đăng ký:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedCustomer.createdAt).toLocaleDateString(
                      "vi-VN",
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đơn hàng cuối:</span>
                  <span className="font-medium text-gray-900">
                    {selectedCustomer.lastOrderAt
                      ? new Date(
                          selectedCustomer.lastOrderAt,
                        ).toLocaleDateString("vi-VN")
                      : "Chưa có"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Form Modal (Add/Edit) */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseForm}
        title={isEditMode ? "Sửa khách hàng" : "Thêm khách hàng mới"}
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCloseForm}>
              Hủy
            </Button>
            <Button
              onClick={() => {
                const form = document.querySelector(
                  'form[data-form="customer"]',
                ) as HTMLFormElement;
                if (form) form.requestSubmit();
              }}
            >
              {isEditMode ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        }
      >
        <CustomerForm
          customer={isEditMode ? selectedCustomer : null}
          onSubmit={handleSubmitForm}
        />
      </Modal>
    </div>
  );
}
