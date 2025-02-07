'use client';

import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import Input from 'apps/web/src/components/Input';
import { createPortal } from 'react-dom';
import Link from 'next/link';

export function SearchModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const handleSearchInputFocus = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleSearchInputBlur = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={classNames(
        'fixed inset-0 z-50 overflow-hidden',
        'bg-black/90 text-white selection:bg-[#C5DAFC] selection:text-blue',
      )}
    >
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
            <button
              type="button"
              className={classNames(
                'group',
                'w-full rounded-xl px-4 py-2',
                'font-mono text-white',
                'flex items-center justify-between',
                'hover:bg-dark-palette-backgroundAlternate active:bg-dark-palette-secondary',
              )}
              onClick={handleCopyCreateOnchain}
            >
              <span>npm create onchain</span>
              <div className="opacity-0 transition-opacity group-hover:opacity-100">
                <Icon name="copy" width="16" height="16" />
              </div>
            </button>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-full px-4 py-2 text-sm uppercase text-gray-muted">
              Start with a Template
            </div>
            <ModalEntry
              label="Launch an AI agent"
              icon="diagonalUpArrow"
              href="https://replit.com/@CoinbaseDev/CDP-AgentKit#README.md"
            />
            <ModalEntry
              label="Build an onchain store"
              icon="diagonalUpArrow"
              href="https://onchain-commerce-template.vercel.app/"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="w-full px-4 py-2 text-sm uppercase text-gray-muted">Tools</div>
            <ModalEntry
              label="AgentKit"
              icon="backArrow"
              rotateIcon="rotate-180"
              href="/developers/agent-kit"
            />
            <ModalEntry
              label="Base Wallet"
              icon="backArrow"
              rotateIcon="rotate-180"
              href="/developers/base-wallet"
            />
            <ModalEntry
              label="Base App Chains"
              icon="backArrow"
              rotateIcon="rotate-180"
              href="/developers/app-chains"
            />
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
  href,
}: {
  label: string;
  icon: string;
  rotateIcon?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={classNames(
        'group',
        'w-full rounded-xl px-4 py-2',
        'font-mono text-white',
        'flex items-center justify-between',
        'hover:bg-dark-palette-backgroundAlternate active:bg-dark-palette-secondary',
      )}
    >
      <span>{label}</span>
      <div
        className={classNames('opacity-0 transition-opacity group-hover:opacity-100', rotateIcon)}
      >
        <Icon name={icon} width="16" height="16" />
      </div>
    </Link>
  );
}
