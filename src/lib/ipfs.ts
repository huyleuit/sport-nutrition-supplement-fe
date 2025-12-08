/**
 * IPFS Utility Functions
 * Provides functions to interact with IPFS gateways for retrieving stored data
 */

// List of public IPFS gateways (fallback mechanism)
const IPFS_GATEWAYS = [
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://dweb.link/ipfs/',
];

// Types for IPFS data
export interface RewardMetadata {
  name: string;
  description: string;
  terms?: string;
  expiry?: string;
  category?: string;
  value_vnd?: number;
  token_cost?: number;
  image_cid?: string;
}

export interface CertificateMetadata {
  type: string;
  customer_address: string;
  reward_name: string;
  voucher_code: string;
  redemption_date: string;
  issued_by: string;
  verification_hash: string;
}

/**
 * Get full IPFS URL from CID
 * @param cid - IPFS Content Identifier
 * @param gatewayIndex - Gateway index to use (default: 0 = Pinata)
 */
export function getIPFSUrl(cid: string, gatewayIndex = 0): string {
  if (!cid || cid === '') return '';
  const gateway = IPFS_GATEWAYS[gatewayIndex] || IPFS_GATEWAYS[0];
  return `${gateway}${cid}`;
}

/**
 * Fetch JSON metadata from IPFS with fallback gateways
 * @param cid - IPFS Content Identifier
 * @returns Parsed JSON data or null if failed
 */
export async function fetchIPFSJson<T>(cid: string): Promise<T | null> {
  if (!cid || cid === '') return null;

  for (let i = 0; i < IPFS_GATEWAYS.length; i++) {
    try {
      const url = getIPFSUrl(cid, i);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(`Gateway ${i} failed for CID ${cid}:`, error);
      continue;
    }
  }

  console.error(`All gateways failed for CID: ${cid}`);
  return null;
}

/**
 * Fetch reward metadata from IPFS
 * @param cid - IPFS CID of the metadata JSON
 */
export async function fetchRewardMetadata(
  cid: string
): Promise<RewardMetadata | null> {
  return fetchIPFSJson<RewardMetadata>(cid);
}

/**
 * Fetch certificate metadata from IPFS
 * @param cid - IPFS CID of the certificate JSON
 */
export async function fetchCertificateMetadata(
  cid: string
): Promise<CertificateMetadata | null> {
  return fetchIPFSJson<CertificateMetadata>(cid);
}

/**
 * Get image URL from IPFS CID
 * Uses Pinata gateway by default for better performance
 * @param cid - IPFS CID of the image
 */
export function getIPFSImageUrl(cid: string): string {
  if (!cid || cid === '') return '';
  return getIPFSUrl(cid, 0); // Use Pinata gateway
}

/**
 * Check if an IPFS CID is valid format
 * @param cid - String to validate
 */
export function isValidCID(cid: string): boolean {
  if (!cid || typeof cid !== 'string') return false;
  // CIDv0 starts with 'Qm' and is 46 chars
  // CIDv1 starts with 'b' and varies in length
  return (
    (cid.startsWith('Qm') && cid.length === 46) ||
    (cid.startsWith('bafy') && cid.length >= 50)
  );
}

/**
 * Verify IPFS content is accessible
 * @param cid - IPFS CID to verify
 */
export async function verifyIPFSContent(cid: string): Promise<boolean> {
  if (!isValidCID(cid)) return false;

  try {
    const url = getIPFSUrl(cid, 0);
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Demo/Sample IPFS CIDs for testing (mock data)
export const SAMPLE_IPFS_DATA = {
  reward1_metadata: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
  reward1_image: 'QmTzQ1JRkWErjk39mryYw2WVaphAZNAREyMchXzYywZCpa',
  sample_certificate: 'QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv',
};

