import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import {
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
} from 'apps/web/src/utils/usernames';
import { useReadContract } from 'wagmi';

function secondsInYears(years: number) {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

export function useDiscountedNameRegistrationPrice(
  name: string,
  years: number,
  discountKey: `0x${string}` | undefined,
) {
  const normalizedName = normalizeEnsDomainName(name);
  const { basenameChain } = useBasenameChain();
  return useReadContract({
    address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
    abi: REGISTER_CONTRACT_ABI,
    functionName: 'discountedRegisterPrice',
    args: [normalizedName, secondsInYears(years), discountKey ?? '0x'],
    chainId: basenameChain.id,
  });
}

export function useNameRegistrationPrice(name: string, years: number) {
  const normalizedName = normalizeEnsDomainName(name);
  const { basenameChain } = useBasenameChain();
  return useReadContract({
    address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
    abi: REGISTER_CONTRACT_ABI,
    functionName: 'registerPrice',
    args: [normalizedName, secondsInYears(years)],
    chainId: basenameChain.id,
  });
}
