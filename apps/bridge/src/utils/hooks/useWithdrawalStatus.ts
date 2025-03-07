import { useEffect, useMemo, useState } from 'react';
import { useHasWithdrawalBeenFinalized } from 'apps/bridge/src/utils/hooks/useHasWithdrawalBeenFinalized';
import { useHasWithdrawalBeenProven } from 'apps/bridge/src/utils/hooks/useHasWithdrawalBeenProven';
import { useIsFinalizationPeriodElapsed } from 'apps/bridge/src/utils/hooks/useIsFinalizationPeriodElapsed';
import { useL2OutputProposal } from 'apps/bridge/src/utils/hooks/useL2OutputProposal';
import { useProvenWithdrawl } from 'apps/bridge/src/utils/hooks/useProvenWithdrawl';
import { getWithdrawalMessage } from 'apps/bridge/src/utils/transactions/getWithdrawalMessage';
import type { WithdrawalPhase } from 'apps/bridge/src/utils/transactions/phase';
import getConfig from 'next/config';
import { useWaitForTransaction } from 'wagmi';
import { hashWithdrawal } from 'apps/bridge/src/utils/hashing/hashWithdrawal';

const { publicRuntimeConfig } = getConfig();

type UseWithdrawalStateProps = {
  initializeTxHash: `0x${string}`;
  blockNumberOfLatestL2OutputProposal?: bigint;
  proveTxHash?: `0x${string}`;
  finalizeTxHash?: `0x${string}`;
};
export function useWithdrawalStatus({
  initializeTxHash,
  blockNumberOfLatestL2OutputProposal,
  proveTxHash,
  finalizeTxHash,
}: UseWithdrawalStateProps): { status: WithdrawalPhase; challengeWindowEndTime?: bigint } {
  const [withdrawalHash, setWithdrawalHash] = useState<string | null>(null);

  const { data: withdrawalReceipt } = useWaitForTransaction({
    hash: initializeTxHash,
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
  });
  const withdrawalHasBeenProven = useHasWithdrawalBeenProven(withdrawalHash);
  const withdrawalHasBeenFinalized = useHasWithdrawalBeenFinalized(withdrawalHash);
  const provenWithdrawal = useProvenWithdrawl(withdrawalHash);
  const { hasElapsed: finalizationPeriodHasElapsedForProvenWithdrawal, challengeWindowEndTime } =
    useIsFinalizationPeriodElapsed(provenWithdrawal?.[1]);
  const l2OutputProposal = useL2OutputProposal(provenWithdrawal?.[2]);
  const finalizationPeriodHasElapsedForL2OutputProposal = useIsFinalizationPeriodElapsed(
    l2OutputProposal?.timestamp,
  );
  const { isLoading: isProofSubmissionLoading, isError: isProofSubmissionError } =
    useWaitForTransaction({
      hash: proveTxHash,
    });
  const { isLoading: isFinalizationLoading, isError: isFinalizationError } = useWaitForTransaction({
    hash: finalizeTxHash,
  });

  const isWithdrawalReadyToProve = useMemo(
    () =>
      blockNumberOfLatestL2OutputProposal && withdrawalReceipt?.blockNumber
        ? blockNumberOfLatestL2OutputProposal >= withdrawalReceipt?.blockNumber
        : false,
    [blockNumberOfLatestL2OutputProposal, withdrawalReceipt],
  );

  useEffect(() => {
    if (withdrawalReceipt) {
      const withdrawalMessage = getWithdrawalMessage(withdrawalReceipt);
      const hashedWithdrawal = hashWithdrawal(withdrawalMessage);
      setWithdrawalHash(hashedWithdrawal);
    }
  }, [withdrawalReceipt]);

  // suppress eslint consistent-return error
  let status: WithdrawalPhase = 'PROPOSING_ON_CHAIN';

  if (proveTxHash && isProofSubmissionLoading) status = 'PROVE_TX_PENDING';
  if (finalizeTxHash && isFinalizationLoading) status = 'FINALIZE_TX_PENDING';

  if (!isWithdrawalReadyToProve) status = 'PROPOSING_ON_CHAIN';
  if (!withdrawalHasBeenProven && isWithdrawalReadyToProve) status = 'PROVE';
  if (!withdrawalHasBeenFinalized && withdrawalHasBeenProven) {
    status =
      finalizationPeriodHasElapsedForProvenWithdrawal &&
      finalizationPeriodHasElapsedForL2OutputProposal
        ? 'FINALIZE'
        : 'CHALLENGE_WINDOW';
  }

  if (withdrawalHasBeenFinalized) status = 'FUNDS_WITHDRAWN';
  if (finalizeTxHash && isFinalizationError) status = 'FINALIZE_TX_FAILURE';
  if (proveTxHash && isProofSubmissionError) status = 'PROVE_TX_FAILURE';

  if (status === 'CHALLENGE_WINDOW') {
    return {
      status,
      challengeWindowEndTime,
    };
  }
  return {
    status,
  };
}
