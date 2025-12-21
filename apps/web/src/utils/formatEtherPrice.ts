import { formatEther } from 'viem';

export function formatEtherPrice(price?: bigint): number | '...' {
  if (!Boolean(price)) {
    return '...';
  }
  const value: number = parseFloat(formatEther(price));
  if (value < 0.001) {
    return parseFloat(value.toFixed(4));
  } else {
    return parseFloat(value.toFixed(3));
  }
}
