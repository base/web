'use client';

import classNames from 'classnames';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { useCallback, useEffect, useState } from 'react';
import { SearchModal } from 'apps/web/src/components/Builders/Hero/SearchModal';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

export function Hero() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchClick = useCallback(() => {
    setIsSearchModalOpen(true);
  }, []);

  const handleLaunchAgent = useCallback(() => {
    window.open('https://docs.cdp.coinbase.com/agentkit/docs/welcome', '_blank');
  }, []);

  const handleBuildOnchainStore = useCallback(() => {
    window.open('https://onchain-commerce-template.vercel.app/', '_blank');
  }, []);

  const handleIntegrateCryptoPayments = useCallback(() => {
    window.open('https://onchainkit.xyz/checkout/checkout', '_blank');
  }, []);

  return (
    <div className="mb-20 flex w-full flex-col items-center justify-center bg-black">
      <div className="flex h-[660px] w-full flex-col items-center justify-center">
        <Title className="font-display text-[1.25rem] leading-[1.2em] tracking-tight md:text-[2rem] lg:text-[3rem]">
          What do you want to build?
        </Title>

        <div className="mt-7 flex w-[345px] flex-col items-center md:w-[645px]">
          <div className="relative w-full">
            <button
              type="button"
              onClick={handleSearchClick}
              className={classNames(
                'whitespace-nowrap text-base', // Button shared base
                'transition-all', // Button shared transition
                'border border-gray-muted/65 bg-transparent hover:bg-white/10', // ButtonVariant.SecondaryOutline
                'w-full px-4 py-3 md:px-6',
                'bg-illoblack',
                'font-medium text-white',
                'rounded-xl border !border-dark-palette-foregroundMuted/20',
              )}
            >
              <div className="flex h-9 w-full items-center justify-between">
                <div className="tracking-normal md:hidden">Search tools or templates...</div>
                <div className="hidden tracking-normal md:inline">
                  Search tools or templates to get started
                </div>
                <div className="flex gap-1">
                  <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                    ⌘
                  </div>
                  <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                    B
                  </div>
                </div>
              </div>
            </button>
            <SearchModal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen} />
          </div>
          <div className="mt-3 flex w-full flex-col items-start justify-between gap-3 md:mt-4 md:flex md:flex-row">
            <Button
              variant={ButtonVariants.SecondaryOutline}
              iconName="baseOrgDiagonalUpArrow"
              className="rounded-xl text-sm"
              onClick={handleLaunchAgent}
            >
              Launch an AI agent
            </Button>
            <Button
              variant={ButtonVariants.SecondaryOutline}
              iconName="baseOrgDiagonalUpArrow"
              className="rounded-xl text-sm"
              onClick={handleBuildOnchainStore}
            >
              Build an onchain store
            </Button>
            <Button
              variant={ButtonVariants.SecondaryOutline}
              iconName="baseOrgDiagonalUpArrow"
              className="rounded-xl text-sm"
              onClick={handleIntegrateCryptoPayments}
            >
              Integrate crypto payments
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
