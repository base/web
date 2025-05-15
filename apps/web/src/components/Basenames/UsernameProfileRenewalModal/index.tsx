'use client';

import { useErrors } from 'apps/web/contexts/Errors';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';
import { useRenewBasename } from 'apps/web/src/hooks/useRenewBasename';
import { useCallback, useState } from 'react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

enum RenewalSteps {
  SetYears = 'set-years',
  Confirm = 'confirm',
  WalletRequests = 'wallet-requests',
  Success = 'success',
}

const rewnewalStepsTitleForDisplay = {
  [RenewalSteps.SetYears]: 'Set years',
  [RenewalSteps.Confirm]: 'Confirm renewal details',
  [RenewalSteps.WalletRequests]: 'Confirm transactions',
  [RenewalSteps.Success]: '',
};

type UsernameProfileRenewalModalProps = {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function UsernameProfileRenewalModal({
  name,
  isOpen,
  onClose,
  onSuccess,
}: UsernameProfileRenewalModalProps) {
  const [years, setYears] = useState<number>(1);
  const [currentRenewalStep, setCurrentRenewalStep] = useState<RenewalSteps>(RenewalSteps.SetYears);

  const { address } = useAccount();
  const { logError } = useErrors();

  const {
    callback: renewBasename,
    price,
    isPending,
    error,
    renewNameStatus,
    batchCallsStatus,
  } = useRenewBasename({
    name,
    years: years ?? 0,
  });

  const onConfirmRenewal = useCallback(() => {
    setCurrentRenewalStep(RenewalSteps.Confirm);
  }, []);

  const onCloseModal = useCallback(() => {
    onClose();
    setYears(1);
    setCurrentRenewalStep(RenewalSteps.SetYears);
  }, [onClose]);

  if (!address) {
    return null;
  }

  const handleIncrementYears = () => {
    setYears((prevYears) => prevYears + 1);
  };

  const handleDecrementYears = () => {
    setYears((prevYears) => Math.max(1, prevYears - 1));
  };

  return (
    <Modal
      isOpen={isOpen}
      title={rewnewalStepsTitleForDisplay[currentRenewalStep]}
      titleAlign="left"
      onClose={onCloseModal}
    >
      {currentRenewalStep === RenewalSteps.SetYears && (
        <div className="mt-4 flex w-full flex-col gap-y-5">
          <div>
            <p className="text-gray-500 text-sm">
              Renew Basename <span className="text-gray-700 font-semibold">{name}</span>
            </p>
            <p className="text-gray-400 mt-1 text-xs">
              Choose for how many years you&apos;d like to extend your ownership.
            </p>
          </div>

          <div className="my-6 flex w-full flex-col items-center justify-center gap-y-3">
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
              <span className="text-3xl font-bold text-black">
                {years} {years === 1 ? 'year' : 'years'}
              </span>
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
          <div className="border-gray-200 space-y-3 rounded-lg border  p-4">
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm font-medium">Basename:</span>
              <span className="text-gray-900 text-sm">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm font-medium">Renewal period:</span>
              <span className="text-gray-900 text-sm">
                {years} {years === 1 ? 'year' : 'years'}
              </span>
            </div>
            <div className="border-gray-200 flex justify-between border-t pt-3">
              <span className="text-gray-700 text-base font-semibold">Estimated cost:</span>
              <span className="text-gray-900 text-base font-semibold">
                {price ? `${formatEther(price)} ETH` : 'Calculating...'}
              </span>
            </div>
          </div>
          <Button variant={ButtonVariants.Black} fullWidth rounded onClick={renewBasename}>
            Confirm & Renew
          </Button>
        </div>
      )}
    </Modal>
  );
}
