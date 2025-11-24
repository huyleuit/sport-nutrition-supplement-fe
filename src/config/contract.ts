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
    loyaltyToken:
      process.env.NEXT_PUBLIC_LTT_CONTRACT_ADDRESS ||
      "0x53B662608d30318b3476A74666A56C91F39597AA",
    loyaltyManager:
      process.env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS ||
      "0xCb6c4a5f4E23b1F78384728a75457d1eed5bC7Dd",
  },

  // ERC20 ABI - Minimal ABI for LoyaltyToken
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
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
        {
          name: "_spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "_from",
          type: "address",
        },
        {
          indexed: true,
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          name: "_value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
  ] as const,

  // LoyaltyManager ABI
  loyaltyManagerABI: [
    {
      constant: false,
      inputs: [
        {
          name: "_reward_id",
          type: "uint256",
        },
      ],
      name: "redeemReward",
      outputs: [],
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_reward_id",
          type: "uint256",
        },
      ],
      name: "getRewardCost",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_customer",
          type: "address",
        },
      ],
      name: "isCustomerRegistered",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      type: "function",
    },
  ] as const,
};
