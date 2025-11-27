"use client";

import cartApiRequests from "@/apiRequests/cart";
import { OrderHistoryType } from "@/types/order-history";
import { handleErrorApi } from "@/lib/utils";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AdminContextType = {
  orders: OrderHistoryType[];
  isLoading: boolean;
  refreshOrders: () => Promise<void>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderHistoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const result = await cartApiRequests.getAllOrdersAdmin();
      setOrders(result.payload);
    } catch (error) {
      handleErrorApi({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        orders,
        isLoading,
        refreshOrders: fetchOrders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

