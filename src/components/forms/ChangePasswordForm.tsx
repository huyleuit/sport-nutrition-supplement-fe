"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ChangePasswordForm() {
  return (
    <form action={() => console.log("Submit")} className="space-y-4">
      <div className="relative">
        <Label htmlFor="currentPassword">
          Mật khẩu hiện tại <span className="text-red-600">*</span>
        </Label>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="Mật khẩu hiện tại"
          className={cn(
            "!h-auto !rounded-none border border-solid border-app-carbon px-3 py-2 pr-[2.625rem] text-base font-normal focus:outline-none",
          )}
        />
      </div>

      <div className="relative">
        <Label htmlFor="newPassword">
          Mật khẩu mới <span className="text-red-600">*</span>
        </Label>
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Mật khẩu mới"
          className={cn(
            "!h-auto !rounded-none border border-solid border-app-carbon px-3 py-2 pr-[2.625rem] text-base font-normal focus:outline-none",
          )}
        />
      </div>
      <div className="relative">
        <Label htmlFor="confirmPassword">
          Nhập lại mật khẩu <span className="text-red-600">*</span>
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
          className={cn(
            "!h-auto !rounded-none border border-solid border-app-carbon px-3 py-2 pr-[2.625rem] text-base font-normal focus:outline-none",
          )}
        />
      </div>
      <Button
        type="submit"
        className="h-auto w-full rounded-none border-[2px] border-solid border-[#1250DC] bg-[#1250DC] py-3 text-base font-bold text-white transition-all duration-200 hover:bg-[#1250DC]/[0.9]"
      >
        Xác nhận
      </Button>
    </form>
  );
}
