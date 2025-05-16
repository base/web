'use client';

import { useErrors } from 'apps/web/contexts/Errors';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';
import { useRenewNameCallback } from 'apps/web/src/hooks/useRenewNameCallback';
import { BatchCallsStatus } from 'apps/web/src/hooks/useWriteContractsWithLogs';
import { WriteTransactionWithReceiptStatus } from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

enum RenewalSteps {
  SetYears = 'set-years',
  Confirm = 'confirm',
}

const rewnewalStepsTitleForDisplay = {
  [RenewalSteps.SetYears]: 'Extend Registration',
  [RenewalSteps.Confirm]: 'Confirm renewal details',
};

type UsernameProfileRenewalModalProps = {
  name: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function UsernameProfileRenewalModal({
  name,
  isOpen,
  onClose,
}: UsernameProfileRenewalModalProps) {
  const [years, setYears] = useState<number>(1);
  const [currentRenewalStep, setCurrentRenewalStep] = useState<RenewalSteps>(RenewalSteps.SetYears);

  const { address } = useAccount();
  const { logError } = useErrors();

  const {
    callback: renewBasename,
    value: price,
    isPending,
    renewNameStatus,
    batchCallsStatus,
  } = useRenewNameCallback({
    name,
    years,
  });

  const formattedPrice = useMemo(() => {
    return price ? `${parseFloat(formatEther(price)).toFixed(4)} ETH` : undefined;
  }, [price]);

  const formattedYears = useMemo(() => {
    return years === 1 ? '1 year' : `${years} years`;
  }, [years]);

  const onConfirmRenewal = useCallback(() => {
    setCurrentRenewalStep(RenewalSteps.Confirm);
  }, []);

  const onBack = useCallback(() => {
    if (currentRenewalStep === RenewalSteps.Confirm) {
      return () => setCurrentRenewalStep(RenewalSteps.SetYears);
    }
  }, [currentRenewalStep, setCurrentRenewalStep]);

  const handleIncrementYears = useCallback(() => {
    setYears((prevYears) => prevYears + 1);
  }, []);

  const handleDecrementYears = useCallback(() => {
    setYears((prevYears) => Math.max(1, prevYears - 1));
  }, []);

  const handleRenewBasename = useCallback(() => {
    renewBasename().catch((e) => {
      logError(e, 'Failed to renew basename');
    });
  }, [renewBasename, logError]);

  useEffect(() => {
    if (
      renewNameStatus === WriteTransactionWithReceiptStatus.Success ||
      batchCallsStatus === BatchCallsStatus.Success
    ) {
      onClose();
      setCurrentRenewalStep(RenewalSteps.SetYears);
      setYears(1);
    }
  }, [renewNameStatus, batchCallsStatus, onClose]);

  if (!address) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      title={rewnewalStepsTitleForDisplay[currentRenewalStep]}
      titleAlign="left"
      onClose={onClose}
      onBack={onBack()}
    >
      {currentRenewalStep === RenewalSteps.SetYears && (
        <div className="mt-4 flex w-full flex-col gap-y-5">
          <div>
            <p>Choose how many years you&apos;d like to extend your registration for.</p>
          </div>

          <div className="my-3 flex w-full flex-col items-center justify-center gap-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-palette-foregroundMuted">
              Extend for
            </p>
            <div className="flex items-center gap-x-4">
              <button
                type="button"
                onClick={handleDecrementYears}
                disabled={years <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-10 text-2xl text-gray-80 hover:bg-gray-20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                -
              </button>
              <span className="text-3xl font-bold text-black">{formattedYears}</span>
              <button
                type="button"
                onClick={handleIncrementYears}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-10 text-2xl text-gray-80 hover:bg-gray-20"
              >
                +
              </button>
            </div>
          </div>

          <Button
            disabled={years < 1}
            variant={ButtonVariants.Black}
            fullWidth
            rounded
            onClick={onConfirmRenewal}
          >
            Continue
          </Button>
        </div>
      )}

      {currentRenewalStep === RenewalSteps.Confirm && (
        <div className="mt-4 flex w-full flex-col gap-6">
          <div className="border-gray-200 space-y-3 rounded-lg border p-4">
            <div className="flex justify-between">
              <strong className="text-gray-700 text-md">Basename:</strong>
              <p className="text-gray-900 text-md">{name}</p>
            </div>
            <div className="flex justify-between">
              <strong className="text-gray-700 text-md">Renewal period:</strong>
              <p className="text-gray-900 text-md">{formattedYears}</p>
            </div>
            <div className="border-gray-200 flex justify-between border-t pt-3">
              <strong className="text-gray-700 text-base font-semibold">Estimated cost:</strong>
              <p className="text-gray-900 text-base font-semibold">
                {formattedPrice ?? 'Calculating...'}
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant={ButtonVariants.Black}
            fullWidth
            rounded
            onClick={handleRenewBasename}
            disabled={!price}
            isLoading={isPending}
          >
            Confirm & Renew
          </Button>
        </div>
      )}
    </Modal>
  );
}
