import { CONTRACT_CONFIG } from "@/config/contract";
import { BrowserProvider, Contract, formatUnits } from "ethers";

/**
 * Get token balance for a given address
 * @param address - Wallet address to check balance for
 * @returns Token balance as a number (already converted from wei)
 */
export async function getTokenBalance(address: string): Promise<number> {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
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

    return balance;
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw error;
  }
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
