import { Address, isAddress } from 'viem';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { Basename, useName } from '@coinbase/onchainkit/identity';

export type UseBaseEnsNameProps = {
  address?: Address;
};

export type BaseEnsNameData = Basename | undefined;

// Wrapper around onchainkit's useName
export default function useBaseEnsName({ address }: UseBaseEnsNameProps) {
  const { basenameChain } = useBasenameChain();

  const { data, isLoading, refetch, isFetching } = useName(
    {
      // @ts-expect-error: query is disabled without an address
      address: address,
      chain: basenameChain,
    },
    {
      enabled: !!address && isAddress(address),
    },
  );

  const ensNameTyped = data ? (data as Basename) : undefined;

  return {
    data: ensNameTyped,
    isLoading,
    isFetching,
    refetch,
  };
}
