"use client";

import { cn } from "@/lib/utils";
import {
  faChartLine,
  faShoppingCart,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: faChartLine,
  },
  {
    name: "Đơn hàng",
    href: "/admin/orders",
    icon: faShoppingCart,
  },
  {
    name: "Rewards",
    href: "/admin/rewards",
    icon: faGift,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900">Admin Panel</span>
          <span className="text-xs text-gray-500">Sport Nutrition</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <span className="text-sm font-semibold text-blue-600">AD</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-gray-900">
              Admin User
            </p>
            <p className="truncate text-xs text-gray-500">
              admin@4hprotein.store
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
