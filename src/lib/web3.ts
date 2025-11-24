import { CONTRACT_CONFIG } from "@/config/contract";
import {
  BrowserProvider,
  Contract,
  EventLog,
  formatUnits,
  parseUnits,
} from "ethers";

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
