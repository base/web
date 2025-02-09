'use client';

import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import Input from 'apps/web/src/components/Input';
import { createPortal } from 'react-dom';

type SearchCategory = {
  category: string;
  subCategories: SubCategory[];
};

type SubCategory = {
  label: string;
  href: string;
  icon: string;
  iconRotation?: string;
  onClick?: () => void;
};

const searchCategories: SearchCategory[] = [
  {
    category: 'Quickstart',
    subCategories: [
      {
        label: 'npm create onchain',
        href: '',
        icon: 'copy',
        onClick: () => {
          const copyCreateOnchain = async () => {
            try {
              await navigator.clipboard.writeText('npm create onchain');
            } catch (error) {
              console.error('Failed to copy to clipboard', error);
            }
          };
          void copyCreateOnchain();
        },
      },
    ],
  },
  {
    category: 'Templates',
    subCategories: [
      {
        label: 'Launch an AI agent',
        href: 'https://replit.com/@CoinbaseDev/CDP-AgentKit#README.md',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Build an onchain store',
        href: 'https://onchain-commerce-template.vercel.app/',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Integrate crypto payments',
        href: 'https://replit.com/@KevinLeffew1/buy-me-a-coffee?v=1#README.md',
        icon: 'diagonalUpArrow',
      },
    ],
  },
  {
    category: 'Tools',
    subCategories: [
      {
        label: 'AgentKit',
        href: '/developers/agentkit',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
      {
        label: 'Base Appchains',
        href: '/developers/appchains',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
      {
        label: 'MiniKit',
        href: '/developers/minikit',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
      {
        label: 'OnchainKit',
        href: '/developers/onchainkit',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
      {
        label: 'Smart Wallet',
        href: '/developers/smartwallet',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
      {
        label: 'Verifications',
        href: '/developers/verifications',
        icon: 'backArrow',
        iconRotation: 'rotate-180',
      },
    ],
  },
  {
    category: 'Guides',
    subCategories: [
      {
        label: 'Onboard any users',
        href: '/developers/guides/onboarding',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Accept crypto payments',
        href: '/developers/guides/payments',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Launch AI Agents',
        href: '/developers/guides/agents',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Decentralized social features',
        href: '/developers/guides/social',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Defi your app',
        href: '/developers/guides/defi',
        icon: 'diagonalUpArrow',
      },
      {
        label: 'Remove first-timer friction',
        href: '/developers/guides/gasless',
        icon: 'diagonalUpArrow',
      },
    ],
  },
];

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
        <div className="flex w-full flex-col gap-4 pt-4">
          <div className="justify-cente flex w-full flex-col items-start">
            {searchCategories.map((searchCategory) => (
              <div key={searchCategory.category} className="w-full">
                <div className="w-full px-4 py-2 text-sm uppercase text-gray-muted">
                  {searchCategory.category}
                </div>
                {searchCategory.subCategories.map((subCategory) => (
                  <button
                    key={subCategory.label}
                    type="button"
                    className={classNames(
                      'group',
                      'w-full rounded-xl px-4 py-2',
                      {
                        'font-mono': searchCategory.category === 'Quickstart',
                      },
                      'text-white',
                      'flex items-center justify-between',
                      'hover:bg-dark-palette-backgroundAlternate active:bg-dark-palette-secondary',
                    )}
                    onClick={
                      subCategory.href ? () => window.open(subCategory.href) : subCategory?.onClick
                    }
                  >
                    <span>{subCategory.label}</span>
                    <div
                      className={classNames(
                        'opacity-0 transition-opacity group-hover:opacity-100',
                        subCategory?.iconRotation,
                      )}
                    >
                      <Icon name={subCategory.icon} width="16" height="16" />
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
