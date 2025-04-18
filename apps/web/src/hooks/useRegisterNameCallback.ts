import { useErrors } from 'apps/web/contexts/Errors';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';
import useWriteContractsWithLogs, { BatchCallsStatus } from 'apps/web/src/hooks/useWriteContractsWithLogs';
import useWriteContractWithReceipt, { WriteTransactionWithReceiptStatus } from 'apps/web/src/hooks/useWriteContractWithReceipt';
import {
  formatBaseEthDomain,
  IS_EARLY_ACCESS,
  normalizeEnsDomainName,
  REGISTER_CONTRACT_ABI,
  REGISTER_CONTRACT_ADDRESSES,
} from 'apps/web/src/utils/usernames';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { encodeFunctionData, namehash } from 'viem';
import { useAccount } from 'wagmi';

type UseRegisterNameCallbackReturnType = {
  callback: () => Promise<void>;
  isPending: boolean;
  error: Error | null;
  reverseRecord: boolean;
  setReverseRecord: Dispatch<SetStateAction<boolean>>
  hasExistingBasename: boolean;
  batchCallsStatus: BatchCallsStatus;
  registerNameStatus: WriteTransactionWithReceiptStatus;
}

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

export function useRegisterNameCallback(
  name: string,
  value: bigint | undefined,
  years: number,
  discountKey?: `0x${string}`,
  validationData?: `0x${string}`,
): UseRegisterNameCallbackReturnType {
  const { address } = useAccount();
  const { basenameChain } = useBasenameChain();
  const { logError } = useErrors();
  const { paymasterService: paymasterServiceEnabled } = useCapabilitiesSafe({
    chainId: basenameChain.id,
  });

  // If user has a basename, reverse record is set to false
  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address,
  });

  const hasExistingBasename = useMemo(
    () => !baseEnsNameIsLoading && !!baseEnsName,
    [baseEnsName, baseEnsNameIsLoading],
  );

  const [reverseRecord, setReverseRecord] = useState<boolean>(!hasExistingBasename);

  // Transaction with paymaster enabled
  const { initiateBatchCalls, batchCallsStatus, batchCallsIsLoading, batchCallsError } =
    useWriteContractsWithLogs({
      chain: basenameChain,
      eventName: 'register_name',
    });

  // Transaction without paymaster
  const {
    initiateTransaction: initiateRegisterName,
    transactionStatus: registerNameStatus,
    transactionIsLoading: registerNameIsLoading,
    transactionError: registerNameError,
  } = useWriteContractWithReceipt<typeof REGISTER_CONTRACT_ABI, 'register'>({
    chain: basenameChain,
    eventName: 'register_name',
  });

  // Params
  const normalizedName = normalizeEnsDomainName(name);
  const isDiscounted = Boolean(discountKey && validationData);

  // Callback
  const registerName = useCallback(async () => {
    if (!address) return;

    const addressData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setAddr',
      args: [namehash(formatBaseEthDomain(name, basenameChain.id)), address],
    });

    const nameData = encodeFunctionData({
      abi: L2ResolverAbi,
      functionName: 'setName',
      args: [
        namehash(formatBaseEthDomain(name, basenameChain.id)),
        formatBaseEthDomain(name, basenameChain.id),
      ],
    });

    const registerRequest = {
      name: normalizedName, // The name being registered.
      owner: address, // The address of the owner for the name.
      duration: secondsInYears(years), // The duration of the registration in seconds.
      resolver: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id], // The address of the resolver to set for this name.
      data: [addressData, nameData], //  Multicallable data bytes for setting records in the associated resolver upon registration.
      reverseRecord, // Bool to decide whether to set this name as the "primary" name for the `owner`.
    };

    try {
      if (!paymasterServiceEnabled) {
        await initiateRegisterName({
          abi: REGISTER_CONTRACT_ABI,
          address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
          functionName: isDiscounted || IS_EARLY_ACCESS ? 'discountedRegister' : 'register',
          args: isDiscounted ? [registerRequest, discountKey, validationData] : [registerRequest],
          value,
        });
      } else {
        await initiateBatchCalls({
          contracts: [
            {
              abi: REGISTER_CONTRACT_ABI,
              address: REGISTER_CONTRACT_ADDRESSES[basenameChain.id],
              functionName: isDiscounted || IS_EARLY_ACCESS ? 'discountedRegister' : 'register',
              args: isDiscounted
                ? [registerRequest, discountKey, validationData]
                : [registerRequest],
              value,
            },
          ],
          account: address,
          chain: basenameChain,
        });
      }
    } catch (e) {
      logError(e, 'Register name transaction canceled');
    }
  }, [
    address,
    basenameChain,
    discountKey,
    initiateBatchCalls,
    initiateRegisterName,
    isDiscounted,
    logError,
    name,
    normalizedName,
    paymasterServiceEnabled,
    reverseRecord,
    validationData,
    value,
    years,
  ]);

  return {
    callback: registerName,
    isPending: registerNameIsLoading || batchCallsIsLoading,
    error: registerNameError ?? batchCallsError,
    reverseRecord,
    setReverseRecord,
    hasExistingBasename,
    batchCallsStatus,
    registerNameStatus,
  };
}
