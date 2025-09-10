import ReverseRegistrarAbi from 'apps/web/src/abis/ReverseRegistrarAbi';
import {
  USERNAME_L2_RESOLVER_ADDRESSES,
  USERNAME_L2_REVERSE_REGISTRAR_ADDRESSES,
  USERNAME_REVERSE_REGISTRAR_ADDRESSES,
} from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useCallback, useEffect } from 'react';
import { Basename } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { useErrors } from 'apps/web/contexts/Errors';
import useWriteContractWithReceipt from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import useWriteContractsWithLogs from 'apps/web/src/hooks/useWriteContractsWithLogs';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';
import L2ReverseRegistrarAbi from 'apps/web/src/abis/L2ReverseRegistrarAbi';

/*
  A hook to set a name as primary for resolution.

  Responsibilities:
  - Get and validate the primary username against the new username
  - Write the new name to the contract & Wait for the transaction to be processed
  - Refetch basename on successful request
*/

type UseSetPrimaryBasenameProps = {
  secondaryUsername: Basename;
};

export default function useSetPrimaryBasename({ secondaryUsername }: UseSetPrimaryBasenameProps) {
  const { address } = useAccount();
  const { logError } = useErrors();

  const { currentWalletIsProfileEditor } = useUsernameProfile();
  const { basenameChain: secondaryUsernameChain } = useBasenameChain(secondaryUsername);
  const { paymasterService: paymasterServiceEnabled } = useCapabilitiesSafe({
    chainId: secondaryUsernameChain.id,
  });

  // Get current primary username
  // Note: This is sometimes undefined
  const {
    data: primaryUsername,
    refetch: refetchPrimaryUsername,
    isLoading: primaryUsernameIsLoading,
    isFetching: primaryUsernameIsFetching,
  } = useBaseEnsName({
    address: address,
  });

  const usernamesDiffer = secondaryUsername !== primaryUsername;
  const canSetUsernameAsPrimary = usernamesDiffer && currentWalletIsProfileEditor;

  const { initiateTransaction, transactionIsLoading, transactionIsSuccess } =
    useWriteContractWithReceipt({
      chain: secondaryUsernameChain,
      eventName: 'update_primary_name',
    });

  const { initiateBatchCalls, batchCallsIsSuccess, batchCallsIsLoading } =
    useWriteContractsWithLogs({
      chain: secondaryUsernameChain,
      eventName: 'update_primary_name',
    });

  useEffect(() => {
    if (transactionIsSuccess) {
      refetchPrimaryUsername()
        .then()
        .catch((error) => logError(error, 'failed to refetch username'));
    }
  }, [logError, refetchPrimaryUsername, transactionIsSuccess]);

  const setPrimaryName = useCallback(async (): Promise<boolean | undefined> => {
    // Already primary
    if (secondaryUsername === primaryUsername) return undefined;

    // No user is connected
    if (!address) return undefined;

    try {
      if (!paymasterServiceEnabled) {
        await initiateTransaction({
          abi: ReverseRegistrarAbi,
          address: USERNAME_REVERSE_REGISTRAR_ADDRESSES[secondaryUsernameChain.id],
          args: [
            address,
            address,
            USERNAME_L2_RESOLVER_ADDRESSES[secondaryUsernameChain.id],
            secondaryUsername,
          ],
          functionName: 'setNameForAddr',
        });
      } else {
        await initiateBatchCalls({
          contracts: [
            {
              abi: ReverseRegistrarAbi,
              address: USERNAME_REVERSE_REGISTRAR_ADDRESSES[secondaryUsernameChain.id],
              args: [
                address,
                address,
                USERNAME_L2_RESOLVER_ADDRESSES[secondaryUsernameChain.id],
                secondaryUsername,
              ],
              functionName: 'setNameForAddr',
            },
            {
              abi: L2ReverseRegistrarAbi,
              address: USERNAME_L2_REVERSE_REGISTRAR_ADDRESSES[secondaryUsernameChain.id],
              functionName: 'setName',
              args: [secondaryUsername],
            },
          ],
          account: address,
          chain: secondaryUsernameChain,
        });
      }
    } catch (error) {
      logError(error, 'Set primary name transaction canceled');
      return undefined;
    }

    return true;
  }, [
    secondaryUsername,
    primaryUsername,
    address,
    paymasterServiceEnabled,
    initiateTransaction,
    secondaryUsernameChain,
    initiateBatchCalls,
    logError,
  ]);

  const isLoading =
    transactionIsLoading ||
    batchCallsIsLoading ||
    primaryUsernameIsLoading ||
    primaryUsernameIsFetching;

  return {
    setPrimaryName,
    canSetUsernameAsPrimary,
    isLoading,
    transactionIsSuccess: transactionIsSuccess || batchCallsIsSuccess,
  };
}
