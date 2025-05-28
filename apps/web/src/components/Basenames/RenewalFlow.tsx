'use client';
import dynamic from 'next/dynamic';
import { Transition } from '@headlessui/react';
import RegistrationBackground from 'apps/web/src/components/Basenames/RegistrationBackground';
import RenewalForm from 'apps/web/src/components/Basenames/RenewalForm';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import { UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill/types';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { isDevelopment } from 'libs/base-ui/constants';
import { Basename } from '@coinbase/onchainkit/identity';

const RegistrationStateSwitcherDynamic = dynamic(
  async () => import('apps/web/src/components/Basenames/RegistrationStateSwitcher'),
  { ssr: false },
);

type RenewalFlowProps = {
  name: string;
};

export function RenewalFlow({ name }: RenewalFlowProps) {
  const { chain } = useAccount();
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
    <>
      {true && isDevelopment && <RegistrationStateSwitcherDynamic />}
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

        {/* Animated background for each step */}
        <RegistrationBackground />
      </section>
    </>
  );
}

export default RenewalFlow;
