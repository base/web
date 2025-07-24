'use client';
import { Transition } from '@headlessui/react';
import RegistrationBackground from 'apps/web/src/components/Basenames/RegistrationBackground';
import RenewalForm from 'apps/web/src/components/Basenames/RenewalForm';
import RenewalSuccessMessage from 'apps/web/src/components/Basenames/RenewalSuccessMessage';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import { UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill/types';
import useBasenameChain, { supportedChainIds } from 'apps/web/src/hooks/useBasenameChain';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { RegistrationSteps } from 'apps/web/src/components/Basenames/RegistrationContext';
import RenewalProvider, {
  useRenewal,
  RenewalSteps,
} from 'apps/web/src/components/Basenames/RenewalContext';
import { Basename } from '@coinbase/onchainkit/identity';

type RenewalFlowProps = {
  name: string;
};

function RenewalFlowContent() {
  const { chain } = useAccount();
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();
  const { renewalStep, formattedName } = useRenewal();

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

  const isForm = renewalStep === RenewalSteps.Form;
  const isPending = renewalStep === RenewalSteps.Pending;
  const isSuccess = renewalStep === RenewalSteps.Success;

  // Map renewal steps to registration steps for background animations
  const backgroundRegistrationStep = useMemo(() => {
    switch (renewalStep) {
      case RenewalSteps.Form:
        return RegistrationSteps.Claim; // Globe video with gray background
      case RenewalSteps.Pending:
        return RegistrationSteps.Pending; // Vortex animation with gray background
      case RenewalSteps.Success:
        return RegistrationSteps.Success; // Fireworks video with blue background
      default:
        return RegistrationSteps.Claim;
    }
  }, [renewalStep]);

  const layoutPadding = 'px-4 md:px-8';
  const renewalTransitionDuration = 'duration-700';

  const mainClasses = classNames(
    'w-full relative min-h-screen pb-40',
    'transition-[padding]',
    layoutPadding,
    renewalTransitionDuration,
    {
      'pt-[calc(35vh)] md:pt-[calc(50vh)]': isForm || isPending || isSuccess,
      'delay-500': isSuccess,
    },
  );

  const currentUsernamePillVariant = UsernamePillVariants.Inline;

  return (
    <section className={mainClasses}>
      {/* Username Pill and Status */}
      <div className="relative flex w-full max-w-full flex-col items-center justify-center md:-translate-y-12">
        <Transition
          appear
          show={!isSuccess}
          className={classNames(
            'relative z-10 w-full max-w-full transition-opacity',
            renewalTransitionDuration,
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <p className="absolute left-1/2 z-9 mx-auto w-full -translate-x-1/2 -translate-y-20 text-center text-gray-50 transition-opacity">
            EXTEND REGISTRATION
          </p>
          {/* The pill */}
          <Transition
            appear
            show={!isSuccess}
            className={classNames(
              'transition-[max-width, transform] mx-auto',
              renewalTransitionDuration,
            )}
            enterFrom="max-w-0"
            enterTo="max-w-full"
          >
            <UsernamePill
              variant={currentUsernamePillVariant}
              username={formattedName as Basename}
              isRegistering={isPending}
            />
          </Transition>
        </Transition>

        {/* Pending status - positioned based on username pill */}
        <Transition
          appear
          show={isPending}
          className={classNames(
            'absolute left-1/2 top-full mt-6 -translate-x-1/2 transform animate-pulse text-center transition-opacity',
            renewalTransitionDuration,
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {isPending && (
            <p className="text-line text-center font-bold uppercase tracking-widest text-gray-60">
              Extending...
            </p>
          )}
        </Transition>

        {/* Renewal Form */}
        <Transition
          appear
          show={isForm}
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
          <RenewalForm />
        </Transition>

        {/* Renewal Success Message */}
        <Transition
          appear
          show={isSuccess}
          className={classNames(
            'top-full z-40 mt-20 transition-opacity',
            'mx-auto w-full',
            renewalTransitionDuration,
          )}
          enter={classNames('transition-opacity', renewalTransitionDuration)}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={classNames('transition-opacity', 'duration-200 absolute')}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <RenewalSuccessMessage />
        </Transition>
      </div>

      {/* Animated background that responds to renewal state */}
      <RegistrationBackground registrationStep={backgroundRegistrationStep} />
    </section>
  );
}

export function RenewalFlow({ name }: RenewalFlowProps) {
  return (
    <RenewalProvider name={name}>
      <RenewalFlowContent />
    </RenewalProvider>
  );
}

export default RenewalFlow;
