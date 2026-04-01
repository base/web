/**
 * CDP (Coinbase Developer Platform) Configuration Constants
 * 
 * SECURITY NOTE: CDP_KEY_SECRET is intentionally NOT exported as a constant.
 * It should only be accessed through validated functions to prevent accidental exposure.
 */

export const cdpKeyName = process.env.CDP_KEY_NAME ?? '';
export const cdpBaseRpcEndpoint =
  process.env.NEXT_PUBLIC_CDP_BASE_RPC_ENDPOINT ?? 'https://mainnet.base.org';
export const cdpBaseSepoliaRpcEndpoint =
  process.env.NEXT_PUBLIC_CDP_BASE_SEPOLIA_RPC_ENDPOINT ?? 'https://sepolia.base.org';
export const cdpBaseUri = process.env.CDP_BASE_URI ?? 'api.coinbase.com';
