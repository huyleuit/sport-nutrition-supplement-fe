"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRewardWithIPFS, type RewardWithIPFS } from "@/lib/web3";
import { getIPFSUrl } from "@/lib/ipfs";

interface RewardIPFSCardProps {
  rewardId: number;
  onRedeem?: (reward: RewardWithIPFS) => void;
  userBalance: number;
  isRedeeming?: boolean;
  isConnected: boolean;
}

export function RewardIPFSCard({
  rewardId,
  onRedeem,
  userBalance,
  isRedeeming,
  isConnected,
}: RewardIPFSCardProps) {
  const [reward, setReward] = useState<RewardWithIPFS | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadReward = async () => {
      setIsLoading(true);
      try {
        const data = await getRewardWithIPFS(rewardId);
        setReward(data);
      } catch (error) {
        console.error(`Error loading reward ${rewardId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected) {
      loadReward();
    }
  }, [rewardId, isConnected]);

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={cn(
        "rounded-[0.5em] border border-gray-200 p-[1em]",
        "animate-pulse bg-gray-50"
      )}>
        <div className="h-16 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!reward) {
    return null;
  }

  const canRedeem = isConnected && userBalance >= reward.cost;
  const hasIPFSData = reward.metadataCID || reward.imageCID;

  return (
    <div className={cn(
      "rounded-[0.5em] border border-gray-200 p-[1em]",
      "transition-all hover:shadow-md",
      hasIPFSData && "border-green-200 bg-green-50/30"
    )}>
      <div className={cn("flex items-start gap-3")}>
        {/* Image from IPFS or fallback */}
        <div className={cn(
          "flex h-[4em] w-[4em] items-center justify-center",
          "rounded-[0.5em] bg-gradient-to-br from-purple-100 to-blue-100",
          "overflow-hidden"
        )}>
          {reward.imageUrl && !imageError ? (
            <img
              src={reward.imageUrl}
              alt={reward.metadata?.name || `Reward ${rewardId}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-[1.5em]">🎁</span>
          )}
        </div>

        <div className={cn("flex-1")}>
          <div className="flex items-center gap-2">
            <h4 className={cn("text-[1em] font-semibold text-gray-800")}>
              {reward.metadata?.name || `Phần thưởng #${rewardId}`}
            </h4>
            {hasIPFSData && (
              <span className="px-1.5 py-0.5 text-[0.65em] bg-green-100 text-green-700 rounded">
                IPFS ✓
              </span>
            )}
          </div>

          <p className={cn("mt-[0.25em] text-[0.85em] text-gray-600")}>
            {reward.metadata?.description || "Đổi điểm để nhận phần thưởng"}
          </p>

          {reward.metadata?.terms && (
            <p className={cn("mt-[0.25em] text-[0.75em] text-gray-500 italic")}>
              {reward.metadata.terms}
            </p>
          )}

          {reward.metadata?.expiry && (
            <p className={cn("mt-[0.25em] text-[0.7em] text-orange-600")}>
              Hết hạn: {reward.metadata.expiry}
            </p>
          )}

          <div className={cn("mt-[0.75em] flex items-center justify-between")}>
            <span className={cn("text-[0.9em] font-bold text-purple-600")}>
              {reward.cost.toLocaleString()} điểm
            </span>
            <div className="flex items-center gap-2">
              {reward.metadataCID && (
                <a
                  href={getIPFSUrl(reward.metadataCID)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.7em] text-blue-600 hover:underline"
                >
                  Metadata
                </a>
              )}
              <Button
                onClick={() => onRedeem?.(reward)}
                disabled={!canRedeem || isRedeeming}
                size="sm"
                className={cn(
                  "bg-gradient-to-r from-purple-600 to-blue-600",
                  "text-[0.8em] font-semibold",
                  "disabled:from-gray-300 disabled:to-gray-400"
                )}
              >
                {isRedeeming ? "Đang xử lý..." : "Đổi ngay"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

