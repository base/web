import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import { decodeRawLog, USER_OPERATION_EVENT_LOG_NAME } from 'apps/web/src/utils/transactionLogs';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useState } from 'react';
import { Chain, TransactionReceipt } from 'viem';
import { WriteContractsParameters } from 'viem/experimental';
import { useAccount, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi';
import { useCallsStatus, useWriteContracts } from 'wagmi/experimental';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';

/*
  A hook to request and track a wallet write transaction

  Responsibilities:
  - InitiateBatchCalls to start the flow (write multiple contracts)
  - Keep track of the batchCall status with useCallsStatus
  - Keep track of the batchCall transactionReceipt with useWaitForTransactionReceipt
  - Check that transactionReceipt.status is 'success'
  - Get and parse the logs from transactionReceipt
  - Find and decode the 'UserOperationEvent' log
  - Check that the decodedLog.args.success === true

  - Requirement for a "true" batch calls success:
  -- statusStatus.data === 'CONFIRMED'
  -- transactionReceipt.status === 'success' 
  -- decodedUserOperationEventLog.args.success === true
*/

export enum BatchCallsStatus {
  // Wallet request
  Idle = 'idle',
  Initiated = 'initiated',
  Approved = 'approved',
  Canceled = 'canceled',

  // Top transaction
  Processing = 'processing',
  Reverted = 'reverted',

  // UserOperationEvent and top transaction are successful
  Failed = 'failed',
  Success = 'success',
}

export type UseWriteContractsWithLogsProps = {
  chain: Chain;
  eventName: string;
};

export type UseWriteContractsWithLogsReturn = {
  initiateBatchCalls: (writeContractParameters: WriteContractsParameters) => Promise<void>;
  batchCallTransactionReceiptHash: string | undefined;
  batchCallsStatus: BatchCallsStatus;
  transactionReceipt: TransactionReceipt | undefined;
  batchCallTransactionHash: string | undefined;
  batchCallsIsLoading: boolean;
  batchCallsIsSuccess: boolean;
  batchCallsIsError: boolean;
  batchCallsError: Error | null;
  batchCallsEnabled: boolean;
};

export default function useWriteContractsWithLogs({
  chain,
  eventName,
}: UseWriteContractsWithLogsProps): UseWriteContractsWithLogsReturn {
  // Errors & Analytics
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();
  const { atomicBatch: atomicBatchEnabled, paymasterCapabilities } = useCapabilitiesSafe({
    chainId: chain.id,
  });
  const { chain: connectedChain } = useAccount();

  const [batchCallsStatus, setBatchCallsStatus] = useState<BatchCallsStatus>(BatchCallsStatus.Idle);

  // Write the contract
  const {
    writeContractsAsync,
    data: sendCallsId,
    isPending: sendCallsIsPending,
    isSuccess: sendCallsIsSuccess,
    isError: sendCallsIsError,
    error: sendCallsError,
  } = useWriteContracts();

  // Experimental: Track batch call status
  const { data: sendCallsResult, isFetching: sendCallsResultIsFetching } = useCallsStatus({
    // @ts-expect-error: We can expect sendCallsId to be undefined since we're only enabling the query when defined
    id: sendCallsId,
    query: {
      enabled: !!sendCallsId && atomicBatchEnabled,
      refetchInterval: 5000, // todo: smarter
    },
  });

  // Transaction receipt (without .status)
  const batchCallTransactionReceipts = sendCallsResult?.receipts ?? [];
  const batchCallTransactionReceipt = batchCallTransactionReceipts[0];
  const batchCallTransactionReceiptHash = batchCallTransactionReceipt?.transactionHash;

  // Wait for transaction receipt (with correct .status)
  const {
    data: transactionReceipt,
    isFetching: transactionReceiptIsFetching,
    isSuccess: transactionReceiptIsSuccess,
    isError: transactionReceiptIsError,
    error: transactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash: batchCallTransactionReceiptHash,
    chainId: chain.id,
    query: {
      enabled: !!batchCallTransactionReceiptHash,
    },
  });

  const { switchChainAsync } = useSwitchChain();

  const initiateBatchCalls = useCallback(
    async (writeContractParameters: WriteContractsParameters) => {
      if (!atomicBatchEnabled) {
        const error = new Error("Wallet doesn't support sendCalls");
        logError(error, `${eventName}_batch_calls_not_supported`);
        throw error;
      }

      if (!connectedChain) {
        const error = new Error('Wallet not connected');
        logError(error, `${eventName}_transaction_no_wallet`);
        throw error;
      }
      if (connectedChain.id !== chain.id) {
        await switchChainAsync({ chainId: chain.id });
      }
      try {
        setBatchCallsStatus(BatchCallsStatus.Initiated);
        logEventWithContext(`${eventName}_transaction_initiated`, ActionType.change);

        await writeContractsAsync({
          ...writeContractParameters,
          capabilities: paymasterCapabilities,
        });

        logEventWithContext(`${eventName}_transaction_approved`, ActionType.change);
        setBatchCallsStatus(BatchCallsStatus.Approved);
      } catch (error) {
        logError(error, `${eventName}_transaction_canceled`);
        setBatchCallsStatus(BatchCallsStatus.Canceled);
      }
    },
    [
      atomicBatchEnabled,
      connectedChain,
      chain.id,
      switchChainAsync,
      logEventWithContext,
      eventName,
      writeContractsAsync,
      logError,
      paymasterCapabilities,
    ],
  );

  // Track onchain success or reverted state
  useEffect(() => {
    // Onchain TransactionReceipt Fetching
    if (transactionReceiptIsFetching) {
      setBatchCallsStatus(BatchCallsStatus.Processing);
      logEventWithContext(`${eventName}_transaction_processing`, ActionType.change);
      return;
    }

    // Onchain TransactionReceipt Reverted
    if (transactionReceipt?.status === 'reverted') {
      logEventWithContext(`${eventName}_transaction_reverted`, ActionType.change);
      setBatchCallsStatus(BatchCallsStatus.Reverted);
      return;
    }

    // Onchain TransactionReceipt Successful with logs
    if (transactionReceipt?.status === 'success' && sendCallsResult?.receipts?.length) {
      const logs = transactionReceipt.logs;
      const decodedUserOperationEventLog = logs
        .map(decodeRawLog)
        .find((decodedLog) => decodedLog?.eventName === USER_OPERATION_EVENT_LOG_NAME);

      if (decodedUserOperationEventLog) {
        logEventWithContext(`${eventName}_transaction_success`, ActionType.change);
        setBatchCallsStatus(
          decodedUserOperationEventLog.args.success
            ? BatchCallsStatus.Success
            : BatchCallsStatus.Failed,
        );
      }

      return;
    }
  }, [
    eventName,
    logEventWithContext,
    sendCallsResult?.receipts?.length,
    transactionReceipt,
    transactionReceiptIsFetching,
  ]);

  const batchCallsIsLoading =
    sendCallsIsPending ||
    transactionReceiptIsFetching ||
    sendCallsResultIsFetching ||
    sendCallsResult?.status === 'PENDING';
  const batchCallsIsSuccess = sendCallsIsSuccess && transactionReceiptIsSuccess;
  const batchCallsIsError = sendCallsIsError || transactionReceiptIsError;
  const batchCallsError = sendCallsError ?? transactionReceiptError;

  return {
    initiateBatchCalls,
    batchCallTransactionReceiptHash,
    batchCallsStatus,
    transactionReceipt,
    batchCallTransactionHash: transactionReceipt?.transactionHash,
    batchCallsIsLoading,
    batchCallsIsSuccess,
    batchCallsIsError,
    batchCallsError,
    batchCallsEnabled: atomicBatchEnabled,
  };
}
