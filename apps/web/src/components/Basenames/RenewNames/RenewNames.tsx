'use client';

import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { Basename } from '@coinbase/onchainkit/identity';
import { useRentPrice } from 'apps/web/src/hooks/useRentPrice';
import { Button } from 'apps/web/src/components/Button/Button';
import { ButtonVariants, ButtonSizes } from 'apps/web/src/components/Button/Button';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { formatEther } from 'viem';
import { useAccount, useSwitchChain } from 'wagmi';
import { normalizeEnsDomainName } from 'apps/web/src/utils/usernames';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import { useErrors } from 'apps/web/contexts/Errors';
import useWriteContractWithReceipt, { PayableContractFunctionParameters } from 'apps/web/src/hooks/useWriteContractWithReceipt';
import { REGISTER_CONTRACT_ABI, REGISTER_CONTRACT_ADDRESSES } from 'apps/web/src/utils/usernames';
import { ConnectWallet, ConnectWalletText } from '@coinbase/onchainkit/wallet';
import classNames from 'classnames';
import { base } from 'viem/chains';

function secondsInYears(years: number): bigint {
  const secondsPerYear = 365.25 * 24 * 60 * 60; // .25 accounting for leap years
  return BigInt(Math.round(years * secondsPerYear));
}

function formatEtherPrice(price?: bigint) {
  if (price === undefined) {
    return '...';
  }
  return formatEther(price);
}

const RenewNames = () => {
  const { isConnected, chain: connectedChain } = useAccount();
  const [selectedName, setSelectedName] = useState('');
  const [years, setYears] = useState(1);
  const [renewPrice, setRenewPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastQueryPrice, setLastQueryPrice] = useState<bigint | undefined>(undefined);

  const normalizedName = normalizeEnsDomainName(selectedName);
  const { basePrice, premiumPrice } = useRentPrice(normalizedName, years);
  const { switchChain } = useSwitchChain();
  const { logError } = useErrors();

  const { initiateTransaction, transactionStatus, transactionIsLoading } = useWriteContractWithReceipt({
    chain: connectedChain || base,
    eventName: 'renew_name',
  });

  useEffect(() => {
    if (transactionStatus === 'success') {
      setIsSuccess(true);
    } else if (transactionStatus === 'reverted') {
      setError('Transaction failed. Please try again.');
    }
  }, [transactionStatus]);

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
      const priceInEth = formatEtherPrice(totalPrice);
      setRenewPrice(`${priceInEth} ETH`);
      setError(null);
    } catch (err) {
      console.error('Error calculating price:', err);
      setError('Error calculating price. Please try again.');
    }
  }, [selectedName, years, basePrice, premiumPrice]);

  const handleRenew = useCallback(async () => {
    if (!selectedName || !years || !lastQueryPrice) {
      setError('Please query the price first before renewing');
      return;
    }

    if (!isConnected) {
      setError('Please connect your wallet');
      return;
    }

    if (!connectedChain || !supportedChainIds.includes(connectedChain.id)) {
      setError('Please connect to Base network');
      return;
    }

    try {
      await initiateTransaction({
        abi: REGISTER_CONTRACT_ABI,
        address: REGISTER_CONTRACT_ADDRESSES[connectedChain.id],
        functionName: 'renew',
        args: [selectedName, secondsInYears(years)],
        value: lastQueryPrice,
      });
    } catch (err) {
      console.error('Error renewing name:', err);
      setError('Error renewing name. Please try again.');
    }
  }, [selectedName, years, lastQueryPrice, isConnected, connectedChain, initiateTransaction]);

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

  const switchToIntendedNetwork = useCallback(
    () => {
      if (!connectedChain) return;
      switchChain({ chainId: connectedChain.id });
    },
    [connectedChain, switchChain],
  );

  const isOnSupportedNetwork = useMemo(
    () => connectedChain && supportedChainIds.includes(connectedChain.id),
    [connectedChain],
  );

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-6 pb-16 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-3xl font-bold">Renew Basename</h1>
      </div>
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="basename" className="text-sm font-medium">
            Basename
          </label>
          <div className="relative w-full max-w-md">
            <input
              id="basename"
              type="text"
              value={selectedName}
              onChange={handleNameChange}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter basename"
            />
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <div className="flex-1" />
              <span className="text-gray-400 px-3">.base.eth</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="years" className="text-sm font-medium">
            Years
          </label>
          <select
            id="years"
            value={years}
            onChange={handleYearsChange}
            className="w-full max-w-md border rounded-md px-3 py-2"
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} {index === 0 ? 'year' : 'years'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="renewPrice" className="text-sm font-medium">
            Renew Price
          </label>
          <input
            id="renewPrice"
            type="text"
            value={renewPrice}
            className="w-full max-w-md border rounded-md px-3 py-2 bg-white text-black cursor-not-allowed"
            placeholder="Query results will appear here"
            readOnly
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <div className="flex gap-4 mt-4 max-w-md justify-end">
          <Button 
            variant={ButtonVariants.Primary} 
            size={ButtonSizes.Medium}
            className="!bg-[#0052FF] !text-white hover:!bg-[#0052FF]/90"
            onClick={handleQuery}
            disabled={transactionIsLoading}
          >
            Query
          </Button>
          {!isConnected ? (
            <ConnectWallet
              className={classNames(
                'bg-button-black text-white hover:bg-button-blackHover active:bg-button-blackActive',
                'px-10 py-3.5 text-sm md:text-lg',
                'rounded-full',
              )}
            >
              <ConnectWalletText className="font-display font-normal">
                Connect wallet
              </ConnectWalletText>
            </ConnectWallet>
          ) : (
            <Button 
              variant={ButtonVariants.Black} 
              size={ButtonSizes.Medium}
              onClick={handleRenew}
              disabled={transactionIsLoading || !lastQueryPrice || !connectedChain || !supportedChainIds.includes(connectedChain.id)}
            >
              {transactionIsLoading ? 'Renewing...' : 'Renew'}
            </Button>
          )}
        </div>

        {isSuccess && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <p className="font-medium">Successfully renewed your basename!</p>
            <div className="mt-2 flex gap-4">
              <Link href={`/profile/${selectedName}`}>
                <Button variant={ButtonVariants.Primary} size={ButtonSizes.Small}>
                  View Profile
                </Button>
              </Link>
              <Link href={`/profile/${selectedName}/edit`}>
                <Button variant={ButtonVariants.Black} size={ButtonSizes.Small}>
                  Customize Profile
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenewNames; 