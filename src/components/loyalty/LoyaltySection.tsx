"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import {
  getTokenBalance,
  isCorrectNetwork,
  switchToSepolia,
  redeemReward,
  getTransactionHistory,
  clearBalanceCache,
  getAllRewards,
  type RewardWithIPFS,
} from "@/lib/web3";
import {
  registerCustomer,
  isCustomerRegistered,
  issueCertificate,
  checkHealth,
} from "@/lib/loyaltyApi";
import { Web3ErrorBoundary } from "./Web3ErrorBoundary";
import { CertificatesSection } from "./CertificatesSection";
import { IPFSUploader } from "./IPFSUploader";

// Define data types
interface Transaction {
  id: string;
  type: "earn" | "redeem";
  amount: number;
  description: string;
  date: string;
  txHash?: string;
  blockNumber?: number;
}

// Fallback rewards khi chưa load được từ blockchain
const FALLBACK_REWARDS: RewardWithIPFS[] = [
  {
    id: 1,
    cost: 100,
    metadata: {
      name: "Voucher giảm 10%",
      description: "Áp dụng cho đơn hàng từ 500.000đ",
      category: "discount",
      value_vnd: 50000,
    },
    imageUrl: "",
    metadataCID: "",
    imageCID: "",
  },
];

export function LoyaltySection() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [lastCertificate, setLastCertificate] = useState<string | null>(null);
  const [rewards, setRewards] = useState<RewardWithIPFS[]>(FALLBACK_REWARDS);
  const [isLoadingRewards, setIsLoadingRewards] = useState(false);

  // Load rewards from blockchain
  const loadRewardsFromBlockchain = useCallback(async () => {
    if (!window.ethereum) return;

    setIsLoadingRewards(true);
    try {
      const blockchainRewards = await getAllRewards(10);
      if (blockchainRewards.length > 0) {
        setRewards(blockchainRewards);
        console.log("Loaded rewards from blockchain:", blockchainRewards);
      } else {
        console.log("No rewards found on blockchain, using fallback");
      }
    } catch (error) {
      console.error("Error loading rewards from blockchain:", error);
    } finally {
      setIsLoadingRewards(false);
    }
  }, []);

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
      const userAccount = accounts[0];
      setAccount(userAccount);

      // Check if connected to correct network (Sepolia)
      const isCorrect = await isCorrectNetwork();
      if (!isCorrect) {
        const shouldSwitch = window.confirm(
          "Bạn cần chuyển sang mạng Sepolia testnet để sử dụng tính năng này. Bạn có muốn chuyển đổi không?",
        );
        if (shouldSwitch) {
          await switchToSepolia();
        } else {
          setAccount(null);
          return;
        }
      }

      // Check backend connection and register customer if needed
      try {
        const healthResult = await checkHealth();
        if (healthResult.success) {
          setBackendConnected(true);

          // Check if customer is already registered
          const registered = await isCustomerRegistered(userAccount);
          setIsRegistered(registered);

          // If not registered, register the customer via backend API
          if (!registered) {
            console.log("Đang đăng ký customer vào hệ thống loyalty...");
            const registerResult = await registerCustomer(userAccount);
            if (registerResult.success) {
              setIsRegistered(true);
              console.log(
                "Đăng ký thành công:",
                registerResult.data?.transactionHash,
              );
            } else {
              console.warn("Không thể đăng ký customer:", registerResult.error);
            }
          }
        } else {
          console.warn(
            "Backend không khả dụng, sử dụng chế độ direct blockchain",
          );
          setBackendConnected(false);
        }
      } catch (backendError) {
        console.warn("Không thể kết nối backend:", backendError);
        setBackendConnected(false);
      }

      // Get token balance from smart contract
      setIsLoadingBalance(true);
      try {
        const tokenBalance = await getTokenBalance(userAccount, true);
        setBalance(tokenBalance);
      } catch (balanceError: any) {
        console.error("Lỗi khi lấy số dư token:", balanceError);
        // Set balance to 0 if there's an error (user might not have tokens)
        setBalance(0);
        // Only show alert if it's not a network error (already handled above)
        if (!balanceError.message?.includes("network")) {
          alert(
            "Không thể lấy số dư token. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.",
          );
        }
      } finally {
        setIsLoadingBalance(false);
      }
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
    setTransactions([]);
    clearBalanceCache();
  };

  // Load transaction history from blockchain
  const loadTransactionHistory = async (userAccount: string) => {
    setIsLoadingHistory(true);
    try {
      const history = await getTransactionHistory(userAccount);
      const formattedHistory: Transaction[] = history.map((tx) => ({
        id: tx.txHash,
        type: tx.type,
        amount: tx.amount,
        description: tx.description,
        date: tx.date,
        txHash: tx.txHash,
        blockNumber: tx.blockNumber,
      }));
      setTransactions(formattedHistory);
    } catch (error) {
      console.error("Error loading transaction history:", error);
      // Don't show error to user, just log it
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Listen for account change events and refresh balance
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
          const newAccount = accounts[0];
          setAccount(newAccount);
          // Refresh balance when account changes
          setIsLoadingBalance(true);
          try {
            const tokenBalance = await getTokenBalance(newAccount, true);
            setBalance(tokenBalance);
            // Load transaction history
            await loadTransactionHistory(newAccount);
          } catch (error) {
            console.error("Error refreshing balance:", error);
            setBalance(0);
          } finally {
            setIsLoadingBalance(false);
          }
        } else {
          disconnectWallet();
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Also listen for chain changes to refresh balance
      const handleChainChanged = async () => {
        if (account) {
          setIsLoadingBalance(true);
          try {
            const isCorrect = await isCorrectNetwork();
            if (isCorrect) {
              const tokenBalance = await getTokenBalance(account, true);
              setBalance(tokenBalance);
              // Reload transaction history
              await loadTransactionHistory(account);
            } else {
              setBalance(0);
            }
          } catch (error) {
            console.error("Error refreshing balance on chain change:", error);
          } finally {
            setIsLoadingBalance(false);
          }
        }
      };

      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (typeof window !== "undefined" && window.ethereum) {
          window.ethereum.removeAllListeners("accountsChanged");
          window.ethereum.removeAllListeners("chainChanged");
        }
      };
    }
  }, [account]);

  // Load transaction history when account is connected
  useEffect(() => {
    if (account) {
      loadTransactionHistory(account);
    }
  }, [account]);

  // Load rewards from blockchain when MetaMask is available
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      loadRewardsFromBlockchain();
    }
  }, [loadRewardsFromBlockchain]);

  // Format wallet address
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Redeem reward - Updated to use RewardWithIPFS
  const handleRedeem = async (reward: RewardWithIPFS) => {
    if (!account) {
      alert("Vui lòng kết nối ví trước khi đổi thưởng!");
      return;
    }

    const rewardName = reward.metadata?.name || `Reward #${reward.id}`;

    if (balance < reward.cost) {
      alert("Số điểm của bạn không đủ để đổi phần thưởng này!");
      return;
    }

    const confirmRedeem = window.confirm(
      `Bạn có chắc muốn đổi ${reward.cost} điểm để nhận "${rewardName}"?`,
    );

    if (!confirmRedeem) {
      return;
    }

    setIsRedeeming(String(reward.id));
    try {
      // Check network first
      const isCorrect = await isCorrectNetwork();
      if (!isCorrect) {
        const shouldSwitch = window.confirm(
          "Bạn cần chuyển sang mạng Sepolia testnet để đổi thưởng. Bạn có muốn chuyển đổi không?",
        );
        if (shouldSwitch) {
          await switchToSepolia();
        } else {
          setIsRedeeming(null);
          return;
        }
      }

      // Call smart contract to redeem reward
      const rewardId = reward.id;
      const txHash = await redeemReward(rewardId);

      // Issue certificate via backend API (stores on blockchain + IPFS)
      try {
        const certResult = await issueCertificate(
          account,
          rewardId,
          rewardName,
          txHash,
        );
        if (certResult.success && certResult.data) {
          setLastCertificate(certResult.data.voucherCode);
          console.log("Certificate issued:", certResult.data);
        } else {
          console.warn("Could not issue certificate:", certResult.error);
        }
      } catch (certError) {
        console.warn("Error issuing certificate:", certError);
      }

      // Refresh balance after successful redemption
      setIsLoadingBalance(true);
      try {
        const newBalance = await getTokenBalance(account, true);
        setBalance(newBalance);
      } catch (error) {
        console.error("Error refreshing balance:", error);
      } finally {
        setIsLoadingBalance(false);
      }

      // Reload transaction history
      await loadTransactionHistory(account);

      alert(
        `Đổi thưởng thành công! Transaction hash: ${txHash.substring(0, 10)}...${lastCertificate ? `\nMã voucher: ${lastCertificate}` : ""}`,
      );
    } catch (error: any) {
      console.error("Error redeeming reward:", error);
      let errorMessage = "Không thể đổi thưởng. Vui lòng thử lại!";
      if (error.message?.includes("rejected")) {
        errorMessage = "Giao dịch đã bị hủy bởi người dùng.";
      } else if (error.message?.includes("Insufficient")) {
        errorMessage = "Số điểm không đủ để đổi phần thưởng này!";
      } else if (error.message) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    } finally {
      setIsRedeeming(null);
    }
  };

  return (
    <Web3ErrorBoundary>
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
                    <p className={cn("text-[0.8em] text-white/80")}>
                      Địa chỉ ví
                    </p>
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
                  {isLoadingBalance ? (
                    <div className={cn("flex items-center gap-2")}>
                      <svg
                        className={cn(
                          "h-[1.5em] w-[1.5em] animate-spin text-white",
                        )}
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
                      <span className={cn("text-[1em] text-white/80")}>
                        Đang tải...
                      </span>
                    </div>
                  ) : (
                    <p
                      className={cn(
                        "text-[2.5em] font-bold text-white",
                        "flex items-center gap-2",
                      )}
                    >
                      {balance.toLocaleString()}
                      <span className={cn("text-[0.4em] text-white/80")}>
                        điểm
                      </span>
                    </p>
                  )}
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

        {/* Available Rewards - Loaded from Blockchain */}
        <div className={cn("rounded-[0.625em] bg-white p-[1.5em]")}>
          <div className={cn("mb-[1em] flex items-center justify-between")}>
            <h3 className={cn("text-[1.25em] font-bold text-gray-800")}>
              Phần thưởng có thể đổi
            </h3>
            {isLoadingRewards && (
              <span className={cn("text-[0.8em] text-gray-500")}>
                Đang tải từ blockchain...
              </span>
            )}
          </div>
          <div className={cn("grid gap-4 md:grid-cols-2")}>
            {rewards.map((reward) => {
              const rewardName =
                reward.metadata?.name || `Reward #${reward.id}`;
              const rewardDesc =
                reward.metadata?.description || "Phần thưởng từ blockchain";
              const rewardIcon = reward.imageUrl ? null : "🎁";

              return (
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
                        "flex h-[3em] w-[3em] items-center justify-center overflow-hidden",
                        "rounded-[0.5em] bg-gradient-to-br from-purple-100 to-blue-100",
                        "text-[1.5em]",
                      )}
                    >
                      {reward.imageUrl ? (
                        <img
                          src={reward.imageUrl}
                          alt={rewardName}
                          className={cn("h-full w-full object-cover")}
                        />
                      ) : (
                        rewardIcon
                      )}
                    </div>
                    <div className={cn("flex-1")}>
                      <h4
                        className={cn("text-[1em] font-semibold text-gray-800")}
                      >
                        {rewardName}
                      </h4>
                      <p
                        className={cn(
                          "mt-[0.25em] text-[0.85em] text-gray-600",
                        )}
                      >
                        {rewardDesc}
                      </p>
                      {reward.metadataCID && (
                        <p
                          className={cn(
                            "mt-[0.25em] text-[0.7em] text-blue-500",
                          )}
                        >
                          IPFS: {reward.metadataCID.substring(0, 12)}...
                        </p>
                      )}
                      <div
                        className={cn(
                          "mt-[0.75em] flex items-center justify-between",
                        )}
                      >
                        <span
                          className={cn(
                            "text-[0.9em] font-bold text-purple-600",
                          )}
                        >
                          {reward.cost.toLocaleString()} điểm
                        </span>
                        <Button
                          onClick={() => handleRedeem(reward)}
                          disabled={
                            !account ||
                            balance < reward.cost ||
                            isRedeeming === String(reward.id)
                          }
                          size="sm"
                          className={cn(
                            "bg-gradient-to-r from-purple-600 to-blue-600",
                            "text-[0.8em] font-semibold",
                            "disabled:from-gray-300 disabled:to-gray-400",
                          )}
                        >
                          {isRedeeming === String(reward.id) ? (
                            <span className={cn("flex items-center gap-2")}>
                              <svg
                                className={cn("h-[1em] w-[1em] animate-spin")}
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
                              Đang xử lý...
                            </span>
                          ) : (
                            "Đổi ngay"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction History */}
        <div className={cn("rounded-[0.625em] bg-white p-[1.5em]")}>
          <div className={cn("mb-[1em] flex items-center justify-between")}>
            <h3 className={cn("text-[1.25em] font-bold text-gray-800")}>
              Lịch sử giao dịch
            </h3>
            {account && (
              <Button
                onClick={() => loadTransactionHistory(account)}
                disabled={isLoadingHistory}
                size="sm"
                variant="outline"
                className={cn("text-[0.8em]")}
              >
                {isLoadingHistory ? (
                  <span className={cn("flex items-center gap-2")}>
                    <svg
                      className={cn("h-[1em] w-[1em] animate-spin")}
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
                    Đang tải...
                  </span>
                ) : (
                  "Làm mới"
                )}
              </Button>
            )}
          </div>
          {isLoadingHistory && transactions.length === 0 ? (
            <div className={cn("flex items-center justify-center py-8")}>
              <svg
                className={cn("h-[2em] w-[2em] animate-spin text-gray-400")}
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
            </div>
          ) : transactions.length === 0 ? (
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
                      <p
                        className={cn("text-[0.9em] font-medium text-gray-800")}
                      >
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

        {/* Certificates Section - IPFS Integration */}
        {account && <CertificatesSection account={account} />}

        {/* IPFS Uploader Section */}
        {account && <IPFSUploader account={account} />}

        {/* Backend Status Indicator */}
        {account && (
          <div
            className={cn(
              "rounded-[0.625em] border p-3 text-[0.85em]",
              backendConnected
                ? "border-green-200 bg-green-50"
                : "border-yellow-200 bg-yellow-50",
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  backendConnected ? "bg-green-500" : "bg-yellow-500",
                )}
              />
              <span
                className={
                  backendConnected ? "text-green-700" : "text-yellow-700"
                }
              >
                {backendConnected
                  ? `Backend connected | Registered: ${isRegistered ? "✓" : "✗"}`
                  : "Backend offline - Direct blockchain mode"}
              </span>
            </div>
          </div>
        )}
      </div>
    </Web3ErrorBoundary>
  );
}
