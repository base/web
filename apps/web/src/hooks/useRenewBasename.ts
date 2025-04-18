import { useErrors } from 'apps/web/contexts/Errors';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';
import { useRentPrice } from 'apps/web/src/hooks/useRentPrice';
import useWriteContractsWithLogs from 'apps/web/src/hooks/useWriteContractsWithLogs';
import useWriteContractWithReceipt from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { secondsInYears } from 'apps/web/src/utils/secondsInYears';
import {
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
} from 'apps/web/src/utils/usernames';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

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
  const { basePrice: price } = useRentPrice(normalizedName, years);

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
          price,
          contractAddress: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
        });
        await initiateRenewName({
          abi: REGISTER_CONTRACT_ABI,
          address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
          functionName: 'renew',
          args: renewRequest,
          value: price,
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
              value: price,
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
    price,
    years,
  ]);

  return {
    callback: renewName,
    price,
    isPending: renewNameIsLoading || batchCallsIsLoading,
    error: renewNameError ?? batchCallsError,
    renewNameStatus,
    batchCallsStatus,
  };
}
