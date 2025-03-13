'use client';
import usernameBaseLogo from './usernameBaseLogo.svg';
import Link from 'apps/web/src/components/Link';

import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import { StaticImageData } from 'next/dist/shared/lib/get-img-props';
import { useAccount, useSwitchChain } from 'wagmi';
import classNames from 'classnames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { base, baseSepolia } from 'viem/chains';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { Suspense, useCallback } from 'react';
import { isDevelopment } from 'apps/web/src/constants';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';

export default function UsernameNav() {
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();
  const { chain: connectedChain, isConnected } = useAccount();

  const showDevelopmentWarning = isDevelopment && basenameChain.id === base.id;
  const showProductionWarning = !isDevelopment && basenameChain.id === baseSepolia.id;
  const showWrongChainWarning =
    connectedChain?.id !== basenameChain.id && connectedChain?.id !== baseSepolia.id && isConnected;

  const switchToMainnet = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      switchChain({ chainId: base.id });
    },
    [switchChain],
  );

  const switchToTestnet = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      switchChain({ chainId: baseSepolia.id });
    },
    [switchChain],
  );

  const walletStateClasses = classNames('p-2 rounded flex items-center gap-6', {
    'bg-white': isConnected,
  });

  const navigationClasses = classNames(
    'flex h-24 w-full max-w-[1440px] flex-row items-center justify-between gap-4 md:gap-16 self-center bg-transparent px-4 md:px-8',
  );

  return (
    <div className="absolute top-0 z-50 flex w-full flex-col">
      {showDevelopmentWarning && (
        <div className="flex items-center  justify-center gap-2 bg-orange-10 p-2 text-center text-orange-80">
          <p>
            <span className="align-center mr-1 inline-block">
              <Icon name="info" color="currentColor" height="1rem" />
            </span>
            You are on Base Mainnet.{' '}
            <button
              className="text-orange-90 underline underline-offset-2"
              type="button"
              onClick={switchToTestnet}
            >
              Switch to Testnet
            </button>
            ?
          </p>
        </div>
      )}
      {showProductionWarning && (
        <div className="flex items-center  justify-center gap-2 bg-orange-10 p-2 text-center text-orange-80">
          <p>
            <span className="align-center mr-1 inline-block">
              <Icon name="info" color="currentColor" height="1rem" />
            </span>
            You are on Base Sepolia.{' '}
            <button
              className="text-orange-90 underline underline-offset-2"
              type="button"
              onClick={switchToMainnet}
            >
              Switch to Base Mainnet
            </button>{' '}
            to register a .base.eth name.
          </p>
        </div>
      )}
      {showWrongChainWarning && (
        <div className="flex items-center  justify-center gap-2 bg-orange-10 p-2 text-center text-orange-80">
          <p>
            <span className="align-center mr-1 inline-block">
              <Icon name="info" color="currentColor" height="1rem" />
            </span>
            You are not on Base.{' '}
            <button
              className="text-orange-90 underline underline-offset-2"
              type="button"
              onClick={switchToMainnet}
            >
              Switch to Base Mainnet
            </button>{' '}
            to access Basenames features.
          </p>
        </div>
      )}
      <nav className={navigationClasses}>
        <Link href="/">
          <ImageAdaptive src={usernameBaseLogo as StaticImageData} alt="Base" />
        </Link>
        <span className={walletStateClasses}>
          {isConnected && (
            <span className="text-md text-palette-primary">
              <Link href="/manage-names" className="flex items-center gap-2">
                <Icon name="list" color="currentColor" width="1rem" height="1rem" />
                My Basenames
              </Link>
            </span>
          )}
          <Suspense>
            <ConnectWalletButton
              connectWalletButtonVariant={ConnectWalletButtonVariants.Basename}
            />
          </Suspense>
        </span>
      </nav>
    </div>
  );
}
