'use client';

import { useErrors } from 'apps/web/contexts/Errors';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import Input from 'apps/web/src/components/Input';
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
  const [years, setYears] = useState<number | null>(null);
  const [currentRenewalStep, setCurrentRenewalStep] = useState<RenewalSteps>(RenewalSteps.SetYears);

  const { address } = useAccount();
  const { logError } = useErrors();

  const {
    callback: renewBasename,
    totalPrice,
    basePrice,
    premiumPrice,
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

  if (!address) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      title={rewnewalStepsTitleForDisplay[currentRenewalStep]}
      titleAlign="left"
      onClose={onClose}
    >
      {currentRenewalStep === RenewalSteps.SetYears && (
        <div className="mt-2 flex w-full flex-col gap-4">
          <p>Renew Basename for</p>
          <Fieldset className="w-full">
            <Input
              value={years ?? ''}
              onChange={(e) => setYears(Number(e.target.value))}
              type="number"
              className="w-full flex-1 rounded-xl border border-gray-40/20 p-4 text-black"
              placeholder="input years"
            />
          </Fieldset>
          <Button
            disabled={!years}
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
        <div className="mt-2 flex w-full flex-col gap-4">
          <p>
            Renew {name} for {years} {years === 1 ? 'year' : 'years'}
          </p>
          <p>Renewal Price: {totalPrice ? formatEther(totalPrice) : 0} ETH</p>
          <Button variant={ButtonVariants.Black} fullWidth rounded onClick={renewBasename}>
            Continue
          </Button>
        </div>
      )}
    </Modal>
  );
}
