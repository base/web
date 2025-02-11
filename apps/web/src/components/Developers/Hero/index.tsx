'use client';

import classNames from 'classnames';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { useCallback, useEffect, useState } from 'react';
import { SearchModal } from 'apps/web/src/components/Developers/Hero/SearchModal';

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
        <Title className="font-display text-[2rem] leading-[1.2em] lg:text-[3rem] tracking-tight">
          What do you want to build?
        </Title>

        <div className="mt-7 flex w-[645px] flex-col items-center">
          <div className="relative w-full">
            <Button
              variant={ButtonVariants.SecondaryOutline}
              onClick={handleSearchClick}
              className={classNames(
                'w-full px-6 py-3',
                'bg-illoblack',
                'text-gray-muted',
                'rounded-xl border',
                '!justify-start',
              )}
            >
              Search tools or templates to get started
            </Button>
            <div className="absolute right-6 top-1/2 flex -translate-y-1/2 gap-1">
              <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                ⌘
              </div>
              <div className="flex h-8 w-8 flex-col items-center justify-center rounded-sm bg-gray-80">
                B
              </div>
            </div>
            <SearchModal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen} />
          </div>
          <div className="mt-4 flex w-full justify-between">
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
