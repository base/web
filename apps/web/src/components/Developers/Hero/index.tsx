'use client';

import classNames from 'classnames';
import Button from 'apps/web/src/components/base-org/Button';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { useCallback, useEffect, useState } from 'react';
import { SearchModal } from 'apps/web/src/components/Developers/Hero/SearchModal';
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

  const handleImplementSiwB = useCallback(() => {
    window.open(
      'https://vocs-migration-mvp-one.vercel.app/dev-tools/identity/smart-wallet/quick-start',
      '_blank',
    );
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-black pb-20 pt-20">
      <div className="flex h-[660px] w-full flex-col items-center justify-center py-20">
        <Title className="font-display text-[1.25rem] leading-[1.2em] tracking-tight md:text-[2rem] lg:text-[3rem]">
          What do you want to build?
        </Title>

        <div className="mt-7 flex w-[345px] flex-col items-center md:w-[645px]">
          <div className="relative w-full">
            <Button
              variant={ButtonVariants.SecondaryOutline}
              onClick={handleSearchClick}
              className={classNames(
                'w-full px-6 py-3',
                'bg-illoblack',
                'font-medium text-white',
                'rounded-xl border !border-dark-palette-foregroundMuted/50',
                '!justify-start',
              )}
            >
              <span className="md:hidden">Search tools or templates...</span>
              <span className="hidden md:inline">Search tools or templates to get started</span>
            </Button>
            <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 gap-1 md:flex">
              <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                ⌘
              </div>
              <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                B
              </div>
            </div>
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
              onClick={handleImplementSiwB}
            >
              Implement Sign in with Base
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
