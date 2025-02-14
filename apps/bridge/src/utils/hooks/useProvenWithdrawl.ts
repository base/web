import { optimismPortalABI } from '@eth-optimism/contracts-ts';
import getConfig from 'next/config';
import { useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

export function useProvenWithdrawal(withdrawalHash: string | null) {
  const { data: provenWithdrawal } = useContractRead({
    address: withdrawalHash ? publicRuntimeConfig.l1OptimismPortalProxyAddress : undefined,
    abi: optimismPortalABI,
    functionName: 'provenWithdrawals',
    args: withdrawalHash ? [withdrawalHash as `0x${string}`] : undefined,
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });

  return provenWithdrawal;
}
