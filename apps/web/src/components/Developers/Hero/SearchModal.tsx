'use client';

import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import Input from 'apps/web/src/components/Input';
import { createPortal } from 'react-dom';

export function SearchModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleCopyCreateOnchain = useCallback(() => {
    const copyCreateOnchain = async () => {
      try {
        await navigator.clipboard.writeText('npm create onchain');
      } catch (error) {
        console.error('Failed to copy to clipboard', error);
      }
    };

    void copyCreateOnchain();
  }, []);

  const handleLaunchAgent = useCallback(() => {
    window.open('https://replit.com/@CoinbaseDev/CDP-AgentKit#README.md', '_blank');
  }, []);

  const handleBuildOnchainStore = useCallback(() => {
    window.open('https://onchain-commerce-template.vercel.app/', '_blank');
  }, []);

  const handleAgentKit = useCallback(() => {
    router.push('/developers/agent-kit');
  }, [router]);

  const handleBaseWallet = useCallback(() => {
    router.push('/developers/base-wallet');
  }, [router]);

  const handleBaseAppChains = useCallback(() => {
    router.push('/developers/app-chains');
  }, [router]);

  const handleSearchInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSearchInputBlur = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="max-w-screen flex min-h-screen flex-col bg-black text-white selection:bg-[#C5DAFC] selection:text-blue">
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80">
        <div
          aria-label="search-modal"
          aria-modal="true"
          role="dialog"
          className={classNames(
            'bg-illoblack',
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'max-h-[460px] w-[555px] overflow-y-auto',
            'rounded-xl border border-gray-muted  hover:border-gray-muted',
          )}
        >
          <Input
            ref={searchInputRef}
            onFocus={handleSearchInputFocus}
            onBlur={handleSearchInputBlur}
            className={classNames(
              'w-full p-4',
              'bg-illoblack',
              'border-b border-gray-muted hover:border-gray-muted focus:outline-none',
            )}
            placeholder="Search tools or templates to get started"
          />
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col items-start justify-center">
              <div className="w-full px-4 py-2 text-sm uppercase text-gray-muted">Quickstart</div>
              <ModalEntry
                label="npm create onchain"
                icon="copy"
                onClick={handleCopyCreateOnchain}
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full px-4 py-2 text-sm uppercase text-gray-muted">
                Start with a Template
              </div>
              <ModalEntry
                label="Launch an AI agent"
                icon="diagonalUpArrow"
                onClick={handleLaunchAgent}
              />
              <ModalEntry
                label="Build an onchain store"
                icon="diagonalUpArrow"
                onClick={handleBuildOnchainStore}
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="w-full px-4 py-2 text-sm uppercase text-gray-muted">Tools</div>
              <ModalEntry
                label="AgentKit"
                icon="backArrow"
                rotateIcon="rotate-180"
                onClick={handleAgentKit}
              />
              <ModalEntry
                label="Base Wallet"
                icon="backArrow"
                rotateIcon="rotate-180"
                onClick={handleBaseWallet}
              />
              <ModalEntry
                label="Base App Chains"
                icon="backArrow"
                rotateIcon="rotate-180"
                onClick={handleBaseAppChains}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ModalEntry({
  label,
  icon,
  rotateIcon,
  onClick,
}: {
  label: string;
  icon: string;
  rotateIcon?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={classNames(
        'group',
        'w-full rounded-xl px-4 py-2',
        'font-mono text-white',
        'flex items-center justify-between',
        'hover:bg-dark-palette-backgroundAlternate active:bg-dark-palette-secondary',
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      <div
        className={classNames('opacity-0 transition-opacity group-hover:opacity-100', rotateIcon)}
      >
        <Icon name={icon} width="16" height="16" />
      </div>
    </button>
  );
}
