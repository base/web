import { useAnalytics } from 'apps/web/contexts/Analytics';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import TransactionLink from 'apps/web/src/components/TransactionLink';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useEffect } from 'react';
import { Chain, TransactionReceipt } from 'viem';

export type TransactionStatusProps = {
  transaction: TransactionReceipt;
  chainId: Chain['id'];
  className?: string;
};

// A component to display the status of a transaction (can be success or reverted)
export default function TransactionStatus({
  transaction,
  chainId,
  className,
}: TransactionStatusProps) {
  const { logEventWithContext } = useAnalytics();

  useEffect(() => {
    logEventWithContext(`show_transaction_status`, ActionType.render);
  }, [logEventWithContext]);

  if (transaction.status === 'success') {
    return (
      <p className={classNames('flex items-center justify-center gap-2 text-green-50', className)}>
        <Icon name="checkmark" color="currentColor" width="1rem" height="1rem" />
        <div>
          <strong>Profile updated!</strong> View your transaction on{' '}
          <TransactionLink transactionHash={transaction.transactionHash} chainId={chainId} />
        </div>
      </p>
    );
  }

  if (transaction.status === 'reverted') {
    return (
      <p className={classNames('flex items-center justify-center gap-2 text-red-50', className)}>
        <Icon name="info" color="currentColor" width="1rem" height="1rem" />
        <div>
          <strong>Transaction reverted.</strong> View your transaction on{' '}
          <TransactionLink transactionHash={transaction.transactionHash} chainId={chainId} />
        </div>
      </p>
    );
  }
}
