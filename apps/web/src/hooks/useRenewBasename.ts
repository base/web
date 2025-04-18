import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';
import { useRentPrice } from 'apps/web/src/hooks/useRentPrice';
import useWriteContractsWithLogs from 'apps/web/src/hooks/useWriteContractsWithLogs';
import useWriteContractWithReceipt from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { secondsInYears } from 'apps/web/src/utils/secondsInYears';
import {
  formatBaseEthDomain,
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
} from 'apps/web/src/utils/usernames';
import { useCallback } from 'react';
import { encodeFunctionData, namehash } from 'viem';
import { useAccount, useSwitchChain } from 'wagmi';

type UseRenewBasenameProps = {
  name: string;
  years: number;
};

export function useRenewBasename({ name, years }: UseRenewBasenameProps) {
  const { logError } = useErrors();
  const { address } = useAccount();
  const { basenameChain } = useBasenameChain();
  const { paymasterService: paymasterServiceEnabled } = useCapabilitiesSafe({
    chainId: basenameChain.id,
  });

  // Transaction with paymaster enabled
  const { initiateBatchCalls, batchCallsStatus, batchCallsIsLoading, batchCallsError } =
    useWriteContractsWithLogs({
      chain: basenameChain,
      eventName: 'renew_name',
    });

  // Transaction without paymaster
  const {
    initiateTransaction: initiateRenewName,
    transactionStatus: renewNameStatus,
    transactionIsLoading: renewNameIsLoading,
    transactionError: renewNameError,
  } = useWriteContractWithReceipt<typeof REGISTER_CONTRACT_ABI, 'renew'>({
    chain: basenameChain,
    eventName: 'renew_name',
  });

  // Params
  const normalizedName = normalizeEnsDomainName(name);
  const { basePrice, premiumPrice } = useRentPrice(normalizedName, years);
  const totalPrice = basePrice + premiumPrice;

  // Callback
  const renewName = useCallback(async () => {
    if (!address) {
      return;
    }

    const renewRequest = [normalizedName, secondsInYears(years)];

    try {
      if (!paymasterServiceEnabled) {
        console.log('Renewing name without paymaster', {
          renewRequest,
          totalPrice,
          contractAddress: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
        });
        await initiateRenewName({
          abi: REGISTER_CONTRACT_ABI,
          address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
          functionName: 'renew',
          args: renewRequest,
          value: totalPrice,
        });
      } else {
        console.log('Renewing name with paymaster');
        await initiateBatchCalls({
          contracts: [
            {
              abi: REGISTER_CONTRACT_ABI,
              address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
              functionName: 'renew',
              args: renewRequest,
              value: totalPrice,
            },
          ],
          account: address,
          chain: basenameChain,
        });
      }
    } catch (e) {
      logError(e, 'Renew name transaction canceled');
    }
  }, [
    address,
    basenameChain,
    initiateBatchCalls,
    initiateRenewName,
    logError,
    name,
    normalizedName,
    paymasterServiceEnabled,
    totalPrice,
    years,
  ]);

  return {
    callback: renewName,
    totalPrice,
    basePrice,
    premiumPrice,
    isPending: renewNameIsLoading || batchCallsIsLoading,
    error: renewNameError ?? batchCallsError,
    renewNameStatus,
    batchCallsStatus,
  };
}
