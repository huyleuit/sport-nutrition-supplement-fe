import { CONTRACT_CONFIG } from "@/config/contract";
import {
  BrowserProvider,
  Contract,
  EventLog,
  formatUnits,
  parseUnits,
} from "ethers";
import {
  fetchRewardMetadata,
  fetchCertificateMetadata,
  getIPFSImageUrl,
  type RewardMetadata,
  type CertificateMetadata,
} from "./ipfs";

// Cache for balance to reduce contract calls
let balanceCache: {
  address: string;
  balance: number;
  timestamp: number;
} | null = null;
const CACHE_DURATION = 30000; // 30 seconds

/**
 * Get token balance for a given address (with caching)
 * @param address - Wallet address to check balance for
 * @param forceRefresh - Force refresh even if cache is valid
 * @returns Token balance as a number (already converted from wei)
 */
export async function getTokenBalance(
  address: string,
  forceRefresh = false,
): Promise<number> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    // Check cache first
    if (
      !forceRefresh &&
      balanceCache &&
      balanceCache.address === address &&
      Date.now() - balanceCache.timestamp < CACHE_DURATION
    ) {
      return balanceCache.balance;
    }

    // Create provider from MetaMask
    const provider = new BrowserProvider(window.ethereum);

    // Get the network to ensure we're on the correct chain
    const network = await provider.getNetwork();
    if (Number(network.chainId) !== CONTRACT_CONFIG.chainId) {
      throw new Error(
        `Please switch to Sepolia testnet (Chain ID: ${CONTRACT_CONFIG.chainId})`,
      );
    }

    // Create contract instance
    const contract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyToken as string,
      CONTRACT_CONFIG.loyaltyTokenABI,
      provider,
    );

    // Get balance (returns BigInt in wei)
    const balanceWei = await contract.balanceOf(address);

    // Get decimals to properly format the balance
    const decimals = await contract.decimals();

    // Convert from wei to token units
    const balance = parseFloat(formatUnits(balanceWei, decimals));

    // Update cache
    balanceCache = {
      address,
      balance,
      timestamp: Date.now(),
    };

    return balance;
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw error;
  }
}

/**
 * Clear balance cache
 */
export function clearBalanceCache(): void {
  balanceCache = null;
}

/**
 * Check if user is connected to the correct network
 * @returns true if connected to Sepolia, false otherwise
 */
export async function isCorrectNetwork(): Promise<boolean> {
  try {
    if (!window.ethereum) {
      return false;
    }

    const provider = new BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    return Number(network.chainId) === CONTRACT_CONFIG.chainId;
  } catch (error) {
    console.error("Error checking network:", error);
    return false;
  }
}

/**
 * Switch to Sepolia testnet
 */
export async function switchToSepolia(): Promise<void> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${CONTRACT_CONFIG.chainId.toString(16)}` }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      // Add Sepolia network
      await window.ethereum!.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${CONTRACT_CONFIG.chainId.toString(16)}`,
            chainName: "Sepolia",
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: ["https://sepolia.infura.io/v3/"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
}

/**
 * Approve tokens for LoyaltyManager contract
 * @param amount - Amount to approve (in token units, not wei)
 * @returns Transaction hash
 */
export async function approveTokens(amount: number): Promise<string> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Get decimals to convert amount to wei
    const tokenContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyToken as string,
      CONTRACT_CONFIG.loyaltyTokenABI,
      provider,
    );
    const decimals = await tokenContract.decimals();

    // Create contract instance with signer for write operations
    const tokenContractWithSigner = tokenContract.connect(signer) as Contract;

    // Convert amount to wei
    const amountWei = parseUnits(amount.toString(), decimals);

    // Check current allowance
    const managerAddress = CONTRACT_CONFIG.contracts.loyaltyManager as string;
    const currentAllowance = await tokenContract.allowance(
      await signer.getAddress(),
      managerAddress,
    );

    // Only approve if current allowance is less than required amount
    if (currentAllowance < amountWei) {
      const tx = await tokenContractWithSigner.approve(
        managerAddress,
        amountWei,
      );
      await tx.wait();
      clearBalanceCache(); // Clear cache after approval
      return tx.hash;
    }

    return ""; // Already approved
  } catch (error) {
    console.error("Error approving tokens:", error);
    throw error;
  }
}

/**
 * Redeem reward from LoyaltyManager contract
 * @param rewardId - Reward ID to redeem
 * @returns Transaction hash
 */
export async function redeemReward(rewardId: number): Promise<string> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Create contract instance with signer
    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      signer,
    );

    // Get reward cost
    const costWei = await managerContract.getRewardCost(rewardId);
    if (costWei === BigInt(0)) {
      throw new Error("Invalid reward ID");
    }

    // Get token decimals to convert
    const tokenContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyToken as string,
      CONTRACT_CONFIG.loyaltyTokenABI,
      provider,
    );
    const decimals = await tokenContract.decimals();
    const cost = parseFloat(formatUnits(costWei, decimals));

    // Approve tokens first
    await approveTokens(cost);

    // Redeem reward
    const tx = await managerContract.redeemReward(rewardId);
    const receipt = await tx.wait();

    // Clear cache after redemption
    clearBalanceCache();

    return receipt.hash;
  } catch (error: any) {
    console.error("Error redeeming reward:", error);
    if (error.code === "ACTION_REJECTED" || error.code === 4001) {
      throw new Error("Transaction was rejected by user");
    }
    if (error.reason) {
      throw new Error(error.reason);
    }
    throw error;
  }
}

/**
 * Get transaction history from blockchain events
 * @param address - Wallet address to get transactions for
 * @param fromBlock - Block number to start from (default: latest 1000 blocks)
 * @returns Array of transactions
 */
export async function getTransactionHistory(
  address: string,
  fromBlock?: number,
): Promise<
  Array<{
    type: "earn" | "redeem";
    amount: number;
    description: string;
    date: string;
    txHash: string;
    blockNumber: number;
  }>
> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();

    if (Number(network.chainId) !== CONTRACT_CONFIG.chainId) {
      throw new Error("Please switch to Sepolia testnet");
    }

    const transactions: Array<{
      type: "earn" | "redeem";
      amount: number;
      description: string;
      date: string;
      txHash: string;
      blockNumber: number;
    }> = [];

    // Get latest block if fromBlock not provided
    if (!fromBlock) {
      const latestBlock = await provider.getBlockNumber();
      fromBlock = Math.max(0, latestBlock - 1000); // Last 1000 blocks
    }

    // Get Transfer events (earn tokens)
    // Need to add Transfer event to ABI for querying
    const tokenContractWithEvents = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyToken as string,
      CONTRACT_CONFIG.loyaltyTokenABI,
      provider,
    );

    // Query Transfer events where 'to' is the user address
    const transferFilter = tokenContractWithEvents.filters.Transfer(
      null, // from (null means any)
      address, // to
    );

    const transferEvents = await tokenContractWithEvents.queryFilter(
      transferFilter,
      fromBlock,
    );

    // Get decimals for conversion
    const tokenContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyToken as string,
      CONTRACT_CONFIG.loyaltyTokenABI,
      provider,
    );
    const decimals = await tokenContract.decimals();

    // Process Transfer events (minting = earning)
    for (const event of transferEvents) {
      if (event instanceof EventLog) {
        const from = event.args[0];
        const amountWei = event.args[2];
        const amount = parseFloat(formatUnits(amountWei, decimals));

        // If from is zero address, it's a mint (earn)
        if (from === "0x0000000000000000000000000000000000000000") {
          const block = await provider.getBlock(event.blockNumber);
          if (block) {
            transactions.push({
              type: "earn",
              amount,
              description: "Nhận điểm thưởng",
              date: new Date(block.timestamp * 1000)
                .toISOString()
                .split("T")[0],
              txHash: event.transactionHash,
              blockNumber: event.blockNumber,
            });
          }
        }
      }
    }

    // Get RewardRedeemed events
    // Add RewardRedeemed event to ABI for querying
    const managerContractWithEvents = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      [
        ...CONTRACT_CONFIG.loyaltyManagerABI,
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "customer",
              type: "address",
            },
            {
              indexed: false,
              name: "reward_id",
              type: "uint256",
            },
            {
              indexed: false,
              name: "cost",
              type: "uint256",
            },
          ],
          name: "RewardRedeemed",
          type: "event",
        },
      ],
      provider,
    );

    const redeemFilter =
      managerContractWithEvents.filters.RewardRedeemed(address);

    const redeemEvents = await managerContractWithEvents.queryFilter(
      redeemFilter,
      fromBlock,
    );

    // Process RewardRedeemed events
    for (const event of redeemEvents) {
      if (event instanceof EventLog) {
        const rewardId = event.args[1];
        const costWei = event.args[2];
        const cost = parseFloat(formatUnits(costWei, decimals));
        const block = await provider.getBlock(event.blockNumber);

        if (block) {
          transactions.push({
            type: "redeem",
            amount: -cost,
            description: `Đổi phần thưởng #${rewardId}`,
            date: new Date(block.timestamp * 1000).toISOString().split("T")[0],
            txHash: event.transactionHash,
            blockNumber: event.blockNumber,
          });
        }
      }
    }

    // Sort by block number (newest first)
    transactions.sort((a, b) => b.blockNumber - a.blockNumber);

    return transactions;
  } catch (error) {
    console.error("Error getting transaction history:", error);
    throw error;
  }
}

// ============================================
// IPFS Integration Functions
// ============================================

export interface RewardWithIPFS {
  id: number;
  cost: number;
  metadata: RewardMetadata | null;
  imageUrl: string;
  metadataCID: string;
  imageCID: string;
}

export interface CustomerCertificate {
  cid: string;
  metadata: CertificateMetadata | null;
  index: number;
}

/**
 * Get all available rewards from blockchain
 * Scans reward IDs 1-10 (configurable) to find active rewards
 * @param maxRewardId - Maximum reward ID to check (default: 10)
 * @returns Array of rewards with IPFS metadata
 */
export async function getAllRewards(
  maxRewardId: number = 10,
): Promise<RewardWithIPFS[]> {
  const rewards: RewardWithIPFS[] = [];

  for (let i = 1; i <= maxRewardId; i++) {
    const reward = await getRewardWithIPFS(i);
    if (reward) {
      rewards.push(reward);
    }
  }

  return rewards;
}

/**
 * Get reward details with IPFS metadata
 * @param rewardId - Reward ID to fetch
 * @returns Reward with metadata from IPFS
 */
export async function getRewardWithIPFS(
  rewardId: number,
): Promise<RewardWithIPFS | null> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      provider,
    );

    // Get reward cost - contract reverts if reward doesn't exist
    let costWei: bigint;
    try {
      costWei = await managerContract.getRewardCost(rewardId);
    } catch {
      // Reward doesn't exist (contract reverts with "Reward not found")
      return null;
    }

    if (costWei === BigInt(0)) {
      return null; // Reward doesn't exist
    }

    // Get token decimals
    const tokenContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyToken as string,
      CONTRACT_CONFIG.loyaltyTokenABI,
      provider,
    );
    const decimals = await tokenContract.decimals();
    const cost = parseFloat(formatUnits(costWei, decimals));

    // Get IPFS CIDs from contract
    const metadataCID = await managerContract.getRewardMetadata(rewardId);
    let imageCID = await managerContract.getRewardImage(rewardId);

    // Debug logging
    console.log(`[Reward ${rewardId}] Contract metadataCID:`, metadataCID);
    console.log(`[Reward ${rewardId}] Contract imageCID:`, imageCID);

    // Fetch metadata from IPFS if CID exists
    let metadata: RewardMetadata | null = null;
    if (metadataCID && metadataCID !== "") {
      metadata = await fetchRewardMetadata(metadataCID);
      console.log(`[Reward ${rewardId}] Fetched metadata:`, metadata);
    }

    // Fallback: if contract has no imageCID, use image_cid from metadata
    if ((!imageCID || imageCID === "") && metadata?.image_cid) {
      imageCID = metadata.image_cid;
      console.log(
        `[Reward ${rewardId}] Using image_cid from metadata:`,
        imageCID,
      );
    }

    // Get image URL
    const imageUrl =
      imageCID && imageCID !== "" ? getIPFSImageUrl(imageCID) : "";
    console.log(`[Reward ${rewardId}] Final imageUrl:`, imageUrl);

    return {
      id: rewardId,
      cost,
      metadata,
      imageUrl,
      metadataCID,
      imageCID: imageCID || "",
    };
  } catch (error) {
    console.error("Error getting reward with IPFS:", error);
    return null;
  }
}

/**
 * Get all certificates for a customer
 * @param customerAddress - Customer wallet address
 * @returns Array of certificates with IPFS metadata
 */
export async function getCustomerCertificates(
  customerAddress: string,
): Promise<CustomerCertificate[]> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      provider,
    );

    // Get all certificate CIDs from contract
    const certificateCIDs: string[] =
      await managerContract.getCustomerCertificates(customerAddress);

    // Fetch metadata for each certificate
    const certificates: CustomerCertificate[] = await Promise.all(
      certificateCIDs.map(async (cid, index) => {
        let metadata: CertificateMetadata | null = null;
        if (cid && cid !== "") {
          metadata = await fetchCertificateMetadata(cid);
        }
        return {
          cid,
          metadata,
          index,
        };
      }),
    );

    return certificates;
  } catch (error) {
    console.error("Error getting customer certificates:", error);
    return [];
  }
}

/**
 * Get certificate count for a customer
 * @param customerAddress - Customer wallet address
 * @returns Number of certificates
 */
export async function getCertificateCount(
  customerAddress: string,
): Promise<number> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      provider,
    );

    const count = await managerContract.getCertificateCount(customerAddress);
    return Number(count);
  } catch (error) {
    console.error("Error getting certificate count:", error);
    return 0;
  }
}

// ============================================
// ADMIN Functions (Owner Only)
// ============================================

/**
 * Check if connected wallet is the contract owner
 * @returns true if connected wallet is owner
 */
export async function isContractOwner(): Promise<boolean> {
  try {
    if (!window.ethereum) {
      return false;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      provider,
    );

    const ownerAddress = await managerContract.owner();
    return userAddress.toLowerCase() === ownerAddress.toLowerCase();
  } catch (error) {
    console.error("Error checking contract owner:", error);
    return false;
  }
}

/**
 * Create or update reward cost (owner only)
 * @param rewardId - Reward ID to create/update
 * @param cost - Cost in token units (not wei)
 * @returns Transaction hash
 */
export async function setRewardCost(
  rewardId: number,
  cost: number,
): Promise<string> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Get decimals to convert cost to wei
    const tokenContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyToken as string,
      CONTRACT_CONFIG.loyaltyTokenABI,
      provider,
    );
    const decimals = await tokenContract.decimals();
    const costWei = parseUnits(cost.toString(), decimals);

    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      signer,
    );

    const tx = await managerContract.setRewardCost(rewardId, costWei);
    const receipt = await tx.wait();
    return receipt.hash;
  } catch (error: any) {
    console.error("Error setting reward cost:", error);
    if (error.reason) throw new Error(error.reason);
    throw error;
  }
}

/**
 * Set reward metadata CID (owner only)
 * @param rewardId - Reward ID
 * @param metadataCID - IPFS CID of metadata JSON
 * @returns Transaction hash
 */
export async function setRewardMetadata(
  rewardId: number,
  metadataCID: string,
): Promise<string> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      signer,
    );

    const tx = await managerContract.setRewardMetadata(rewardId, metadataCID);
    const receipt = await tx.wait();
    return receipt.hash;
  } catch (error: any) {
    console.error("Error setting reward metadata:", error);
    if (error.reason) throw new Error(error.reason);
    throw error;
  }
}

/**
 * Set reward image CID (owner only)
 * @param rewardId - Reward ID
 * @param imageCID - IPFS CID of image file
 * @returns Transaction hash
 */
export async function setRewardImage(
  rewardId: number,
  imageCID: string,
): Promise<string> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      signer,
    );

    const tx = await managerContract.setRewardImage(rewardId, imageCID);
    const receipt = await tx.wait();
    return receipt.hash;
  } catch (error: any) {
    console.error("Error setting reward image:", error);
    if (error.reason) throw new Error(error.reason);
    throw error;
  }
}

/**
 * Remove reward (owner only)
 * @param rewardId - Reward ID to remove
 * @returns Transaction hash
 */
export async function removeReward(rewardId: number): Promise<string> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const managerContract = new Contract(
      CONTRACT_CONFIG.contracts.loyaltyManager as string,
      CONTRACT_CONFIG.loyaltyManagerABI,
      signer,
    );

    const tx = await managerContract.removeReward(rewardId);
    const receipt = await tx.wait();
    return receipt.hash;
  } catch (error: any) {
    console.error("Error removing reward:", error);
    if (error.reason) throw new Error(error.reason);
    throw error;
  }
}

/**
 * Create a complete reward with all data (owner only)
 * This is a convenience function that calls setRewardCost, setRewardMetadata, and setRewardImage
 * @param rewardId - Reward ID
 * @param cost - Cost in token units
 * @param metadataCID - IPFS CID of metadata JSON
 * @param imageCID - IPFS CID of image file
 * @returns Object with transaction hashes
 */
export async function createCompleteReward(
  rewardId: number,
  cost: number,
  metadataCID: string,
  imageCID: string,
): Promise<{
  costTxHash: string;
  metadataTxHash: string;
  imageTxHash: string;
}> {
  // First set the cost (creates the reward)
  const costTxHash = await setRewardCost(rewardId, cost);

  // Then set metadata
  const metadataTxHash = await setRewardMetadata(rewardId, metadataCID);

  // Finally set image
  const imageTxHash = await setRewardImage(rewardId, imageCID);

  return { costTxHash, metadataTxHash, imageTxHash };
}

// Re-export IPFS types for convenience
export type { RewardMetadata, CertificateMetadata };
