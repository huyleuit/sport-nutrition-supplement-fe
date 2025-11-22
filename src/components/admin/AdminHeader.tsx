"use client";

import { faBell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Search (placeholder) */}
      <div className="max-w-md flex-1">
        <input
          type="search"
          placeholder="Tìm kiếm..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer flex-col items-start gap-1 py-3">
                <p className="text-sm font-medium">Đơn hàng mới #1234</p>
                <p className="text-xs text-gray-500">5 phút trước</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex-col items-start gap-1 py-3">
                <p className="text-sm font-medium">
                  Sản phẩm Whey Protein sắp hết hàng
                </p>
                <p className="text-xs text-gray-500">1 giờ trước</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex-col items-start gap-1 py-3">
                <p className="text-sm font-medium">Khách hàng mới đăng ký</p>
                <p className="text-xs text-gray-500">2 giờ trước</p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xs font-semibold text-blue-600">AD</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Thông tin cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Đổi mật khẩu
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
