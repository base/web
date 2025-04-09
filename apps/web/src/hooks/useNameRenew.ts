import { useCallback, useState } from 'react';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import { useRentPrice } from 'apps/web/src/hooks/useRentPrice';
import { formatEther } from 'viem';
import { useWriteContract, useAccount, useSwitchChain } from 'wagmi';
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESSES } from 'apps/web/src/utils/usernames';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { base } from 'viem/chains';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

export function useNameRenew() {
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();
  const { chain: connectedChain } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const [selectedName, setSelectedName] = useState('');
  const [years, setYears] = useState(1);
  const [renewPrice, setRenewPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastQueryPrice, setLastQueryPrice] = useState<bigint | undefined>(undefined);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  const normalizedName = normalizeEnsDomainName(selectedName);
  const { basePrice, premiumPrice } = useRentPrice(normalizedName, years);
  const { writeContractAsync } = useWriteContract();

  const handleQuery = useCallback(() => {
    if (!selectedName || !years) {
      setError('Please enter basename and select duration');
      return;
    }

    try {
      if (basePrice === undefined || premiumPrice === undefined) {
        setError('Unable to fetch price. Please try again.');
        return;
      }

      const totalPrice = basePrice + premiumPrice;
      setLastQueryPrice(totalPrice);
      const priceInEth = formatEther(totalPrice);
      setRenewPrice(`${priceInEth} ETH`);
      setError(null);
      logEventWithContext('name_renewal_price_queried', ActionType.change, {
        name: selectedName,
        years,
        price: priceInEth,
      });
    } catch (err) {
      console.error('Error calculating price:', err);
      setError('Error calculating price. Please try again.');
      logError(err, 'name_renewal_price_query_failed');
    }
  }, [selectedName, years, basePrice, premiumPrice, logEventWithContext, logError]);

  const handleRenew = useCallback(async () => {
    if (!selectedName || !years || !lastQueryPrice) {
      setError('Please query the price first before renewing');
      return;
    }

    if (!connectedChain) {
      setError('Please connect your wallet');
      return;
    }

    if (!supportedChainIds.includes(connectedChain.id)) {
      try {
        await switchChainAsync({ chainId: base.id });
        logEventWithContext('name_renewal_network_switched', ActionType.change);
      } catch (err) {
        setError('Failed to switch network. Please switch to Base network manually.');
        logError(err, 'name_renewal_network_switch_failed');
        return;
      }
    }

    try {
      setTransactionStatus('pending');
      logEventWithContext('name_renewal_initiated', ActionType.change, {
        name: selectedName,
        years,
        price: formatEther(lastQueryPrice),
      });

      await writeContractAsync({
        abi: REGISTER_CONTRACT_ABI,
        address: REGISTER_CONTRACT_ADDRESSES[connectedChain.id],
        functionName: 'renew',
        args: [selectedName, secondsInYears(years)],
        value: lastQueryPrice,
      });

      setTransactionStatus('success');
      setIsSuccess(true);
      logEventWithContext('name_renewal_success', ActionType.change, {
        name: selectedName,
        years,
        price: formatEther(lastQueryPrice),
      });
    } catch (err) {
      console.error('Error renewing name:', err);
      setError('Error renewing name. Please try again.');
      setTransactionStatus('error');
      logError(err, 'name_renewal_failed');
    }
  }, [
    selectedName,
    years,
    lastQueryPrice,
    writeContractAsync,
    connectedChain,
    switchChainAsync,
    logEventWithContext,
    logError,
  ]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value);
    setError(null);
    setIsSuccess(false);
  }, []);

  const handleYearsChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setYears(Number(e.target.value));
    setError(null);
    setIsSuccess(false);
  }, []);

  const transactionIsLoading = transactionStatus === 'pending';

  return {
    selectedName,
    years,
    renewPrice,
    error,
    isSuccess,
    transactionIsLoading,
    handleNameChange,
    handleYearsChange,
    handleQuery,
    handleRenew,
  };
}
