import { cid } from 'is-ipfs';

export type IpfsUrl = `ipfs://${string}`;
export const VERCEL_BLOB_HOSTNAME = 'zku9gdedgba48lmr.public.blob.vercel-storage.com';
export const IPFS_URI_PROTOCOL = 'ipfs://';

export const PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL ?? undefined;
export const PINATA_GATEWAY_KEY = process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY ?? undefined;

export type QueryParams = Record<string, string>;

export const encodeUrlQueryParams = (queryParams: QueryParams) => {
  return Object.entries(queryParams)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&');
};
export const urlWithQueryParams = (url: string, queryParams: QueryParams) => {
  return `${url}?${encodeUrlQueryParams(queryParams)}`;
};

export function isValidUrl(string?: string) {
  if (!string) return false;
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export const IsValidIpfsUrl = (ipfsUrl: string): boolean => {
  try {
    const url = new URL(ipfsUrl);
    if (url.protocol !== 'ipfs:') return false;

    // Get first path segment after hostname as CID
    const ipfsCid = url.host;

    // Validate the CID directly
    const isValidCid = cid(ipfsCid);
    return isValidCid;
  } catch (error) {
    return false;
  }
};

export const IsValidVercelBlobUrl = (source: string): boolean => {
  try {
    const url = new URL(source);
    const isVercelBlobImage = url.protocol === 'https:' && url.hostname === VERCEL_BLOB_HOSTNAME;
    return isVercelBlobImage;
  } catch (error) {
    return false;
  }
};

export const getIpfsGatewayUrl = (ipfsUrl: IpfsUrl): string | undefined => {
  if (!ipfsUrl) return;
  if (!IsValidIpfsUrl(ipfsUrl)) return;

  try {
    const url = new URL(ipfsUrl);
    const path = url.host;
    const pathname = url.pathname;

    if (PINATA_GATEWAY_URL && PINATA_GATEWAY_KEY) {
      return `https://${PINATA_GATEWAY_URL}/ipfs/${path}${pathname}?pinataGatewayToken=${PINATA_GATEWAY_KEY}`;
    } else {
      return `https://ipfs.io/ipfs/${path}${pathname}`;
    }
  } catch (error) {
    return;
  }
};

export function isDataUrl(url: string): boolean {
  return url.startsWith('data:');
}
