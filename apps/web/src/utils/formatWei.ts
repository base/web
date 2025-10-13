import { formatEther, parseEther } from 'viem';

export function formatWei(wei?: bigint): bigint | '...' {
  if (!Boolean(wei)) {
    return '...';
  }

  const priceInEth = formatEther(wei);
  return parseEther(priceInEth.toString());
}

