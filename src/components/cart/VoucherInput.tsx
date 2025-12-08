"use client";

import { useState, useEffect } from "react";
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
  customerAddress: externalCustomerAddress,
}: VoucherInputProps) {
  const [voucherCode, setVoucherCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Use external address if provided, otherwise use internal wallet address
  const customerAddress = externalCustomerAddress || walletAddress;

  // Check if MetaMask is installed
  const isMetaMaskInstalled =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  // LocalStorage key
  const WALLET_STORAGE_KEY = "connected_wallet_address";

  // Check for existing connection on mount (from localStorage or MetaMask)
  useEffect(() => {
    if (externalCustomerAddress) return;

    // First check localStorage
    const savedAddress = localStorage.getItem(WALLET_STORAGE_KEY);

    if (isMetaMaskInstalled) {
      window.ethereum
        ?.request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            const currentAccount = accounts[0].toLowerCase();
            // Verify saved address matches current MetaMask account
            if (savedAddress && savedAddress.toLowerCase() === currentAccount) {
              setWalletAddress(accounts[0]);
            } else if (accounts.length > 0) {
              // MetaMask has connected account, use it
              setWalletAddress(accounts[0]);
              localStorage.setItem(WALLET_STORAGE_KEY, accounts[0]);
            }
          } else if (savedAddress) {
            // No MetaMask account but have saved address - clear it
            localStorage.removeItem(WALLET_STORAGE_KEY);
          }
        })
        .catch(console.error);

      // Listen for account changes
      window.ethereum?.on?.("accountsChanged", (accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          localStorage.setItem(WALLET_STORAGE_KEY, accounts[0]);
        } else {
          setWalletAddress(null);
          localStorage.removeItem(WALLET_STORAGE_KEY);
        }
      });
    }
  }, [isMetaMaskInstalled, externalCustomerAddress]);

  // Connect wallet handler
  const handleConnectWallet = async () => {
    if (!isMetaMaskInstalled) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum!.request({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        localStorage.setItem(WALLET_STORAGE_KEY, accounts[0]);
        setError(null);
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError("Không thể kết nối ví. Vui lòng thử lại.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setError("Vui lòng nhập mã voucher");
      return;
    }

    if (!customerAddress) {
      // This shouldn't happen if UI is correct, but just in case
      setError("Vui lòng kết nối ví MetaMask để sử dụng voucher");
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
          {/* Show connect wallet button if not connected */}
          {!customerAddress ? (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
              <div className="flex items-center gap-2 text-orange-700">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-sm">Kết nối ví để sử dụng voucher</span>
              </div>
              <button
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className={cn(
                  "mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-2",
                  "bg-orange-500 text-white hover:bg-orange-600",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {isConnecting ? (
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
                  <>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21.8 9.1L12 2.4L2.2 9.1c-.2.1-.2.4 0 .6l3.3 2.4v6.5c0 .8.7 1.5 1.5 1.5h10c.8 0 1.5-.7 1.5-1.5v-6.5l3.3-2.4c.2-.2.2-.5 0-.6zM12 4.2l7.6 5.5-7.6 5.5-7.6-5.5L12 4.2z" />
                    </svg>
                    {isMetaMaskInstalled
                      ? "Kết nối MetaMask"
                      : "Cài đặt MetaMask"}
                  </>
                )}
              </button>
              {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            </div>
          ) : (
            <>
              {/* Wallet connected indicator */}
              <div className="flex items-center gap-2 text-xs text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Ví đã kết nối: {customerAddress.slice(0, 6)}...
                {customerAddress.slice(-4)}
              </div>

              {/* Voucher input */}
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
