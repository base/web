'use client';
import { Transition } from '@headlessui/react';
import RegistrationBackground from 'apps/web/src/components/Basenames/RegistrationBackground';
import RenewalForm from 'apps/web/src/components/Basenames/RenewalForm';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import { UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill/types';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { Basename } from '@coinbase/onchainkit/identity';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useRouter } from 'next/navigation';
import { RegistrationSteps } from 'apps/web/src/components/Basenames/RegistrationContext';

type RenewalFlowProps = {
  name: string;
};

export function RenewalFlow({ name }: RenewalFlowProps) {
  const { chain } = useAccount();
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();
  const router = useRouter();

  const isOnSupportedNetwork = useMemo(
    () => chain && supportedChainIds.includes(chain.id),
    [chain],
  );

  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: basenameChain.id }),
    [basenameChain.id, switchChain],
  );

  const onBackArrowClick = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (!chain || !switchToIntendedNetwork) {
      return;
    }

    if (!isOnSupportedNetwork) {
      switchToIntendedNetwork();
    }
  }, [isOnSupportedNetwork, chain, switchToIntendedNetwork]);

  const layoutPadding = 'px-4 md:px-8';
  const renewalTransitionDuration = 'duration-700';

  const mainClasses = classNames(
    'w-full relative min-h-screen pb-40',
    'transition-[padding]',
    layoutPadding,
    renewalTransitionDuration,
    'pt-[calc(35vh)] md:pt-[calc(50vh)]',
  );

  const currentUsernamePillVariant = UsernamePillVariants.Inline;

  return (
    <section className={mainClasses}>
      {/* Username Pill */}
      <div className="relative flex w-full max-w-full flex-col items-center justify-center md:-translate-y-12">
        <Transition
          appear
          show
          className={classNames(
            'relative z-10 w-full max-w-full transition-opacity',
            renewalTransitionDuration,
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute left-1/2 z-9 mx-auto w-full -translate-x-1/2 -translate-y-[calc(15vh)] gap-4 px-2 transition-opacity md:max-w-[16rem] md:-translate-y-20">
            <button
              onClick={onBackArrowClick}
              type="button"
              aria-label="Find another name"
              className="flex items-center gap-6"
            >
              <Icon name="backArrow" color="currentColor" height="1rem" width="1rem" />
              <p className="text-gray-50">EXTEND REGISTRATION</p>
            </button>
          </div>
          {/* The pill */}
          <Transition
            appear
            show
            className={classNames(
              'transition-[max-width, transform] mx-auto',
              renewalTransitionDuration,
            )}
            enterFrom="max-w-0"
            enterTo="max-w-full"
          >
            <UsernamePill variant={currentUsernamePillVariant} username={name as Basename} />
          </Transition>
        </Transition>

        {/* Renewal Form */}
        <Transition
          appear
          show
          className={classNames(
            'relative z-40 transition-opacity',
            'mx-auto',
            renewalTransitionDuration,
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <RenewalForm name={name} />
        </Transition>
      </div>

      {/* The renewal flow should only display the Claim background */}
      <RegistrationBackground registrationStep={RegistrationSteps.Claim} />
    </section>
  );
}

export default RenewalFlow;
