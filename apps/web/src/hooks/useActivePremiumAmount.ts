import ExponentialPremiumPriceOracleABI from 'apps/web/src/abis/ExponentialPremiumPriceOracleAbi';
import { EXPONENTIAL_PREMIUM_PRICE_ORACLE } from 'apps/web/src/addresses/usernames';
import { useBasenamesLaunchTime } from 'apps/web/src/hooks/useBasenamesLaunchTime';
import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { base } from 'viem/chains';

export function useActiveEthPremiumAmount() {
  const { data: launchTimeSeconds } = useBasenamesLaunchTime();

  const timeSinceLaunch = useMemo(
    () => (launchTimeSeconds ? BigInt(Math.floor(Date.now() / 1000)) - launchTimeSeconds : null),
    [launchTimeSeconds],
  );

  return useReadContract({
    abi: ExponentialPremiumPriceOracleABI,
    address: EXPONENTIAL_PREMIUM_PRICE_ORACLE[base.id],
    functionName: 'decayedPremium',
    args: [timeSinceLaunch as bigint],
    query: {
      enabled: typeof timeSinceLaunch === 'bigint',
    },
  });
}
