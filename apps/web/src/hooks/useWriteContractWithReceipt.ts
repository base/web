import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useState } from 'react';
import { Chain, ContractFunctionParameters } from 'viem';
import { useAccount, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

/*
  A hook to request and track a wallet write transaction

  Responsibilities:
  - Track the wallet request status
  - Track the transaction receipt and status
  - Log analytics & error
*/

export enum WriteTransactionWithReceiptStatus {
  Idle = 'idle',

  // Wallet transaction
  Initiated = 'initiated',
  Canceled = 'canceled',
  Approved = 'approved',

  // On-chain status
  Processing = 'processing',
  Reverted = 'reverted',
  Success = 'success',
}

export type UseWriteContractWithReceiptProps = {
  chain: Chain;
  eventName: string;
};

export default function useWriteContractWithReceipt({
  chain,
  eventName,
}: UseWriteContractWithReceiptProps) {
  // Errors & Analytics
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();

  const { chain: connectedChain } = useAccount();

  const [transactionStatus, setTransactionStatus] = useState<WriteTransactionWithReceiptStatus>(
    WriteTransactionWithReceiptStatus.Idle,
  );

  // Write TextRecords
  const {
    data: transactionHash,
    writeContractAsync: writeContractMutation,
    isPending: writeContractIsPending,
    isError: writeContractIsError,
    error: writeContractError,
    isSuccess: writeContractIsSuccess,
    reset: writeContractReset,
  } = useWriteContract();

  // Wait for TextRecords transaction to be processed
  const {
    data: transactionReceipt,
    isFetching: transactionReceiptIsFetching,
    isSuccess: transactionReceiptIsSuccess,
    isError: transactionReceiptIsError,
    error: transactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
    chainId: chain.id,
    query: {
      enabled: !!transactionHash,
    },
  });

  const { switchChainAsync } = useSwitchChain();

  const initiateTransaction = useCallback(
    async (contractParameters: ContractFunctionParameters) => {
      if (!connectedChain) {
        const error = new Error('Wallet not connected');
        logError(error, `${eventName}_transaction_no_wallet`);
        throw error;
      }
      if (connectedChain.id !== chain.id) {
        await switchChainAsync({ chainId: chain.id });
      }
      try {
        setTransactionStatus(WriteTransactionWithReceiptStatus.Initiated);
        logEventWithContext(`${eventName}_transaction_initiated`, ActionType.change);
        await writeContractMutation(contractParameters);

        logEventWithContext(`${eventName}_transaction_approved`, ActionType.change);
        setTransactionStatus(WriteTransactionWithReceiptStatus.Approved);
      } catch (error) {
        logError(error, `${eventName}_transaction_canceled`);
        setTransactionStatus(WriteTransactionWithReceiptStatus.Canceled);
      }
    },
    [
      chain.id,
      connectedChain,
      eventName,
      logError,
      logEventWithContext,
      switchChainAsync,
      writeContractMutation,
    ],
  );

  // Track processing onchain
  useEffect(() => {
    if (transactionReceiptIsFetching) {
      setTransactionStatus(WriteTransactionWithReceiptStatus.Processing);
      logEventWithContext(`${eventName}_transaction_processing`, ActionType.change);
    }
  }, [eventName, logEventWithContext, transactionReceiptIsFetching]);

  // Track onchain success or reverted state
  useEffect(() => {
    if (transactionReceipt?.status === 'success') {
      logEventWithContext(`${eventName}_transaction_success`, ActionType.change);
      setTransactionStatus(WriteTransactionWithReceiptStatus.Success);
      writeContractReset();
      return;
    }

    if (transactionReceipt?.status === 'reverted') {
      logEventWithContext(`${eventName}_transaction_reverted`, ActionType.change);

      setTransactionStatus(WriteTransactionWithReceiptStatus.Reverted);
      return;
    }
  }, [
    eventName,
    logEventWithContext,
    transactionReceipt,
    transactionReceiptIsFetching,
    writeContractReset,
  ]);

  const transactionIsLoading = writeContractIsPending || transactionReceiptIsFetching;
  const transactionIsSuccess = writeContractIsSuccess && transactionReceiptIsSuccess;
  const transactionIsError = writeContractIsError || transactionReceiptIsError;
  const transactionError = writeContractError ?? transactionReceiptError;

  return {
    initiateTransaction,
    transactionHash,
    transactionStatus,
    transactionReceipt,
    transactionIsLoading,
    transactionIsSuccess,
    transactionIsError,
    transactionError,
  };
}
