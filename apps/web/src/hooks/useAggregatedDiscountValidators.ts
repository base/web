import {
  AttestationData,
  useBNSAttestations,
  useBaseDotEthAttestations,
  useBaseWorldAttestations,
  useBuildathonAttestations,
  useCheckCB1Attestations,
  useCheckCBIDAttestations,
  useCheckCoinbaseAttestations,
  useCheckEAAttestations,
  useDevconAttestations,
  useDiscountCodeAttestations,
  useSummerPassAttestations,
  useTalentProtocolAttestations,
} from 'apps/web/src/hooks/useAttestations';
import { useActiveDiscountValidators } from 'apps/web/src/hooks/useReadActiveDiscountValidators';
import { Discount } from 'apps/web/src/utils/usernames';
import { useMemo } from 'react';

export type DiscountData = AttestationData & { discountKey: `0x${string}` };
export type MappedDiscountData = Partial<Record<Discount, DiscountData>>;

export function findFirstValidDiscount(aggregatedData: MappedDiscountData): DiscountData | undefined {
  const priorityOrder: Partial<Record<Discount, number>> & { default: number } = {
    [Discount.DISCOUNT_CODE]: 0,
    [Discount.BNS_NAME]: 1,
    [Discount.CB1]: 2,
    default: 3,
  };

  return Object.values(aggregatedData)
    .sort((a, b) => {
      const aPriority = a?.discount ? priorityOrder[a.discount] ?? priorityOrder.default : priorityOrder.default;
      const bPriority = b?.discount ? priorityOrder[b.discount] ?? priorityOrder.default : priorityOrder.default;
      return aPriority - bPriority;
    })
    .find((data) => data?.discountKey);
}

export function useAggregatedDiscountValidators(code?: string) {
  const { data: activeDiscountValidators, isLoading: loadingValidators } = useActiveDiscountValidators();

  const hooks = [
    { hook: useCheckCBIDAttestations, key: Discount.CBID },
    { hook: useCheckCB1Attestations, key: Discount.CB1 },
    { hook: useCheckEAAttestations, key: Discount.EARLY_ACCESS },
    { hook: useCheckCoinbaseAttestations, key: Discount.COINBASE_VERIFIED_ACCOUNT },
    { hook: useSummerPassAttestations, key: Discount.SUMMER_PASS_LVL_3 },
    { hook: useBuildathonAttestations, key: Discount.BASE_BUILDATHON_PARTICIPANT },
    { hook: useBaseDotEthAttestations, key: Discount.BASE_DOT_ETH_NFT },
    { hook: useBNSAttestations, key: Discount.BNS_NAME },
    { hook: () => useDiscountCodeAttestations(code), key: Discount.DISCOUNT_CODE },
    { hook: useTalentProtocolAttestations, key: Discount.TALENT_PROTOCOL },
    { hook: useBaseWorldAttestations, key: Discount.BASE_WORLD },
    { hook: useDevconAttestations, key: Discount.DEVCON },
  ];

  const results = hooks.map(({ hook }) => hook());
  const loadingDiscounts = results.some((res) => res.loading) || loadingValidators;

  const discountsToAttestationData = useMemo<MappedDiscountData>(() => {
    const mapping: MappedDiscountData = {};
    const active = activeDiscountValidators?.filter((v) => v.active) ?? [];

    hooks.forEach(({ key }, i) => {
      const result = results[i];
      const attestation = result?.data;
      if (!attestation) return;

      const validator = active.find((v) => v.discountValidator === attestation.discountValidatorAddress);
      if (validator) {
        mapping[key] = { ...attestation, discountKey: validator.key };
      }
    });

    return mapping;
  }, [activeDiscountValidators, ...results.map((r) => r.data)]);

  const hasUsedADiscount = Object.values(discountsToAttestationData).some((d) => !!d?.discountKey);

  return {
    data: discountsToAttestationData,
    loading: loadingDiscounts,
    hasUsedADiscount,
  };
}
