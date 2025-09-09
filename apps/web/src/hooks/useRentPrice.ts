import { UPGRADEABLE_REGISTRAR_CONTROLLER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useReadContract } from 'wagmi';
import { base } from 'viem/chains';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import UpgradeableRegistrarControllerAbi from 'apps/web/src/abis/UpgradeableRegistrarControllerAbi';

function secondsInYears(years: number) {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

type RentPriceResponseType = {
  data: {
    base: bigint;
    premium: bigint;
  };
};

export function useRentPrice(name: string, years: number) {
  const normalizedName = normalizeEnsDomainName(name);

  const { data }: RentPriceResponseType = useReadContract({
    abi: UpgradeableRegistrarControllerAbi,
    address: UPGRADEABLE_REGISTRAR_CONTROLLER_ADDRESSES[base.id],
    functionName: 'rentPrice',
    args: [normalizedName, secondsInYears(years)],
    chainId: base.id,
  });

  const basePrice = data?.base;
  const premiumPrice = data?.premium;

  return { basePrice, premiumPrice };
}
