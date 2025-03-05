import { useErrors } from 'apps/web/contexts/Errors';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import { BaseEnsNameData } from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import useWriteContractWithReceipt from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { UsernameTextRecords, UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { namehash, encodeFunctionData } from 'viem';

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

export default function useWriteBaseEnsTextRecords({
  username,
  onSuccess,
}: UseWriteBaseEnsTextRecordsProps) {
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
      const updatedValueValue = updatedTextRecords[key].trim();

      return existingValue != updatedValueValue;
    });
  }, [existingTextRecords, updatedTextRecords]);

  // Track hasChanged as a boolean
  const hasChanged = useMemo(() => {
    return keysToUpdate.length !== 0;
  }, [keysToUpdate.length]);

  const { basenameChain } = useBasenameChain();

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
      address: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
      args: [nameHash, textRecordsBytes],
      functionName: 'multicallWithNodeCheck',
    });
  }, [
    basenameChain.id,
    hasChanged,
    initiateWriteTextRecords,
    keysToUpdate,
    onSuccess,
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
