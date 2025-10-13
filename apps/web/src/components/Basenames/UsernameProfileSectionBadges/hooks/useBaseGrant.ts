import { useReadContract } from 'wagmi';
import BuildathonSBT from 'apps/web/src/abis/BuildathonSBT';

const BASE_GRANT_NFT_ADDRESS = '0x1926a8090d558066ed26b6217e43d30493dc938e';

export default function useBaseGrant(address?: `0x${string}`): boolean {
  const { data: balanceOf } = useReadContract({
    address: BASE_GRANT_NFT_ADDRESS,
    abi: BuildathonSBT,
    functionName: 'balanceOf',
    args: [address ?? '0x'],
    query: {
      enabled: !!address,
    },
  });

  return balanceOf ? balanceOf > 0 : false;
}
