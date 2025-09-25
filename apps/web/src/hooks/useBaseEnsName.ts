import { Address, createPublicClient, http, isAddress } from 'viem';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { Basename, useName } from '@coinbase/onchainkit/identity';
import { base, mainnet } from 'viem/chains';
import { useEffect, useMemo, useState } from 'react';
import L2ReverseRegistrarAbi from 'apps/web/src/abis/L2ReverseRegistrarAbi';
import { USERNAME_L2_REVERSE_REGISTRAR_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { convertChainIdToCoinTypeUint } from 'apps/web/src/utils/usernames';

export type UseBaseEnsNameProps = {
  address?: Address;
};

export type BaseEnsNameData = Basename | undefined;

// Wrapper around onchainkit's useName
export default function useBaseEnsName({ address }: UseBaseEnsNameProps) {
  const { basenameChain } = useBasenameChain();

  // Existing OCK name for backwards compatibility (may be legacy resolver)
  const ock = useName(
    {
      address: address as Address,
      chain: basenameChain,
    },
    {
      enabled: !!address && isAddress(address),
    },
  );

  const [ensip19Name, setEnsip19Name] = useState<string | null>(null);
  const [l2DirectName, setL2DirectName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address || !isAddress(address)) {
      setEnsip19Name(null);
      setL2DirectName(null);
      setLoading(false);
      return;
    }

    const run = async () => {
      setLoading(true);
      let hasEnsip19 = false;
      try {
        const res = await fetch(`/api/ensip19/reverseName?address=${address}`, {
          cache: 'no-store',
        });
        const json = (await res.json()) as { name: string | null };
        setEnsip19Name(json?.name ?? null);
        hasEnsip19 = !!json?.name;
      } catch (err) {
        setEnsip19Name(null);
      }

      if (!hasEnsip19) {
        try {
          const l2Client = createPublicClient({ chain: basenameChain, transport: http() });
          const l2ReverseRegistrarAddress =
            USERNAME_L2_REVERSE_REGISTRAR_ADDRESSES[basenameChain.id];
          const nameViaDirectLookup = await l2Client.readContract({
            address: l2ReverseRegistrarAddress,
            abi: L2ReverseRegistrarAbi,
            functionName: 'nameForAddr',
            args: [address],
          });
          const val = String(nameViaDirectLookup ?? '');
          setL2DirectName(val.length > 0 ? val : null);
        } catch (_) {
          setL2DirectName(null);
        }
      } else {
        setL2DirectName(null);
      }

      setLoading(false);
    };

    run();
  }, [address, basenameChain]);

  const resolved = useMemo(() => {
    const ockName = ock.data ? (ock.data as Basename) : undefined;
    return (ensip19Name ?? l2DirectName ?? ockName) as Basename | undefined;
  }, [ensip19Name, l2DirectName, ock.data]);

  return {
    data: resolved,
    isLoading: loading || ock.isLoading,
    isFetching: ock.isFetching,
    refetch: ock.refetch,
  };
}
