import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESSES } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';
import { Address } from 'viem';
import { useReadContract } from 'wagmi';

export type DiscountValidator = {
  active: boolean; // whether the discount is active or not.
  discountValidator: Address; // address of the associated validator
  key: `0x${string}`; // unique key that identifies this discount
  discount: bigint; // discount value denominated in wei
};

export function useActiveDiscountValidators() {
  const { basenameChain } = useBasenameChain();
  const activeDiscountsArgs = useMemo(
    () => ({
      address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
      abi: REGISTER_CONTRACT_ABI,
      functionName: 'getActiveDiscounts' as const,
      chainId: basenameChain.id,
    }),
    [basenameChain.id],
  );

  const { data, isLoading } = useReadContract(activeDiscountsArgs);

  return { data: data as DiscountValidator[] | null, isLoading };
}
