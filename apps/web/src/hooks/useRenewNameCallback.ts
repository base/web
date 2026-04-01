import { useErrors } from 'apps/web/contexts/Errors';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';
import { useRentPrice } from 'apps/web/src/hooks/useRentPrice';
import useWriteContractsWithLogs, {
  BatchCallsStatus,
} from 'apps/web/src/hooks/useWriteContractsWithLogs';
import useWriteContractWithReceipt, {
  WriteTransactionWithReceiptStatus,
} from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { secondsInYears } from 'apps/web/src/utils/secondsInYears';
import {
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
} from 'apps/web/src/utils/usernames';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

type UseRenewNameCallbackReturnType = {
  callback: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  value: bigint | undefined;
  years: number;
  batchCallsStatus: BatchCallsStatus;
  renewNameStatus: WriteTransactionWithReceiptStatus;
};

type UseRenewNameProps = {
  name: string;
  years: number;
};

export function useRenewNameCallback({
  name,
  years,
}: UseRenewNameProps): UseRenewNameCallbackReturnType {
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
  } = useWriteContractWithReceipt({
    chain: basenameChain,
    eventName: 'renew_name',
  });

  // Params
  const normalizedName = normalizeEnsDomainName(name);
  const { basePrice: value } = useRentPrice(normalizedName, years);

  const renewName = useCallback(async () => {
    if (!address) {
      throw new Error('No address found');
    }

    const renewRequest = [normalizedName, secondsInYears(years)];

    try {
      if (!paymasterServiceEnabled) {
        await initiateRenewName({
          abi: REGISTER_CONTRACT_ABI,
          address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
          functionName: 'renew',
          args: renewRequest,
          value,
        });
      } else {
        await initiateBatchCalls({
          contracts: [
            {
              abi: REGISTER_CONTRACT_ABI,
              address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
              functionName: 'renew',
              args: renewRequest,
              value,
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
    normalizedName,
    paymasterServiceEnabled,
    value,
    years,
  ]);

  return {
    callback: renewName,
    isPending: renewNameIsLoading || batchCallsIsLoading,
    error: renewNameError ?? batchCallsError,
    value,
    years,
    batchCallsStatus,
    renewNameStatus,
  };
}
