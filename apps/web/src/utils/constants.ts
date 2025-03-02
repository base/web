// Create a constants file to centralize configuration
export const CONFIG = {
  COOKIE_EXPIRY: 30 * 24 * 60 * 60, // 30 days
  API_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  CACHE_DURATION: 3600,
} as const;

export const ENDPOINTS = {
  API_BASE: process.env.NEXT_PUBLIC_API_URL,
  IPFS_GATEWAY: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
} as const;
