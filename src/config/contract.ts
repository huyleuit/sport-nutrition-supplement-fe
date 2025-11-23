// Contract configuration for Loyalty Token
export const CONTRACT_CONFIG = {
  // Sepolia testnet
  chainId: 11155111,
  // Default uses public RPC (may be rate-limited)
  rpcUrl:
    (typeof window !== "undefined" && process.env.NEXT_PUBLIC_INFURA_API_KEY) ||
    `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,

  // Contract addresses (from deployments/sepolia.json)
  contracts: {
    loyaltyToken: process.env.NEXT_PUBLIC_LTT_CONTRACT_ADDRESS,
    loyaltyManager: process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS,
  },

  // ERC20 ABI - Minimal ABI for balanceOf function
  loyaltyTokenABI: [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      type: "function",
    },
  ] as const,
};
