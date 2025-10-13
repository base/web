import abi from 'apps/web/src/abis/UniswapV2Pair';
import { UNISWAP_USDC_WETH_POOL } from 'apps/web/src/addresses/usernames';
import { base } from 'viem/chains';
import { useReadContract } from 'wagmi';

export function useEthPriceFromUniswap() {
  const chainId = base.id;

  const { data } = useReadContract({
    abi,
    address: UNISWAP_USDC_WETH_POOL[chainId],
    functionName: 'getReserves',
    args: [],
    chainId,
  });

  if (!data) {
    return undefined;
  }

  // data =  [_reserve0, _reserve1, _blockTimestampLast]
  // usd per ether to the nearest dollar
  return Number((data[1] * BigInt(1e12)) / data[0]);
}
