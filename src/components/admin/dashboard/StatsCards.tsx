"use client";

import { cn } from "@/lib/utils";
import {
  faBox,
  faUsers,
  faShoppingCart,
  faDollarSign,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stats as statsData } from "@/data/admin/stats";

const iconMap = {
  faBox,
  faUsers,
  faShoppingCart,
  faDollarSign,
};

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <div
          key={stat.name}
          className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={
                      stat.changeType === "increase" ? faArrowUp : faArrowDown
                    }
                    className={cn(
                      "h-3 w-3",
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600",
                    )}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full",
                  stat.bgColor,
                )}
              >
                <FontAwesomeIcon
                  icon={iconMap[stat.icon as keyof typeof iconMap]}
                  className="h-7 w-7 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
