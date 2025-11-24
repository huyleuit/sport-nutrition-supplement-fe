"use client";
import React, { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class Web3ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Web3 Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const errorMessage =
        this.state.error?.message || "Đã xảy ra lỗi khi tương tác với Web3";

      return (
        <div
          className={cn(
            "rounded-[0.625em] border border-red-200 bg-red-50 p-[1.5em]",
          )}
        >
          <div className={cn("mb-4 flex items-center gap-2")}>
            <svg
              className={cn("h-[1.5em] w-[1.5em] text-red-600")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3
              className={cn("text-[1.1em] font-bold text-red-800")}
            >
              Lỗi Web3
            </h3>
          </div>
          <p className={cn("mb-4 text-[0.9em] text-red-700")}>
            {errorMessage}
          </p>
          <div className={cn("space-y-2 text-[0.85em] text-red-600")}>
            <p>Vui lòng thử:</p>
            <ul className={cn("ml-4 list-disc space-y-1")}>
              <li>Kiểm tra kết nối mạng của bạn</li>
              <li>Đảm bảo bạn đã kết nối với Sepolia testnet</li>
              <li>Kiểm tra MetaMask extension đã được cài đặt</li>
              <li>Làm mới trang và thử lại</li>
            </ul>
          </div>
          <Button
            onClick={this.handleReset}
            className={cn(
              "mt-4 bg-red-600 text-white hover:bg-red-700",
              "text-[0.875em]",
            )}
          >
            Thử lại
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

