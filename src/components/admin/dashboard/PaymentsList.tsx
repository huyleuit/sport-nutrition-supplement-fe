"use client";

import paymentApiRequests from "@/apiRequests/payment";
import { cn, handleErrorApi } from "@/lib/utils";
import { PaymentType } from "@/types/payment";
import { useEffect, useState } from "react";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  SUCCESS: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  CANCELLED: "bg-gray-100 text-gray-800",
};

const methodLabels: Record<string, string> = {
  VN_PAY: "VNPay",
  INTERNET_BANKING: "Internet Banking",
  COD: "Thanh toán khi nhận hàng",
};

export function PaymentsList() {
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const response = await paymentApiRequests.getAllPayments();
        setPayments(response.payload);
      } catch (error) {
        handleErrorApi({ error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: "Đang chờ",
      SUCCESS: "Thành công",
      FAILED: "Thất bại",
      CANCELLED: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Thanh toán gần đây
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {isLoading ? "Đang tải..." : `${payments.length} giao dịch`}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : payments.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-500">Chưa có giao dịch nào</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Mã giao dịch
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Phương thức
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ngày tạo
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-3 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      #{payment.id}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <p className="text-sm text-gray-900">
                      {methodLabels[payment.method] || payment.method}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <p className="text-sm text-gray-500">
                      {formatDate(payment.createdDate)}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    <div className="flex justify-center">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                          statusColors[
                            payment.status as keyof typeof statusColors
                          ] || "bg-gray-100 text-gray-800",
                        )}
                      >
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
