"use client";

import { StatsCards } from "@/components/admin/dashboard/StatsCards";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { TopProducts } from "@/components/admin/dashboard/TopProducts";
import { OrderStatusChart } from "@/components/admin/dashboard/OrderStatusChart";
import { PaymentsList } from "@/components/admin/dashboard/PaymentsList";

export default function AdminDashboardPage() {
  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Tổng quan về hoạt động kinh doanh
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid w-full gap-6 lg:grid-cols-2">
        <RevenueChart />
        <OrderStatusChart />
      </div>

      {/* Tables Row */}
      <div className="grid w-full gap-6 lg:grid-cols-2">
        <RecentOrders />
        <TopProducts />
      </div>

      {/* Payments Section */}
      <div className="w-full">
        <PaymentsList />
      </div>
    </div>
  );
}
