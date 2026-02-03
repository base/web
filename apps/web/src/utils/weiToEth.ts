import { formatEther } from 'viem';

export function weiToEth(wei?: bigint): number | '...' {
  if (!Boolean(wei)) {
    return '...';
  }
  const eth: number = parseFloat(formatEther(wei));
  if (eth < 0.001) {
    return parseFloat(eth.toFixed(4));
  } else {
    return parseFloat(eth.toFixed(3));
  }
}
