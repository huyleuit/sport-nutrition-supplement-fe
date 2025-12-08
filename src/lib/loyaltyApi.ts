/**
 * Loyalty Service API Client
 *
 * Gọi backend API để tương tác với blockchain và IPFS
 * Backend: loyalty-service (port 8308)
 */

// API Base URL - có thể config qua env
const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

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

// ==================== CUSTOMER APIs ====================

/**
 * Đăng ký customer vào hệ thống loyalty
 * Gọi sau khi user kết nối ví MetaMask
 */
export async function registerCustomer(
  walletAddress: string,
): Promise<ApiResponse<RegisterCustomerResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/customers/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const response = await fetch(
      `${API_BASE_URL}/api/v1/customers/${walletAddress}`,
    );
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
      `${API_BASE_URL}/api/v1/customers/${walletAddress}/registered`,
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
      `${API_BASE_URL}/api/v1/customers/${walletAddress}/balance`,
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
    const response = await fetch(`${API_BASE_URL}/api/v1/certificates/issue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      `${API_BASE_URL}/api/v1/certificates/customer/${walletAddress}`,
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
    const response = await fetch(`${API_BASE_URL}/api/v1/certificates/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const response = await fetch(`${API_BASE_URL}/api/v1/ipfs/upload/json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

    const response = await fetch(`${API_BASE_URL}/api/v1/ipfs/upload/file`, {
      method: "POST",
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
    const response = await fetch(`${API_BASE_URL}/api/v1/ipfs/${cid}`);
    return await response.json();
  } catch (error) {
    console.error("Error getting JSON from IPFS:", error);
    return { success: false, error: "Failed to get JSON from IPFS" };
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
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error("Error checking health:", error);
    return { success: false, error: "Backend not available" };
  }
}
