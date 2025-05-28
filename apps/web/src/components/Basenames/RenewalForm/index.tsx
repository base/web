import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';
import { useEthPriceFromUniswap } from 'apps/web/src/hooks/useEthPriceFromUniswap';
import { useRenewNameCallback } from 'apps/web/src/hooks/useRenewNameCallback';
import { BatchCallsStatus } from 'apps/web/src/hooks/useWriteContractsWithLogs';
import { WriteTransactionWithReceiptStatus } from 'apps/web/src/hooks/useWriteContractWithReceipt';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useBalance, useSwitchChain } from 'wagmi';
import { RenewalButton } from './RenewalButton';
import {
  formatEtherPrice,
  formatUsdPrice,
} from 'apps/web/src/components/Basenames/RegistrationForm';
import { useNameList } from 'apps/web/src/components/Basenames/ManageNames/hooks';
import YearSelector from 'apps/web/src/components/Basenames/YearSelector';

export default function RenewalForm({ name }: { name: string }) {
  const { chain: connectedChain, address } = useAccount();
  const [years, setYears] = useState(1);

  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();
  const { namesData, isLoading, refetch } = useNameList();

  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: basenameChain.id }),
    [basenameChain.id, switchChain],
  );

  const isOnSupportedNetwork = useMemo(
    () => connectedChain && supportedChainIds.includes(connectedChain.id),
    [connectedChain],
  );

  const nameData = useMemo(() => {
    return namesData?.data.find((n) => n.domain === name);
  }, [name, namesData?.data]);

  const formattedExpirationDate = useMemo(() => {
    if (!nameData?.expires_at) return undefined;
    const date = new Date(nameData.expires_at);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  }, [nameData?.expires_at]);

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

  const increment = useCallback(() => {
    setYears((n) => n + 1);
  }, [setYears]);

  const decrement = useCallback(() => {
    setYears((n) => (n > 1 ? n - 1 : n));
  }, [setYears]);

  const ethUsdPrice = useEthPriceFromUniswap();

  const renewName = useCallback(async () => {
    try {
      logEventWithContext('renew_name_initiated', ActionType.click);
      await renewBasename();
    } catch (error) {
      logError(error, 'Failed to renew name');
    }
  }, [logEventWithContext, logError, renewBasename]);

  const renewNameCallback = useCallback(() => {
    renewName().catch((e) => {
      logError(e, 'Failed to renew name');
    });
  }, [logError, renewName]);

  const { auxiliaryFunds: auxiliaryFundsEnabled } = useCapabilitiesSafe({
    chainId: connectedChain?.id,
  });
  const { data: balance } = useBalance({ address, chainId: connectedChain?.id });
  const insufficientBalanceToRenew =
    balance?.value !== undefined && price !== undefined && balance?.value < price;
  const correctChain = connectedChain?.id === basenameChain.id;
  const insufficientFundsAndNoAuxFunds = insufficientBalanceToRenew && !auxiliaryFundsEnabled;
  const insufficientBalanceToRenewAndCorrectChain = insufficientBalanceToRenew && correctChain;
  const insufficientFundsNoAuxFundsAndCorrectChain =
    !auxiliaryFundsEnabled && insufficientBalanceToRenewAndCorrectChain;

  const hasResolvedUSDPrice = price !== undefined && ethUsdPrice !== undefined;
  const usdPrice = hasResolvedUSDPrice ? formatUsdPrice(price, ethUsdPrice) : '--.--';

  const mainRenewalElementClasses = classNames(
    'z-10 flex flex-col items-start justify-between gap-6 bg-[#F7F7F7] p-8 text-gray-60 shadow-xl md:flex-row md:items-center relative z-20 rounded-2xl',
  );

  // Handle successful renewal
  useEffect(() => {
    if (
      renewNameStatus === WriteTransactionWithReceiptStatus.Success ||
      batchCallsStatus === BatchCallsStatus.Success
    ) {
      setYears(1);
      refetch().catch((e) => {
        logError(e, 'Failed to refetch names');
      });
    }
  }, [renewNameStatus, batchCallsStatus, refetch, logError]);

  if (!isOnSupportedNetwork) {
    return (
      <button
        type="button"
        className="z-10 mx-auto mt-8 flex flex-row items-center justify-center"
        onClick={switchToIntendedNetwork}
      >
        <ExclamationCircleIcon width={12} height={12} className="fill-gray-40" />
        <p className="ml-2 text-gray-40">Switch to Base to renew your name.</p>
      </button>
    );
  }

  return (
    <div className="mt-20 transition-all duration-500">
      <div className={mainRenewalElementClasses}>
        <YearSelector
          years={years}
          onIncrement={increment}
          onDecrement={decrement}
          label="Extend for"
        />
        <div className="min-w-[14rem] self-start text-left">
          <p className="text-line mb-2 text-sm font-bold uppercase">Amount</p>
          <div className="flex min-w-60 items-center justify-start gap-4">
            {price === undefined ? (
              <div className="flex h-9 items-center">
                <Icon name="spinner" color="currentColor" />
              </div>
            ) : (
              <p
                className={classNames('whitespace-nowrap text-3xl font-bold text-black', {
                  'text-state-n-hovered': insufficientFundsAndNoAuxFunds,
                })}
              >
                {formatEtherPrice(price)} ETH
              </p>
            )}
            {hasResolvedUSDPrice && (
              <span className="whitespace-nowrap text-xl text-gray-60">${usdPrice}</span>
            )}
          </div>
          {insufficientFundsAndNoAuxFunds && (
            <p className="text-sm text-state-n-hovered">your ETH balance is insufficient</p>
          )}
        </div>

        <div className="flex w-full max-w-full flex-col items-center gap-3 md:max-w-[13rem]">
          <RenewalButton
            correctChain={correctChain}
            renewNameCallback={renewNameCallback}
            switchToIntendedNetwork={switchToIntendedNetwork}
            disabled={!price || insufficientFundsNoAuxFundsAndCorrectChain}
            isLoading={isPending || isLoading}
          />
          {formattedExpirationDate && (
            <p className="text-md text-gray-50">Expires {formattedExpirationDate}</p>
          )}
        </div>
      </div>
    </div>
  );
}
