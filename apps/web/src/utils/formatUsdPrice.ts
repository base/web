import { formatEther } from 'viem';

export function formatUsdPrice(price: bigint, ethUsdPrice: number): string {
  if (price === 0n) return '0';
  const parsed = (parseFloat(formatEther(price)) * Number(ethUsdPrice)).toFixed(2);
  return parsed === '0.00' ? '0' : parsed;
}
