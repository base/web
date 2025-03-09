import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/16/solid';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { PremiumExplainerModal } from 'apps/web/src/components/Basenames/PremiumExplainerModal';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import RegistrationLearnMoreModal from 'apps/web/src/components/Basenames/RegistrationLearnMoreModal';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Label from 'apps/web/src/components/Label';
import Tooltip from 'apps/web/src/components/Tooltip';
import TransactionError from 'apps/web/src/components/TransactionError';
import { usePremiumEndDurationRemaining } from 'apps/web/src/hooks/useActiveEthPremiumAmount';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import useCapabilitiesSafe from 'apps/web/src/hooks/useCapabilitiesSafe';
import { useEthPriceFromUniswap } from 'apps/web/src/hooks/useEthPriceFromUniswap';
import {
  useDiscountedNameRegistrationPrice,
  useNameRegistrationPrice,
} from 'apps/web/src/hooks/useNameRegistrationPrice';
import { useRentPrice } from 'apps/web/src/hooks/useRentPrice';
import { formatBaseEthDomain, IS_EARLY_ACCESS } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { formatEther, zeroAddress } from 'viem';
import { useAccount, useBalance, useReadContract, useSwitchChain } from 'wagmi';

function formatEtherPrice(price?: bigint) {
  if (price === undefined) {
    return '...';
  }
  const value = parseFloat(formatEther(price));
  if (value < 0.001) {
    return parseFloat(value.toFixed(4));
  } else {
    return parseFloat(value.toFixed(3));
  }
}

function formatUsdPrice(price: bigint, ethUsdPrice: number) {
  if (price === 0n) return '0';
  const parsed = (parseFloat(formatEther(price)) * Number(ethUsdPrice)).toFixed(2);
  if (parsed === '0.00') return '0';
  return parsed;
}

export default function RegistrationForm() {
  const { isConnected, chain: connectedChain, address } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();

  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: basenameChain.id }),
    [basenameChain.id, switchChain],
  );
  const isOnSupportedNetwork = useMemo(
    () => connectedChain && supportedChainIds.includes(connectedChain.id),
    [connectedChain],
  );

  const {
    selectedName,
    discount,
    years,
    setYears,
    reverseRecord,
    setReverseRecord,
    hasExistingBasename,
    registerName,
    registerNameError,
    registerNameIsPending,
    code,
  } = useRegistration();

  const [premiumExplainerModalOpen, setPremiumExplainerModalOpen] = useState(false);
  const togglePremiumExplainerModal = useCallback(() => {
    logEventWithContext('toggle_premium_explainer_modal', ActionType.change);
    setPremiumExplainerModalOpen((open) => !open);
  }, [logEventWithContext, setPremiumExplainerModalOpen]);

  const [learnMoreAboutDiscountsModalOpen, setLearnMoreAboutDiscountsModalOpen] = useState(false);
  const toggleLearnMoreModal = useCallback(() => {
    logEventWithContext('toggle_learn_more_modal', ActionType.change);
    setLearnMoreAboutDiscountsModalOpen((open) => !open);
  }, [logEventWithContext, setLearnMoreAboutDiscountsModalOpen]);

  const increment = useCallback(() => {
    logEventWithContext('registration_form_increment_year', ActionType.click);

    setYears((n) => n + 1);
  }, [logEventWithContext, setYears]);

  const decrement = useCallback(() => {
    logEventWithContext('registration_form_decement_year', ActionType.click);

    setYears((n) => (n > 1 ? n - 1 : n));
  }, [logEventWithContext, setYears]);

  const ethUsdPrice = useEthPriceFromUniswap();
  const { data: initialPrice } = useNameRegistrationPrice(selectedName, years);
  const { data: singleYearEthCost } = useNameRegistrationPrice(selectedName, 1);
  const { basePrice: singleYearBasePrice, premiumPrice } = useRentPrice(selectedName, 1);
  const premiumValue = Number(formatEther(premiumPrice ?? 0));
  const formattedPremiumCost =
    premiumValue < 0.001
      ? '<0.001'
      : premiumValue.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        });
  const { data: discountedPrice } = useDiscountedNameRegistrationPrice(
    selectedName,
    years,
    discount?.discountKey,
  );

  const { data: hasRegisteredWithDiscount } = useReadContract({
    abi: RegistrarControllerABI,
    address: USERNAME_REGISTRAR_CONTROLLER_ADDRESSES[basenameChain.id],
    functionName: 'discountedRegistrants',
    args: [address ?? zeroAddress],
  });

  const price = hasRegisteredWithDiscount ? initialPrice : discountedPrice ?? initialPrice;

  const registerNameCallback = useCallback(() => {
    registerName().catch((error) => {
      logError(error, 'Failed to register name');
    });
  }, [logError, registerName]);

  const onChangeReverseRecord = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setReverseRecord(event.target.checked),
    [setReverseRecord],
  );

  const { auxiliaryFunds: auxiliaryFundsEnabled } = useCapabilitiesSafe({
    chainId: connectedChain?.id,
  });
  const { data: balance } = useBalance({ address, chainId: connectedChain?.id });
  const insufficientBalanceToRegister =
    balance?.value !== undefined && price !== undefined && balance?.value < price;
  const correctChain = connectedChain?.id === basenameChain.id;
  const insufficientFundsAndNoAuxFunds = insufficientBalanceToRegister && !auxiliaryFundsEnabled;
  const insufficientBalanceToRegisterAndCorrectChain =
    insufficientBalanceToRegister && correctChain;
  const insufficientFundsNoAuxFundsAndCorrectChain =
    !auxiliaryFundsEnabled && insufficientBalanceToRegisterAndCorrectChain;

  const hasResolvedUSDPrice = price !== undefined && ethUsdPrice !== undefined;
  const usdPrice = hasResolvedUSDPrice ? formatUsdPrice(price, ethUsdPrice) : '--.--';
  const nameIsFree = !hasRegisteredWithDiscount && price === 0n;

  const { seconds, timestamp: premiumEndTimestamp } = usePremiumEndDurationRemaining();

  const isPremiumActive = Boolean(premiumPrice && premiumPrice !== 0n && seconds !== 0n);
  const mainRegistrationElementClasses = classNames(
    'z-10 flex flex-col items-start justify-between gap-6 bg-[#F7F7F7] p-8 text-gray-60 shadow-xl md:flex-row md:items-center relative z-20',
    {
      'rounded-2xl': !isPremiumActive,
      'rounded-b-2xl': isPremiumActive,
    },
  );

  if (!IS_EARLY_ACCESS || (IS_EARLY_ACCESS && discount)) {
    return (
      <>
        <div className="mt-20 transition-all duration-500">
          {isPremiumActive && (
            <div className="flex justify-between gap-4 rounded-t-2xl bg-gradient-to-r from-[#B139FF] to-[#FF9533] px-6 py-4 text-white">
              <p>
                Temporary premium of {formattedPremiumCost} ETH{' '}
                {premiumEndTimestamp && <>ends in {premiumEndTimestamp}</>}
              </p>
              {Boolean(premiumPrice && singleYearEthCost) && (
                <button type="button" className="underline" onClick={togglePremiumExplainerModal}>
                  Learn more
                </button>
              )}
            </div>
          )}
          <div className={mainRegistrationElementClasses}>
            <div className="max-w-[14rem] self-start">
              <p className="text-line mb-2 text-sm font-bold uppercase">Claim for</p>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={decrement}
                  disabled={years === 1}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DEE1E7]"
                  aria-label="Decrement years"
                >
                  <MinusIcon width="14" height="14" className="fill-[#32353D]" />
                </button>
                <span className="flex w-32 items-center justify-center text-3xl font-bold text-black">
                  {years} year{years > 1 && 's'}
                </span>
                <button
                  type="button"
                  onClick={increment}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DEE1E7]"
                  aria-label="Increment years"
                >
                  <PlusIcon width="14" height="14" className="fill-[#32353D]" />
                </button>
              </div>
              {hasExistingBasename && (
                <Label
                  className="mt-4 flex w-full items-center justify-center gap-2 text-center"
                  htmlFor="reverseRecord"
                >
                  <input
                    type="checkbox"
                    checked={reverseRecord}
                    onChange={onChangeReverseRecord}
                    id="reverseRecord"
                  />
                  <span className="flex flex-row items-center gap-2 text-sm">
                    Set as Primary Name
                    <Tooltip
                      content={
                        <>
                          This will cause apps that support basenames to resolve{' '}
                          <strong>{formatBaseEthDomain(selectedName, basenameChain.id)}</strong>{' '}
                          when looking up your address.
                        </>
                      }
                    >
                      <Icon name="info" color="currentColor" width="0.8rem" height="0.8rem" />
                    </Tooltip>
                  </span>
                </Label>
              )}
            </div>
            <div className="min-w-[14rem] self-start text-left">
              <p className="text-line mb-2 text-sm font-bold uppercase">Amount</p>
              <div className="flex min-w-60 items-baseline justify-start gap-4">
                {price === undefined ? (
                  <div className="flex h-9 items-center justify-center self-center">
                    <Icon name="spinner" color="currentColor" />
                  </div>
                ) : discountedPrice !== undefined && !hasRegisteredWithDiscount ? (
                  <div className="flex flex-row items-baseline justify-around gap-2">
                    <p
                      className={classNames('whitespace-nowrap text-3xl text-black line-through', {
                        'text-state-n-hovered': insufficientFundsAndNoAuxFunds,
                      })}
                    >
                      {formatEtherPrice(initialPrice)}
                    </p>
                    <p
                      className={classNames('whitespace-nowrap text-3xl font-bold text-green-50', {
                        'text-state-n-hovered': insufficientFundsAndNoAuxFunds,
                      })}
                    >
                      {formatEtherPrice(discountedPrice)} ETH
                    </p>
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
              {insufficientFundsAndNoAuxFunds ? (
                <p className="text-sm text-state-n-hovered">your ETH balance is insufficient</p>
              ) : Boolean(nameIsFree && IS_EARLY_ACCESS) ? (
                <p className="text-sm text-green-50">Discounted during Early Access.</p>
              ) : nameIsFree ? (
                <p className="text-sm text-green-50">Free with your discount</p>
              ) : isPremiumActive ? (
                <button
                  className="text-sm text-blue-40 underline"
                  type="button"
                  onClick={togglePremiumExplainerModal}
                >
                  This name has a temporary premium
                </button>
              ) : null}
            </div>

            <div className="w-full max-w-full md:max-w-[13rem]">
              <ConnectButton.Custom>
                {({ account, chain, mounted }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  if (!connected) {
                    return (
                      <Button
                        type="button"
                        variant={ButtonVariants.Black}
                        size={ButtonSizes.Medium}
                        onClick={openConnectModal}
                        rounded
                      >
                        Connect wallet
                      </Button>
                    );
                  }

                  return (
                    <Button
                      onClick={correctChain ? registerNameCallback : switchToIntendedNetwork}
                      type="button"
                      variant={ButtonVariants.Black}
                      size={ButtonSizes.Medium}
                      disabled={insufficientFundsNoAuxFundsAndCorrectChain || registerNameIsPending}
                      isLoading={registerNameIsPending}
                      rounded
                      fullWidth
                    >
                      {correctChain ? 'Register name' : 'Switch to Base'}
                    </Button>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
          {code && (
            <div className="relative z-10 -mt-8 rounded-2xl bg-gradient-to-r from-indigo-40 to-orange-30 px-4 py-4 pt-12 text-center text-lg text-white">
              Claim your <strong>free basename</strong> &mdash; Thanks for joining us!
            </div>
          )}

          {registerNameError && (
            <TransactionError className="mt-4 text-center" error={registerNameError} />
          )}

          {!code && !IS_EARLY_ACCESS && (
            <div className="mt-6 w-full ">
              <p className="text mr-2 text-center font-bold uppercase ">
                <span className="text-[#5B616E]">
                  {nameIsFree
                    ? "You've qualified for a free name! "
                    : 'Unlock your username for free! '}
                </span>

                <button
                  type="button"
                  className="text-line font-bold uppercase text-[] underline"
                  onClick={toggleLearnMoreModal}
                >
                  Learn more
                </button>
              </p>
            </div>
          )}
        </div>
        <RegistrationLearnMoreModal
          isOpen={learnMoreAboutDiscountsModalOpen}
          toggleModal={toggleLearnMoreModal}
        />
        {Boolean(premiumPrice && singleYearEthCost) && (
          <PremiumExplainerModal
            premiumEthAmount={premiumPrice}
            baseSingleYearEthCost={singleYearBasePrice}
            isOpen={premiumExplainerModalOpen}
            toggleModal={togglePremiumExplainerModal}
          />
        )}
      </>
    );
  }
  if (isConnected) {
    if (isOnSupportedNetwork) {
      return (
        <div className="z-10 mt-8 flex flex-row items-center justify-center text-gray-40">
          <p className="ml-2 text-center">
            <span className="mr-2 inline-block">
              <Icon name="info" width={12} height={12} color="currentColor" />
            </span>
            The connected wallet is not eligible for early access.
          </p>
        </div>
      );
    } else {
      return (
        <button
          type="button"
          className="z-10 mx-auto mt-8 flex flex-row items-center justify-center"
          onClick={switchToIntendedNetwork}
        >
          <ExclamationCircleIcon width={12} height={12} className="fill-gray-40" />
          <p className="ml-2 text-gray-40">Switch to Base to register a name.</p>
        </button>
      );
    }
  }

  return (
    <div className="z-10 mx-auto mt-8 flex flex-row items-center justify-center">
      <InformationCircleIcon width={12} height={12} className="hidden fill-gray-40 sm:block" />
      <p className="ml-2 text-gray-40">Connect a wallet to register a name</p>
    </div>
  );
}
