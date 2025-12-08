/**
 * Loyalty Service API Client
 *
 * Gọi backend API để tương tác với blockchain và IPFS
 * Backend: loyalty-service (port 8308)
 */

// API Base URL - có thể config qua env
const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

// Common headers for all requests (including ngrok bypass)
const commonHeaders = {
  "ngrok-skip-browser-warning": "true",
};

// Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface RegisterCustomerResponse {
  walletAddress: string;
  transactionHash: string;
  blockNumber: number;
}

export interface CustomerInfoResponse {
  walletAddress: string;
  registered: boolean;
  tokenBalance: number;
  certificateCount: number;
}

export interface IssueTokensResponse {
  walletAddress: string;
  amount: number;
  newBalance: number;
  transactionHash: string;
  blockNumber: number;
}

export interface CertificateResponse {
  voucherCode: string;
  customerAddress: string;
  rewardId: number;
  rewardName: string;
  ipfsCid: string;
  ipfsUrl: string;
  issuedAt: string;
  usedAt?: string;
  used: boolean;
}

export interface IPFSUploadResponse {
  ipfsCid: string;
  ipfsUrl: string;
  fileSize?: number;
  mimeType?: string;
}

// Reward types
export interface RewardMetadata {
  name: string;
  description: string;
  terms: string;
  category: string;
  token_cost: number;
  image_cid?: string;
}

export interface CreateRewardRequest {
  rewardId: number;
  cost: number;
  metadata: RewardMetadata;
  imageCid?: string; // Already uploaded image CID
}

export interface CreateRewardResponse {
  rewardId: number;
  transactions: {
    setRewardCost?: string;
    setRewardMetadata?: string;
    setRewardImage?: string;
  };
  ipfs: {
    metadataCid: string;
    metadataUrl: string;
    imageCid?: string;
    imageUrl?: string;
  };
}

export interface RewardResponse {
  rewardId: number;
  cost: number;
  metadataCid?: string;
  imageCid?: string;
  metadata?: RewardMetadata;
  imageUrl?: string;
}

// ==================== CUSTOMER APIs ====================

/**
 * Đăng ký customer vào hệ thống loyalty
 * Gọi sau khi user kết nối ví MetaMask
 */
export async function registerCustomer(
  walletAddress: string,
): Promise<ApiResponse<RegisterCustomerResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...commonHeaders },
      body: JSON.stringify({ walletAddress }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error registering customer:", error);
    return { success: false, error: "Failed to register customer" };
  }
}

/**
 * Lấy thông tin customer
 */
export async function getCustomerInfo(
  walletAddress: string,
): Promise<ApiResponse<CustomerInfoResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/customers/${walletAddress}`, {
      headers: commonHeaders,
    });
    return await response.json();
  } catch (error) {
    console.error("Error getting customer info:", error);
    return { success: false, error: "Failed to get customer info" };
  }
}

/**
 * Kiểm tra customer đã đăng ký chưa
 */
export async function isCustomerRegistered(
  walletAddress: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/customers/${walletAddress}/registered`,
      { headers: commonHeaders },
    );
    const result = await response.json();
    return result.data === true;
  } catch (error) {
    console.error("Error checking registration:", error);
    return false;
  }
}

/**
 * Lấy số dư token từ backend
 */
export async function getTokenBalanceFromBackend(
  walletAddress: string,
): Promise<number> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/customers/${walletAddress}/balance`,
      { headers: commonHeaders },
    );
    const result = await response.json();
    return result.data || 0;
  } catch (error) {
    console.error("Error getting balance:", error);
    return 0;
  }
}

// ==================== CERTIFICATE APIs ====================

/**
 * Phát hành certificate sau khi đổi thưởng
 */
export async function issueCertificate(
  customerAddress: string,
  rewardId: number,
  rewardName: string,
  redeemTxHash: string,
): Promise<ApiResponse<CertificateResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/certificates/issue`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...commonHeaders },
      body: JSON.stringify({
        customerAddress,
        rewardId,
        rewardName,
        redeemTxHash,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error issuing certificate:", error);
    return { success: false, error: "Failed to issue certificate" };
  }
}

/**
 * Lấy danh sách certificates của customer
 */
export async function getCustomerCertificatesFromBackend(
  walletAddress: string,
): Promise<ApiResponse<CertificateResponse[]>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/certificates/customer/${walletAddress}`,
      { headers: commonHeaders },
    );
    return await response.json();
  } catch (error) {
    console.error("Error getting certificates:", error);
    return { success: false, error: "Failed to get certificates", data: [] };
  }
}

/**
 * Xác thực certificate bằng voucher code
 * Backend yêu cầu cả customerAddress và voucherCode
 */
export async function verifyCertificate(
  customerAddress: string,
  voucherCode: string,
): Promise<ApiResponse<{ valid: boolean; certificate?: CertificateResponse }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/certificates/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...commonHeaders },
      body: JSON.stringify({ customerAddress, voucherCode }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error verifying certificate:", error);
    return { success: false, error: "Failed to verify certificate" };
  }
}

// ==================== IPFS APIs ====================

/**
 * Upload JSON lên IPFS
 */
export async function uploadJsonToIPFS(
  data: object,
  name: string,
): Promise<ApiResponse<IPFSUploadResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/ipfs/upload/json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...commonHeaders },
      body: JSON.stringify({ data, name }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error);
    return { success: false, error: "Failed to upload JSON to IPFS" };
  }
}

/**
 * Upload file lên IPFS
 */
export async function uploadFileToIPFS(
  file: File,
  name: string,
): Promise<ApiResponse<IPFSUploadResponse>> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    const response = await fetch(`${API_BASE_URL}/ipfs/upload/file`, {
      method: "POST",
      headers: commonHeaders,
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    return { success: false, error: "Failed to upload file to IPFS" };
  }
}

/**
 * Lấy JSON từ IPFS
 */
export async function getJsonFromIPFS(
  cid: string,
): Promise<ApiResponse<object>> {
  try {
    const response = await fetch(`${API_BASE_URL}/ipfs/${cid}`, {
      headers: commonHeaders,
    });
    return await response.json();
  } catch (error) {
    console.error("Error getting JSON from IPFS:", error);
    return { success: false, error: "Failed to get JSON from IPFS" };
  }
}

// ==================== REWARD MANAGEMENT APIs ====================

/**
 * Tạo reward mới (Admin only - gọi qua backend)
 * Backend sẽ dùng owner private key để ký transaction
 */
export async function createReward(
  request: CreateRewardRequest,
): Promise<ApiResponse<CreateRewardResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...commonHeaders },
      body: JSON.stringify({
        rewardId: request.rewardId,
        cost: request.cost,
        metadata: request.metadata,
        imageCid: request.imageCid,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating reward:", error);
    return { success: false, error: "Failed to create reward" };
  }
}

/**
 * Lấy thông tin reward
 */
export async function getReward(
  rewardId: number,
): Promise<ApiResponse<RewardResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/rewards/${rewardId}`, {
      headers: commonHeaders,
    });
    return await response.json();
  } catch (error) {
    console.error("Error getting reward:", error);
    return { success: false, error: "Failed to get reward" };
  }
}

/**
 * Cập nhật chi phí reward
 */
export async function updateRewardCost(
  rewardId: number,
  cost: number,
): Promise<ApiResponse<string>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/rewards/${rewardId}/cost?cost=${cost}`,
      {
        method: "PUT",
        headers: commonHeaders,
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error updating reward cost:", error);
    return { success: false, error: "Failed to update reward cost" };
  }
}

/**
 * Cập nhật metadata của reward
 */
export async function updateRewardMetadata(
  rewardId: number,
  metadata: RewardMetadata,
): Promise<ApiResponse<string>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/rewards/${rewardId}/metadata`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...commonHeaders },
        body: JSON.stringify(metadata),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error updating reward metadata:", error);
    return { success: false, error: "Failed to update reward metadata" };
  }
}

// ==================== HEALTH CHECK ====================

/**
 * Kiểm tra kết nối với backend và blockchain
 */
export async function checkHealth(): Promise<
  ApiResponse<{
    status: string;
    blockchain: string;
    currentBlock?: number;
  }>
> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      headers: commonHeaders,
    });
    return await response.json();
  } catch (error) {
    console.error("Error checking health:", error);
    return { success: false, error: "Backend not available" };
  }
}

// ============================================
// VOUCHER VERIFICATION & REDEMPTION
// ============================================

export interface VerifyVoucherResponse {
  valid: boolean;
  redeemed: boolean;
  voucherCode: string;
  rewardId: number;
  customerAddress: string;
  createdAt: string;
  redeemedAt?: string;
  invalidReason?: string;
  // Extended info from reward metadata
  rewardName?: string;
  discountType?: string; // "percentage" | "fixed"
  discountValue?: number;
}

/**
 * Verify voucher code
 * Kiểm tra mã voucher có hợp lệ không
 *
 * @param voucherCode - Mã voucher cần kiểm tra
 * @param customerAddress - Địa chỉ ví của khách hàng (required)
 */
export async function verifyVoucher(
  voucherCode: string,
  customerAddress?: string,
): Promise<ApiResponse<VerifyVoucherResponse>> {
  try {
    // Nếu không có customerAddress, không thể verify
    if (!customerAddress) {
      return {
        success: false,
        error: "Customer address is required to verify voucher",
      };
    }

    const response = await fetch(`${API_BASE_URL}/certificates/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...commonHeaders },
      body: JSON.stringify({ customerAddress, voucherCode }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error verifying voucher:", error);
    return { success: false, error: "Failed to verify voucher" };
  }
}

/**
 * Mark voucher as redeemed (đã sử dụng)
 * Gọi sau khi đơn hàng hoàn thành
 *
 * @param voucherCode - Mã voucher đã sử dụng
 */
export async function markVoucherAsRedeemed(
  voucherCode: string,
): Promise<ApiResponse<boolean>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/certificates/${voucherCode}/redeem`,
      {
        method: "POST",
        headers: commonHeaders,
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error marking voucher as redeemed:", error);
    return { success: false, error: "Failed to mark voucher as redeemed" };
  }
}

/**
 * Get voucher details including reward metadata
 * Lấy thông tin chi tiết voucher và phần thưởng
 *
 * @param voucherCode - Mã voucher
 */
export async function getVoucherDetails(
  voucherCode: string,
): Promise<ApiResponse<CertificateResponse>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/certificates/voucher/${voucherCode}`,
      { headers: commonHeaders },
    );
    return await response.json();
  } catch (error) {
    console.error("Error getting voucher details:", error);
    return { success: false, error: "Failed to get voucher details" };
  }
}
