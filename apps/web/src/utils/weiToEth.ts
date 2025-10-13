import { formatEther } from 'viem';

export function weiToEth(wei?: bigint): number | '...' {
  if (wei === undefined) {
    return '...';
  }
  const eth = parseFloat(formatEther(wei));
  if (eth < 0.001) {
    return parseFloat(eth.toFixed(4));
  } else {
    return parseFloat(eth.toFixed(3));
  }
}
