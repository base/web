import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useState } from 'react';
import { Abi, Chain, ContractFunctionParameters } from 'viem';
import { useAccount, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

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

type UseWriteContractWithReceiptProps = {
  chain: Chain;
  eventName: string;
};

type UseWriteContractWithReceiptReturnType<TAbi extends Abi, TFunctionName extends string> = {
  initiateTransaction: (
    contractParameters: WriteContractParameters<TAbi, TFunctionName>,
  ) => Promise<void>;
  transactionHash: `0x${string}` | undefined;
  transactionStatus: WriteTransactionWithReceiptStatus;
  transactionReceipt: { status: 'success' | 'reverted' } | undefined;
  transactionIsLoading: boolean;
  transactionIsSuccess: boolean;
  transactionIsError: boolean;
  transactionError: Error | null;
};

type ContractFunctionPayableInfo<TAbi extends Abi, TFunctionName extends string> = Extract<
  TAbi[number],
  { name: TFunctionName; stateMutability: string }
>['stateMutability'] extends 'payable'
  ? { value: bigint | undefined }
  : { value?: never };

type WriteContractParameters<
  TAbi extends Abi = Abi,
  TFunctionName extends string = string,
> = ContractFunctionParameters & ContractFunctionPayableInfo<TAbi, TFunctionName>;

/*
  A hook to request and track a wallet write transaction

  Responsibilities:
  - Track the wallet request status
  - Track the transaction receipt and status
  - Log analytics & error
*/
export default function useWriteContractWithReceipt<
  TAbi extends Abi,
  TFunctionName extends string,
>({
  chain,
  eventName,
}: UseWriteContractWithReceiptProps): UseWriteContractWithReceiptReturnType<TAbi, TFunctionName> {
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
    async (contractParameters: WriteContractParameters<TAbi, TFunctionName>) => {
      if (!connectedChain) return;
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
