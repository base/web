import { useErrors } from 'apps/web/contexts/Errors';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import useBasenameResolver from 'apps/web/src/hooks/useBasenameResolver';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import { BaseEnsNameData } from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import useWriteContractWithReceipt from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { UsernameTextRecords, UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { useCallback, useEffect, useMemo, useState, Dispatch, SetStateAction } from 'react';
import { namehash, encodeFunctionData } from 'viem';
import { Basename } from '@coinbase/onchainkit/identity';

export type UseWriteBaseEnsTextRecordsProps = {
  username: BaseEnsNameData;
  onSuccess?: () => void;
};

/*
  A hook to set update TextRecords in a batch

  Responsibilities:
  - Get existing TextRecords
  - Keep track of TextRecords updates
  - Wait for the transaction to be processed
  - Refetch records on successful request  
  - Log errors and analytics accordingly

*/

export type UseWriteBaseEnsTextRecordsReturn = {
  existingTextRecords: UsernameTextRecords;
  updateTextRecords: (key: UsernameTextRecordKeys, value: string) => void;
  updatedTextRecords: UsernameTextRecords;
  setUpdatedTextRecords: Dispatch<SetStateAction<UsernameTextRecords>>;
  writeTextRecords: () => Promise<void>;
  hasChanged: boolean;
  writeTextRecordsIsPending: boolean;
  writeTextRecordsIsError: boolean;
  writeTextRecordsError: unknown;
};

export default function useWriteBaseEnsTextRecords({
  username,
  onSuccess,
}: UseWriteBaseEnsTextRecordsProps): UseWriteBaseEnsTextRecordsReturn {
  // Errors
  const { logError } = useErrors();

  // Fetch existing TextRecords
  const { existingTextRecords, existingTextRecordsIsLoading, refetchExistingTextRecords } =
    useReadBaseEnsTextRecords({
      username,
    });

  // Save a copy of updated TextRecords
  const [updatedTextRecords, setUpdatedTextRecords] =
    useState<UsernameTextRecords>(existingTextRecords);
  useEffect(() => {
    setUpdatedTextRecords(existingTextRecords);
  }, [existingTextRecords]);

  const updateTextRecords = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      setUpdatedTextRecords((previousTextRecords) => ({
        ...previousTextRecords,
        [key]: value,
      }));
    },
    [setUpdatedTextRecords],
  );

  // Track keys that have changed
  const keysToUpdate = useMemo(() => {
    const keys: UsernameTextRecordKeys[] = Object.keys(
      updatedTextRecords,
    ) as UsernameTextRecordKeys[];
    return keys.filter((key) => {
      const existingValue = existingTextRecords[key].trim();
      const updatedValue = updatedTextRecords[key].trim();

      return existingValue != updatedValue;
    });
  }, [existingTextRecords, updatedTextRecords]);

  // Track hasChanged as a boolean
  const hasChanged = useMemo(() => {
    return keysToUpdate.length !== 0;
  }, [keysToUpdate.length]);

  const { basenameChain } = useBasenameChain();

  const { data: resolverAddress } = useBasenameResolver({ username: username as Basename });

  const {
    initiateTransaction: initiateWriteTextRecords,
    transactionIsLoading: writeTextRecordsTransactionIsLoading,
    transactionIsSuccess: writeTextRecordsTransactionIsSuccess,
    transactionIsError: writeTextRecordsTransactionIsError,
    transactionError: writeTextRecordsTransactionError,
  } = useWriteContractWithReceipt({
    chain: basenameChain,
    eventName: 'update_text_records',
  });

  const { refetch: refetchBaseEnsAvatar } = useBaseEnsAvatar({
    name: username,
  });

  const writeTextRecords = useCallback(async () => {
    if (!username) return Promise.reject(new Error('Cannot write text records without a name'));
    if (!hasChanged) return onSuccess?.();
    if (!resolverAddress)
      return Promise.reject(new Error('Cannot write text records without a resolver address'));

    const nameHash = namehash(username);

    const textRecordsBytes = keysToUpdate.map((key) => {
      const value = updatedTextRecords[key];

      return encodeFunctionData({
        abi: L2ResolverAbi,
        functionName: 'setText',
        args: [nameHash, key, value.trim()],
      });
    });

    await initiateWriteTextRecords({
      abi: L2ResolverAbi,
      address: resolverAddress,
      args: [nameHash, textRecordsBytes],
      functionName: 'multicallWithNodeCheck',
    });
  }, [
    hasChanged,
    initiateWriteTextRecords,
    keysToUpdate,
    onSuccess,
    resolverAddress,
    updatedTextRecords,
    username,
  ]);

  useEffect(() => {
    if (writeTextRecordsTransactionIsSuccess) {
      onSuccess?.();

      refetchBaseEnsAvatar().catch((error) => {
        logError(error, 'Failed to refetch avatar');
      });

      refetchExistingTextRecords().catch((error) => {
        logError(error, 'Failed to refetch textRecords');
      });
    }
  }, [
    logError,
    onSuccess,
    refetchBaseEnsAvatar,
    refetchExistingTextRecords,
    writeTextRecordsTransactionIsSuccess,
  ]);

  return {
    existingTextRecords,
    updateTextRecords,
    updatedTextRecords,
    setUpdatedTextRecords,
    writeTextRecords,
    hasChanged,
    writeTextRecordsIsPending: writeTextRecordsTransactionIsLoading || existingTextRecordsIsLoading,
    writeTextRecordsIsError: writeTextRecordsTransactionIsError,
    writeTextRecordsError: writeTextRecordsTransactionError,
  };
}
