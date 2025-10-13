import { useErrors } from 'apps/web/contexts/Errors';
import {
  OwnershipSettings,
  useProfileTransferOwnership,
} from 'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/context';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { WriteTransactionWithReceiptStatus } from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { useCallback } from 'react';

// List all a singular transaction
export function OwnershipTransactionState({
  ownershipSetting,
}: {
  ownershipSetting: OwnershipSettings;
}) {
  const { logError } = useErrors();
  const { batchTransactionsEnabled, batchCallsIsLoading } = useProfileTransferOwnership();

  const onRetry = useCallback(() => {
    ownershipSetting.contractFunction().catch((error) => {
      logError(error, 'Failed to retry');
    });
  }, [logError, ownershipSetting]);

  if (batchTransactionsEnabled && batchCallsIsLoading) {
    return (
      <>
        <div>
          <span className="text-gray-50">
            <Icon name="spinner" height="1rem" width="1rem" color="currentColor" />
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <strong>{ownershipSetting.name}</strong>
        </div>
      </>
    );
  }

  const isFailed =
    ownershipSetting.status === WriteTransactionWithReceiptStatus.Canceled ||
    ownershipSetting.status === WriteTransactionWithReceiptStatus.Reverted;

  const isLoading =
    ownershipSetting.status === WriteTransactionWithReceiptStatus.Initiated ||
    ownershipSetting.status === WriteTransactionWithReceiptStatus.Processing;

  const isSuccess = ownershipSetting.status === WriteTransactionWithReceiptStatus.Success;

  return (
    <>
      <div>
        {ownershipSetting.status === WriteTransactionWithReceiptStatus.Idle && (
          <span className="text-gray-50">
            <Icon name="checkmark" height="1rem" width="1rem" color="currentColor" />
          </span>
        )}
        {isLoading && (
          <span className="text-gray-50">
            <Icon name="spinner" height="1rem" width="1rem" color="currentColor" />
          </span>
        )}
        {isFailed && (
          <span className="text-orange-50">
            <Icon name="cross" height="1rem" width="1rem" color="currentColor" />
          </span>
        )}
        {isSuccess && (
          <span className="text-green-50">
            <Icon name="checkmark" height="1rem" width="1rem" color="currentColor" />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <strong>{ownershipSetting.name}</strong>
        {isFailed && (
          <div>
            <Button
              variant={ButtonVariants.Gray}
              size={ButtonSizes.Small}
              onClick={onRetry}
              rounded
            >
              Retry
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
