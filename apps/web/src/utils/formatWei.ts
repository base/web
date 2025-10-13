import { formatEther, parseEther } from 'viem';

export function formatWei(wei?: bigint): bigint | '...' {
  if (wei === undefined) {
    return '...';
  }

  const priceInEth = formatEther(wei);
  return parseEther(priceInEth.toString());
}

