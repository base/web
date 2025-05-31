'use client';
import { Transition } from '@headlessui/react';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import {
  RegistrationSteps,
  registrationTransitionDuration,
} from 'apps/web/src/components/Basenames/RegistrationContext';

import fireworks from './assets/fireworks.webm';
import globe from './assets/globe.webm';
import vortexJson from './assets/vortex.json';
import classNames from 'classnames';
import LottieAnimation from 'apps/web/src/components/LottieAnimation';

export default function RegistrationBackground({
  registrationStep,
}: {
  registrationStep: RegistrationSteps;
}) {
  const isSearch = registrationStep === RegistrationSteps.Search;
  const isClaim = registrationStep === RegistrationSteps.Claim;
  const isPending = registrationStep === RegistrationSteps.Pending;
  const isSuccess = registrationStep === RegistrationSteps.Success;

  const grayVideoBackgroundClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full -z-10 bg-[#F7F7F7]',
  );

  const blueVideoBackgroundClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full -z-10 bg-[#025cfe]',
  );

  const videoClasses = classNames('absolute w-full h-full object-cover motion-reduce:hidden');

  // Large canvas tends to be laggy for complex animation, so we give them a maximum size (50rem)
  const lottieClasses = classNames(
    'absolute w-full h-full max-w-[50rem] max-h-[50rem] object-cover motion-reduce:hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  );

  return (
    <>
      <Transition
        appear
        show={isSearch}
        className={classNames('transition-opacity', registrationTransitionDuration)}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <FloatingENSPills />
      </Transition>
      <Transition
        appear
        show={isClaim}
        className={classNames(
          'transition-opacity',
          registrationTransitionDuration,
          grayVideoBackgroundClasses,
        )}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* TODO: Lottie animation file */}
        <Transition
          appear
          show={isClaim}
          className={classNames(
            'transform-gpu transition-all',
            registrationTransitionDuration,
            videoClasses,
          )}
          enterFrom="scale-0"
          enterTo="scale-100"
        >
          {}
          <video autoPlay className={videoClasses} loop muted playsInline>
            <source src={globe} type="video/webm" />
          </video>
        </Transition>
      </Transition>

      <Transition
        appear
        show={isPending}
        className={classNames(
          'transition-opacity',
          registrationTransitionDuration,
          grayVideoBackgroundClasses,
        )}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <LottieAnimation data={vortexJson} wrapperClassName={lottieClasses} />
      </Transition>

      <Transition
        appear
        show={isSuccess}
        className={classNames(
          'transition-opacity',
          registrationTransitionDuration,
          blueVideoBackgroundClasses,
        )}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* TODO: Lottie animation file */}

        {}
        <video autoPlay className={videoClasses} loop muted playsInline>
          <source src={fireworks} type="video/webm" />
        </video>
      </Transition>
    </>
  );
}
