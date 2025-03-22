'use client';
import dynamic from 'next/dynamic';
import { useLocalStorage } from 'usehooks-ts';
import { Transition } from '@headlessui/react';
import RegistrationBackground from 'apps/web/src/components/Basenames/RegistrationBackground';
import RegistrationBrand from 'apps/web/src/components/Basenames/RegistrationBrand';
import {
  RegistrationSteps,
  registrationTransitionDuration,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import RegistrationForm from 'apps/web/src/components/Basenames/RegistrationForm';
import RegistrationProfileForm from 'apps/web/src/components/Basenames/RegistrationProfileForm';
import RegistrationSearchInput from 'apps/web/src/components/Basenames/RegistrationSearchInput';
import { RegistrationSearchInputVariant } from './RegistrationSearchInput/types';
import RegistrationSuccessMessage from 'apps/web/src/components/Basenames/RegistrationSuccessMessage';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import { UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill/types';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import {
  formatBaseEthDomain,
  IS_EARLY_ACCESS,
  USERNAME_DOMAINS,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { InformationCircleIcon } from '@heroicons/react/16/solid';
import Tooltip from 'apps/web/src/components/Tooltip';
import RegistrationShareOnSocials from 'apps/web/src/components/Basenames/RegistrationShareOnSocials';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { isDevelopment } from 'apps/web/src/constants';
import RegistrationLandingExplore from 'apps/web/src/components/Basenames/RegistrationLandingExplore';

const RegistrationStateSwitcherDynamic = dynamic(
  async () => import('apps/web/src/components/Basenames/RegistrationStateSwitcher'),
  { ssr: false },
);

export const claimQueryKey = 'claim';

export function RegistrationFlow() {
  const { chain } = useAccount();
  const searchParams = useSearchParams();
  const [, setIsModalOpen] = useLocalStorage('BasenamesLaunchModalVisible', true);
  const [, setIsBannerVisible] = useLocalStorage('basenamesLaunchBannerVisible', true);
  const [, setIsDocsBannerVisible] = useLocalStorage('basenamesLaunchDocsBannerVisible', true);

  const {
    registrationStep,
    searchInputFocused,
    selectedName,
    setSelectedName,
    setRegistrationStep,
  } = useRegistration();
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();

  const isOnSupportedNetwork = useMemo(
    () => chain && supportedChainIds.includes(chain.id),
    [chain],
  );

  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: basenameChain.id }),
    [basenameChain.id, switchChain],
  );

  useEffect(() => {
    if (!chain || !switchToIntendedNetwork) {
      return;
    }

    if (!isOnSupportedNetwork) {
      switchToIntendedNetwork();
    }
  }, [isOnSupportedNetwork, chain, switchToIntendedNetwork]);

  const isSearch = registrationStep === RegistrationSteps.Search;
  const isClaim = registrationStep === RegistrationSteps.Claim;
  const isPending = registrationStep === RegistrationSteps.Pending;
  const isSuccess = registrationStep === RegistrationSteps.Success;
  const isProfile = registrationStep === RegistrationSteps.Profile;

  const layoutPadding = 'px-4 md:px-8';
  const absoluteLayoutPosition = 'top-[40vh] md:top-[50vh]';

  const mainClasses = classNames(
    'w-full relative min-h-screen pb-40',
    'transition-[padding]',
    layoutPadding,
    registrationTransitionDuration,
    {
      'pt-[calc(40vh)] md:pt-[calc(50vh)]': isSearch,
      'pt-[calc(35vh)] md:pt-[calc(50vh)]': isClaim || isPending || isSuccess,
      'delay-500': isSuccess || isProfile,
      'pt-44 md:pt-48': isProfile,
    },
  );

  const currentUsernamePillVariant = isProfile
    ? UsernamePillVariants.Card
    : UsernamePillVariants.Inline;

  const onBackArrowClick = useCallback(() => {
    setRegistrationStep(RegistrationSteps.Search);
    setSelectedName('');
  }, [setRegistrationStep, setSelectedName]);

  useEffect(() => {
    const claimQuery = searchParams?.get(claimQueryKey);
    if (claimQuery) {
      setSelectedName(claimQuery.replace(`.${USERNAME_DOMAINS[basenameChain.id]}`, ''));
    }
  }, [basenameChain.id, searchParams, setSelectedName]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      setIsBannerVisible(false);
      setIsDocsBannerVisible(false);
    }
  }, [isSuccess, setIsModalOpen, setIsBannerVisible, setIsDocsBannerVisible]);

  return (
    <>
      {true && isDevelopment && <RegistrationStateSwitcherDynamic />}
      <section className={mainClasses}>
        {/* 1. Brand & Search */}
        <Transition
          appear
          show={isSearch}
          className={classNames(
            'absolute left-1/2 z-8 mx-auto w-full max-w-2xl -translate-x-1/2 transform transition-opacity  md:-translate-y-1/2',
            registrationTransitionDuration,
            absoluteLayoutPosition,
            {
              'text-white': searchInputFocused,
              'text-blue-600': searchInputFocused,
            },
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={classNames('relative bottom-full w-full pb-4', layoutPadding)}>
            <RegistrationBrand />
          </div>
          <Transition
            appear
            show={isSearch}
            className={classNames(
              'mx-auto transition-[max-width] ',
              registrationTransitionDuration,
              layoutPadding,
            )}
            leaveFrom="max-w-full"
            leaveTo="max-w-0"
          >
            <RegistrationSearchInput
              variant={RegistrationSearchInputVariant.Large}
              placeholder="Search for a name"
            />
            {IS_EARLY_ACCESS && (
              <Tooltip
                content="shrek.base.eth is already taken."
                className="mx-auto mt-6 flex items-center justify-center"
              >
                <>
                  <p
                    className={classNames({
                      'text-white': searchInputFocused,
                      'text-gray-40': !searchInputFocused,
                    })}
                  >
                    You can claim one Basename per wallet for early access.
                  </p>
                  <InformationCircleIcon
                    width={12}
                    height={12}
                    className={classNames('ml-1 hidden sm:block', {
                      'fill-white': searchInputFocused,
                      'fill-gray-40': !searchInputFocused,
                    })}
                  />
                </>
              </Tooltip>
            )}
          </Transition>
        </Transition>
        {/* 2 - Username Pill */}
        <div className="relative flex w-full max-w-full flex-col items-center justify-center md:-translate-y-12">
          <Transition
            appear
            show={!isSearch}
            className={classNames(
              'relative z-10 w-full transition-opacity',
              registrationTransitionDuration,
              {
                'w-full max-w-[26rem]': isProfile,
                'max-w-full': !isProfile,
              },
            )}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* 2.1 - Small search input - positioned based on username pill, only for claim  */}
            <Transition
              appear
              show={isClaim}
              className={classNames(
                'absolute left-1/2 z-9 mx-auto w-full -translate-x-1/2 -translate-y-[calc(15vh)] transition-opacity md:max-w-[16rem]  md:-translate-y-20',
                registrationTransitionDuration,
              )}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex gap-4 px-2">
                <button onClick={onBackArrowClick} type="button" aria-label="Find another name">
                  <Icon name="backArrow" color="currentColor" height="1rem" width="1rem" />
                </button>
                <RegistrationSearchInput
                  variant={RegistrationSearchInputVariant.Small}
                  placeholder="Find another name"
                />
              </div>
            </Transition>
            {/* 2.2 - The pill  */}
            <Transition
              appear
              show={!isSearch}
              className={classNames(
                'transition-[max-width, transform] mx-auto',
                registrationTransitionDuration,
              )}
              enterFrom="max-w-0"
              enterTo="max-w-full"
            >
              <UsernamePill
                variant={currentUsernamePillVariant}
                username={formatBaseEthDomain(selectedName, basenameChain.id)}
                isRegistering={isPending}
              />
            </Transition>

            {/* 2.2 - Pending registration - positioned based on username pill */}
            <Transition
              appear
              show={isPending}
              className={classNames(
                'absolute left-1/2 top-full mt-6 -translate-x-1/2 transform animate-pulse text-center transition-opacity ',
                registrationTransitionDuration,
              )}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {isPending && (
                <p className="text-line text-center font-bold uppercase tracking-widest text-gray-60">
                  Registering...
                </p>
              )}
            </Transition>

            {/* 2.3 - Success, share on social - positioned based on username pill */}
            <Transition
              appear
              show={isSuccess}
              className={classNames(
                'absolute left-1/2 top-full mt-6 w-full -translate-x-1/2  transform text-center transition-opacity',
                registrationTransitionDuration,
              )}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {isSuccess && <RegistrationShareOnSocials />}
            </Transition>
          </Transition>

          {/* 3. Registration Form */}
          <Transition
            appear
            show={isClaim}
            className={classNames(
              'relative z-40 transition-opacity',
              'mx-auto',
              registrationTransitionDuration,
            )}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <RegistrationForm />
          </Transition>

          {/* 4. Registration Success Message */}
          <Transition
            appear
            show={isSuccess}
            className={classNames(
              'top-full z-40 mt-20 transition-opacity',
              'mx-auto w-full',
              registrationTransitionDuration,
            )}
            enter={classNames('transition-opacity', registrationTransitionDuration)}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave={classNames('transition-opacity', 'duration-200 absolute')}
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <RegistrationSuccessMessage />
          </Transition>
        </div>
        {/* 5. Registration: Edit Profile flow */}
        <Transition
          appear
          show={isProfile}
          className={classNames(
            'relative z-50 mx-auto transition-opacity',
            'w-full max-w-[26rem]',
            registrationTransitionDuration,
          )}
          enter="delay-1000"
          enterFrom={classNames('opacity-0')}
          enterTo={classNames('opacity-100')}
          leave="transition-all "
          leaveFrom="opacity-100"
          leaveTo="opacity-0 "
        >
          <RegistrationProfileForm />
        </Transition>
        <Transition
          appear
          show={isSearch}
          className={classNames(
            'absolute bottom-14 left-1/2 flex w-full -translate-x-1/2 justify-center transition-opacity',
            'mx-auto w-full',
            registrationTransitionDuration,
          )}
          enter={classNames('transition-opacity', registrationTransitionDuration)}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={classNames('transition-opacity', 'duration-200 absolute')}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <RegistrationLandingExplore />
        </Transition>

        {/* Misc: Animated background for each steps */}
        <RegistrationBackground />
      </section>
    </>
  );
}

export default RegistrationFlow;
