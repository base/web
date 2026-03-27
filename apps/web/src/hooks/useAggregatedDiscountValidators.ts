import {
  AttestationData,
  useBaseWorldAttestations,
  useBuildathonAttestations,
  useCheckCB1Attestations,
  useCheckCBIDAttestations,
  useCheckCoinbaseAttestations,
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

export function findFirstValidDiscount(
  aggregatedData: MappedDiscountData,
): DiscountData | undefined {
  const priorityOrder: Partial<Record<Discount, number>> & { default: 3 } = {
    [Discount.DISCOUNT_CODE]: 0,
    [Discount.CB1]: 1,
    default: 3,
  };

  const sortedDiscounts = Object.values(aggregatedData).sort((a, b) => {
    const aPriority = priorityOrder[a.discount] ?? priorityOrder.default;
    const bPriority = priorityOrder[b.discount] ?? priorityOrder.default;
    return aPriority - bPriority;
  });

  return sortedDiscounts.find((data) => data?.discountKey) ?? undefined;
}

export function useAggregatedDiscountValidators(code?: string) {
  const { data: activeDiscountValidators, isLoading: loadingActiveDiscounts } =
    useActiveDiscountValidators();
  const { data: CBIDData, loading: loadingCBIDAttestations } = useCheckCBIDAttestations();
  const { data: CB1Data, loading: loadingCB1Attestations } = useCheckCB1Attestations();
  const { data: coinbaseData, loading: loadingCoinbaseAttestations } =
    useCheckCoinbaseAttestations();
  const { data: SummerPassData, loading: loadingSummerPass } = useSummerPassAttestations();
  const { data: BuildathonData, loading: loadingBuildathon } = useBuildathonAttestations();
  const { data: DiscountCodeData, loading: loadingDiscountCode } =
    useDiscountCodeAttestations(code);
  const { data: TalentProtocolData, loading: loadingTalentProtocolAttestations } =
    useTalentProtocolAttestations();
  const { data: BaseWorldData, loading: loadingBaseWorld } = useBaseWorldAttestations();
  const { data: DevconData, loading: loadingDevcon } = useDevconAttestations();

  const loadingDiscounts =
    loadingCoinbaseAttestations ||
    loadingCBIDAttestations ||
    loadingCB1Attestations ||
    loadingActiveDiscounts ||
    loadingBuildathon ||
    loadingSummerPass ||
    loadingDiscountCode ||
    loadingTalentProtocolAttestations ||
    loadingBaseWorld ||
    loadingDevcon;

  const discountsToAttestationData = useMemo<MappedDiscountData>(() => {
    const discountMapping: MappedDiscountData = {};

    const activeValidators =
      activeDiscountValidators?.filter((validator) => validator.active) ?? [];

    activeValidators.forEach((validator) => {
      if (CBIDData && validator.discountValidator === CBIDData.discountValidatorAddress) {
        discountMapping[Discount.CBID] = { ...CBIDData, discountKey: validator.key };
      }
      if (CB1Data && validator.discountValidator === CB1Data.discountValidatorAddress) {
        discountMapping[Discount.CB1] = { ...CB1Data, discountKey: validator.key };
      }
      if (coinbaseData && validator.discountValidator === coinbaseData.discountValidatorAddress) {
        discountMapping[Discount.COINBASE_VERIFIED_ACCOUNT] = {
          ...coinbaseData,
          discountKey: validator.key,
        };
      }

      if (
        BuildathonData &&
        validator.discountValidator === BuildathonData.discountValidatorAddress
      ) {
        discountMapping[Discount.BASE_BUILDATHON_PARTICIPANT] = {
          ...BuildathonData,
          discountKey: validator.key,
        };
      }
      if (
        SummerPassData &&
        validator.discountValidator === SummerPassData.discountValidatorAddress
      ) {
        discountMapping[Discount.SUMMER_PASS_LVL_3] = {
          ...SummerPassData,
          discountKey: validator.key,
        };
      }

      if (
        DiscountCodeData &&
        validator.discountValidator === DiscountCodeData.discountValidatorAddress
      ) {
        discountMapping[Discount.DISCOUNT_CODE] = {
          ...DiscountCodeData,
          discountKey: validator.key,
        };
      }

      if (
        TalentProtocolData &&
        validator.discountValidator === TalentProtocolData.discountValidatorAddress
      ) {
        discountMapping[Discount.TALENT_PROTOCOL] = {
          ...TalentProtocolData,
          discountKey: validator.key,
        };
      }

      if (BaseWorldData && validator.discountValidator === BaseWorldData.discountValidatorAddress) {
        discountMapping[Discount.BASE_WORLD] = {
          ...BaseWorldData,
          discountKey: validator.key,
        };
      }

      if (DevconData && validator.discountValidator === DevconData.discountValidatorAddress) {
        discountMapping[Discount.DEVCON] = {
          ...DevconData,
          discountKey: validator.key,
        };
      }
    });

    return discountMapping;
  }, [
    activeDiscountValidators,
    CBIDData,
    CB1Data,
    coinbaseData,
    BuildathonData,
    SummerPassData,
    DiscountCodeData,
    TalentProtocolData,
    BaseWorldData,
    DevconData,
  ]);

  return {
    data: discountsToAttestationData,
    loading: loadingDiscounts,
    hasUsedADiscount: false,
  };
}
