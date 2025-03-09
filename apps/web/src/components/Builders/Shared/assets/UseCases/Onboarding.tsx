'use client';

import classNames from 'classnames';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import './styles.css';

export function AnimatedOnboarding() {
  return (
    <div className="group relative mx-auto w-full max-w-sm space-y-2">
      <div
        className={classNames(
          'relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-black',
          'transition-colors hover:before:opacity-100',
          'before:absolute before:inset-0',
          'before:opacity-0 before:transition-opacity',
          'before:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.1),transparent_40%)]',
          'shimmer-effect',
        )}
      >
        <div className="flex h-12 items-center justify-center gap-2 font-medium tracking-normal text-white">
          <Icon name="wallet" width={24} height={24} color="white" />
          Coinbase Wallet
        </div>
      </div>
      <div className="h-12 w-full rounded-xl bg-dark-state-s-hovered" />
      <div className="h-12 w-full rounded-xl bg-dark-state-s-hovered" />
    </div>
  );
}
