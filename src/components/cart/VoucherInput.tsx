"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { verifyVoucher, type VerifyVoucherResponse } from "@/lib/loyaltyApi";

export interface AppliedVoucher {
  voucherCode: string;
  rewardId: number;
  rewardName?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

interface VoucherInputProps {
  onVoucherApplied: (voucher: AppliedVoucher | null) => void;
  appliedVoucher: AppliedVoucher | null;
  customerAddress?: string;
}

export function VoucherInput({
  onVoucherApplied,
  appliedVoucher,
  customerAddress,
}: VoucherInputProps) {
  const [voucherCode, setVoucherCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setError("Vui lòng nhập mã voucher");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const result = await verifyVoucher(voucherCode.trim(), customerAddress);

      if (!result.success || !result.data) {
        setError(result.error || "Không thể xác thực voucher");
        return;
      }

      const voucherData: VerifyVoucherResponse = result.data;

      if (!voucherData.valid) {
        setError(voucherData.invalidReason || "Mã voucher không hợp lệ");
        return;
      }

      if (voucherData.redeemed) {
        setError("Mã voucher đã được sử dụng");
        return;
      }

      // Parse discount from reward metadata
      // Default: 10% discount if no metadata
      const appliedVoucher: AppliedVoucher = {
        voucherCode: voucherData.voucherCode,
        rewardId: voucherData.rewardId,
        rewardName:
          voucherData.rewardName || `Voucher #${voucherData.rewardId}`,
        discountType:
          voucherData.discountType === "fixed" ? "fixed" : "percentage",
        discountValue: voucherData.discountValue || 10,
      };

      onVoucherApplied(appliedVoucher);
      setVoucherCode("");
      setIsExpanded(false);
    } catch (err) {
      console.error("Error applying voucher:", err);
      setError("Đã xảy ra lỗi khi áp dụng voucher");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRemoveVoucher = () => {
    onVoucherApplied(null);
    setError(null);
  };

  // If voucher is already applied, show applied state
  if (appliedVoucher) {
    return (
      <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <span className="font-medium text-green-700">
                {appliedVoucher.voucherCode}
              </span>
              <p className="text-xs text-green-600">
                {appliedVoucher.rewardName} -{" "}
                {appliedVoucher.discountType === "percentage"
                  ? `Giảm ${appliedVoucher.discountValue}%`
                  : `Giảm ${appliedVoucher.discountValue.toLocaleString()}đ`}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveVoucher}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full cursor-pointer flex-row justify-between rounded-[0.625rem] bg-[#007AFF]/20 py-2 pl-3 pr-2",
        )}
      >
        <span className="text-[0.9375rem] text-[#1250DC]">
          🎁 Nhập mã voucher
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#1250DC"
          className={cn(
            "h-6 w-6 transition-transform",
            isExpanded && "rotate-90",
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Expanded input */}
      {isExpanded && (
        <div className="mt-2 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => {
                setVoucherCode(e.target.value.toUpperCase());
                setError(null);
              }}
              placeholder="Nhập mã voucher..."
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-sm",
                error ? "border-red-300" : "border-gray-300",
              )}
              disabled={isVerifying}
            />
            <button
              onClick={handleApplyVoucher}
              disabled={isVerifying || !voucherCode.trim()}
              className={cn(
                "rounded-lg bg-[#1250DC] px-4 py-2 text-sm font-medium text-white",
                "hover:bg-[#0d3eb3] disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {isVerifying ? (
                <svg
                  className="h-5 w-5 animate-spin"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                "Áp dụng"
              )}
            </button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <p className="text-xs text-gray-500">
            Mã voucher từ chương trình Khách hàng thân thiết
          </p>
        </div>
      )}
    </div>
  );
}
