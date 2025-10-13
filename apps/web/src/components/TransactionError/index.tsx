import { useAnalytics } from 'apps/web/contexts/Analytics';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useEffect } from 'react';
import { ContractFunctionExecutionError, TransactionExecutionError } from 'viem';

export type TransactionErrorProps = {
  error: unknown;
  className?: string;
};

export function getTransactionErrorMessage(error: unknown) {
  let errorMessage = 'unknown';

  if (error instanceof ContractFunctionExecutionError) return error.shortMessage;
  if (error instanceof TransactionExecutionError) return error.details;
  if (error instanceof Error) return error.message;

  return errorMessage;
}

// A component to display the status of a transaction (can be success or reverted)
export default function TransactionError({ error, className }: TransactionErrorProps) {
  let errorDetail = getTransactionErrorMessage(error);
  const { logEventWithContext } = useAnalytics();

  useEffect(() => {
    logEventWithContext(`show_transaction_error`, ActionType.error);
  }, [error, logEventWithContext]);

  return (
    <p
      className={classNames(
        'flex items-center justify-center gap-2 font-bold text-red-50',
        className,
      )}
    >
      <Icon name="info" color="currentColor" width="1rem" height="1rem" />
      Transaction failed: {errorDetail}
    </p>
  );
}
