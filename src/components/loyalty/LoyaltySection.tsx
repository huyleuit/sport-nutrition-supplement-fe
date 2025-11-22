"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Define data types
interface Transaction {
  id: string;
  type: "earn" | "redeem";
  amount: number;
  description: string;
  date: string;
}

interface Reward {
  id: string;
  title: string;
  points: number;
  description: string;
  image: string;
}

export function LoyaltySection() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "earn",
      amount: 500,
      description: "Mua hàng đơn #12345",
      date: "2024-11-15",
    },
    {
      id: "2",
      type: "earn",
      amount: 200,
      description: "Đánh giá sản phẩm",
      date: "2024-11-14",
    },
    {
      id: "3",
      type: "redeem",
      amount: -300,
      description: "Đổi voucher giảm giá 10%",
      date: "2024-11-13",
    },
  ]);

  const [rewards, _setRewards] = useState<Reward[]>([
    {
      id: "1",
      title: "Voucher giảm 10%",
      points: 500,
      description: "Áp dụng cho đơn hàng từ 500.000đ",
      image: "🎁",
    },
    {
      id: "2",
      title: "Voucher giảm 50.000đ",
      points: 1000,
      description: "Áp dụng cho đơn hàng từ 1.000.000đ",
      image: "🎉",
    },
    {
      id: "3",
      title: "Freeship toàn quốc",
      points: 300,
      description: "Miễn phí vận chuyển cho mọi đơn hàng",
      image: "🚚",
    },
    {
      id: "4",
      title: "Sản phẩm miễn phí",
      points: 2000,
      description: "Nhận 1 sản phẩm bất kỳ dưới 200.000đ",
      image: "🎊",
    },
  ]);

  // Check if MetaMask is installed
  const checkMetaMaskInstalled = () => {
    if (typeof window !== "undefined" && window.ethereum) {
      return true;
    }
    return false;
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!checkMetaMaskInstalled()) {
      alert(
        "MetaMask chưa được cài đặt! Vui lòng cài đặt MetaMask extension để tiếp tục.",
      );
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum!.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      // TODO: Get token balance from smart contract
      // Currently using mock data
      setBalance(1200);
    } catch (error: any) {
      console.error("Lỗi khi kết nối ví:", error);
      alert("Không thể kết nối với ví. Vui lòng thử lại!");
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setBalance(0);
  };

  // Listen for account change events
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
      }
    };
  }, []);

  // Format wallet address
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Redeem reward
  const handleRedeem = (reward: Reward) => {
    if (!account) {
      alert("Vui lòng kết nối ví trước khi đổi thưởng!");
      return;
    }

    if (balance < reward.points) {
      alert("Số điểm của bạn không đủ để đổi phần thưởng này!");
      return;
    }

    // TODO: Call smart contract to process reward redemption
    const confirmRedeem = window.confirm(
      `Bạn có chắc muốn đổi ${reward.points} điểm để nhận "${reward.title}"?`,
    );

    if (confirmRedeem) {
      setBalance(balance - reward.points);
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "redeem",
        amount: -reward.points,
        description: `Đổi ${reward.title}`,
        date: new Date().toISOString().split("T")[0],
      };
      setTransactions([newTransaction, ...transactions]);
      alert("Đổi thưởng thành công!");
    }
  };

  return (
    <div className={cn("w-full space-y-6")}>
      {/* Header Section - Wallet Information */}
      <div
        className={cn(
          "relative overflow-hidden rounded-[0.625em] p-[1.5em]",
          "bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700",
        )}
      >
        <div className={cn("relative z-10")}>
          <h2 className={cn("mb-[0.5em] text-[1.5em] font-bold text-white")}>
            Ví Điện Tử & Điểm Thưởng
          </h2>

          {!account ? (
            <div className={cn("space-y-4")}>
              <p className={cn("text-[0.9em] text-white/90")}>
                Kết nối ví MetaMask để bắt đầu tích điểm và đổi thưởng
              </p>
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className={cn(
                  "bg-white text-blue-600 hover:bg-gray-100",
                  "text-[0.875em] font-semibold",
                )}
              >
                {isConnecting ? (
                  <span className={cn("flex items-center gap-2")}>
                    <svg
                      className={cn("h-[1.25em] w-[1.25em] animate-spin")}
                      xmlns="http://www.w3.org/2000/svg"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang kết nối...
                  </span>
                ) : (
                  <span className={cn("flex items-center gap-2")}>
                    <svg
                      className={cn("h-[1.25em] w-[1.25em]")}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3.483 9.394L12 4.567l8.517 4.827-1.317 2.276L12 7.637l-7.2 4.033z" />
                      <path d="M12 13.547l-8.517-4.827L2.166 11L12 16.433 21.834 11l-1.317-2.28z" />
                      <path d="M12 16.433l-8.517-4.827L2.166 13.88 12 19.313l9.834-5.433-1.317-2.28z" />
                    </svg>
                    Kết nối MetaMask
                  </span>
                )}
              </Button>
            </div>
          ) : (
            <div className={cn("space-y-4")}>
              <div
                className={cn(
                  "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
                )}
              >
                <div>
                  <p className={cn("text-[0.8em] text-white/80")}>Địa chỉ ví</p>
                  <p
                    className={cn(
                      "font-mono text-[1em] font-semibold text-white",
                    )}
                  >
                    {formatAddress(account)}
                  </p>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className={cn(
                    "border-white/30 bg-white/10 text-white hover:bg-white/20",
                    "text-[0.875em]",
                  )}
                >
                  Ngắt kết nối
                </Button>
              </div>

              <div
                className={cn(
                  "rounded-[0.5em] bg-white/10 p-[1.25em] backdrop-blur-sm",
                )}
              >
                <p className={cn("text-[0.8em] text-white/80")}>
                  Số điểm hiện có
                </p>
                <p
                  className={cn(
                    "text-[2.5em] font-bold text-white",
                    "flex items-center gap-2",
                  )}
                >
                  {balance.toLocaleString()}
                  <span className={cn("text-[0.4em] text-white/80")}>điểm</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div
          className={cn(
            "absolute -right-[2em] -top-[2em] h-[8em] w-[8em]",
            "rounded-full bg-white/10 blur-3xl",
          )}
        />
        <div
          className={cn(
            "absolute -bottom-[3em] -left-[3em] h-[10em] w-[10em]",
            "rounded-full bg-white/10 blur-3xl",
          )}
        />
      </div>

      {/* Available Rewards */}
      <div className={cn("rounded-[0.625em] bg-white p-[1.5em]")}>
        <h3 className={cn("mb-[1em] text-[1.25em] font-bold text-gray-800")}>
          Phần thưởng có thể đổi
        </h3>
        <div className={cn("grid gap-4 md:grid-cols-2")}>
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={cn(
                "rounded-[0.5em] border border-gray-200 p-[1em]",
                "transition-all hover:shadow-md",
              )}
            >
              <div className={cn("flex items-start gap-3")}>
                <div
                  className={cn(
                    "flex h-[3em] w-[3em] items-center justify-center",
                    "rounded-[0.5em] bg-gradient-to-br from-purple-100 to-blue-100",
                    "text-[1.5em]",
                  )}
                >
                  {reward.image}
                </div>
                <div className={cn("flex-1")}>
                  <h4 className={cn("text-[1em] font-semibold text-gray-800")}>
                    {reward.title}
                  </h4>
                  <p className={cn("mt-[0.25em] text-[0.85em] text-gray-600")}>
                    {reward.description}
                  </p>
                  <div
                    className={cn(
                      "mt-[0.75em] flex items-center justify-between",
                    )}
                  >
                    <span
                      className={cn("text-[0.9em] font-bold text-purple-600")}
                    >
                      {reward.points.toLocaleString()} điểm
                    </span>
                    <Button
                      onClick={() => handleRedeem(reward)}
                      disabled={!account || balance < reward.points}
                      size="sm"
                      className={cn(
                        "bg-gradient-to-r from-purple-600 to-blue-600",
                        "text-[0.8em] font-semibold",
                        "disabled:from-gray-300 disabled:to-gray-400",
                      )}
                    >
                      Đổi ngay
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className={cn("rounded-[0.625em] bg-white p-[1.5em]")}>
        <h3 className={cn("mb-[1em] text-[1.25em] font-bold text-gray-800")}>
          Lịch sử giao dịch
        </h3>
        {transactions.length === 0 ? (
          <p className={cn("text-center text-[0.9em] text-gray-500")}>
            Chưa có giao dịch nào
          </p>
        ) : (
          <div className={cn("space-y-3")}>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={cn(
                  "flex items-center justify-between",
                  "rounded-[0.5em] border border-gray-200 p-[1em]",
                  "transition-all hover:bg-gray-50",
                )}
              >
                <div className={cn("flex items-center gap-3")}>
                  <div
                    className={cn(
                      "flex h-[2.5em] w-[2.5em] items-center justify-center",
                      "rounded-full",
                      transaction.type === "earn"
                        ? "bg-green-100"
                        : "bg-red-100",
                    )}
                  >
                    {transaction.type === "earn" ? (
                      <svg
                        className={cn("h-[1.25em] w-[1.25em] text-green-600")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    ) : (
                      <svg
                        className={cn("h-[1.25em] w-[1.25em] text-red-600")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={cn("text-[0.9em] font-medium text-gray-800")}>
                      {transaction.description}
                    </p>
                    <p className={cn("text-[0.8em] text-gray-500")}>
                      {new Date(transaction.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "text-[1em] font-bold",
                    transaction.type === "earn"
                      ? "text-green-600"
                      : "text-red-600",
                  )}
                >
                  {transaction.type === "earn" ? "+" : ""}
                  {transaction.amount.toLocaleString()} điểm
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Guide */}
      <div
        className={cn(
          "rounded-[0.625em] border border-blue-200 bg-blue-50 p-[1.5em]",
        )}
      >
        <h3
          className={cn(
            "mb-[1em] flex items-center gap-2 text-[1.1em] font-bold text-blue-800",
          )}
        >
          <svg
            className={cn("h-[1.25em] w-[1.25em]")}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Hướng dẫn sử dụng
        </h3>
        <ul className={cn("space-y-2 text-[0.9em] text-blue-900")}>
          <li className={cn("flex gap-2")}>
            <span>1.</span>
            <span>Cài đặt ví MetaMask nếu chưa có (truy cập metamask.io)</span>
          </li>
          <li className={cn("flex gap-2")}>
            <span>2.</span>
            <span>Nhấn nút "Kết nối MetaMask" và cho phép kết nối</span>
          </li>
          <li className={cn("flex gap-2")}>
            <span>3.</span>
            <span>
              Tích điểm bằng cách mua hàng, đánh giá sản phẩm, giới thiệu bạn bè
            </span>
          </li>
          <li className={cn("flex gap-2")}>
            <span>4.</span>
            <span>Sử dụng điểm để đổi các phần thưởng hấp dẫn</span>
          </li>
          <li className={cn("flex gap-2")}>
            <span>5.</span>
            <span>
              Theo dõi lịch sử giao dịch để quản lý điểm thưởng của bạn
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
