'use client';

import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { SearchModal } from 'apps/web/src/components/Builders/Landing/Hero/SearchModal';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { TextShimmer } from 'apps/web/src/components/Builders/Shared/TextShimmer';
import { GridHero } from 'apps/web/src/components/Builders/Landing/Hero/GridHero';

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

  return (
    <div className="mb-6 flex w-full flex-col items-center justify-center bg-black">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden md:h-[660px]">
        <div
          className={classNames(
            'absolute inset-0',
            'before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-20 before:bg-gradient-to-b before:from-black before:via-black/50 before:to-transparent',
            'after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-24 after:bg-gradient-to-t after:from-black after:via-black/50 after:to-transparent',
          )}
        >
          <GridHero hasBlue />
        </div>
        
        <div className="absolute top-20 z-20 flex w-full md:justify-center px-6">
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            iconName="arrowRight"
            buttonClassNames="!xs:max-w-[350px] !rounded-full text-xs md:text-sm font-medium tracking-wide bg-white/20 text-white backdrop-blur-sm border-none !px-2.5 !py-1"
            href="https://flashblocks.base.org/"
            eventName="flashblocks-announcement"
            target="_blank"
          >
            Base is now 10x faster with 200ms block times
          </ButtonWithLinkAndEventLogging>
        </div>

        <div className="z-10 flex w-full flex-col items-center px-6">
          <Title className="font-display text-[1.25rem] leading-[1.2em] tracking-tight md:text-[2rem] lg:text-[3rem]">
            What do you want to build today?
          </Title>

          <div className="mt-7 flex w-full flex-col items-center gap-4 md:w-full">
            <div className="z-10 flex w-full flex-col items-start justify-center gap-4 md:flex md:flex-row md:items-center md:justify-center">
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.SecondaryOutline}
                iconName="baseOrgDiagonalUpArrow"
                buttonClassNames="rounded-xl text-sm font-medium"
                href="https://docs.base.org/builderkits/onchainkit/getting-started"
                eventName="build-app-in-10-minutes"
                target="_blank"
              >
                Build an app in 10 minutes
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.SecondaryOutline}
                iconName="baseOrgDiagonalUpArrow"
                buttonClassNames="rounded-xl text-sm font-medium"
                eventName="launch-ai-agent"
                href="https://replit.com/t/coinbase-developer-platform/repls/AgentKitjs-Quickstart-020-EVM-CDP-Wallet/view#README.md"
                target="_blank"
              >
                Launch an AI agent
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.SecondaryOutline}
                iconName="baseOrgDiagonalUpArrow"
                buttonClassNames="rounded-xl text-sm font-medium"
                href="https://docs.base.org/builderkits/onchainkit/checkout/checkout"
                eventName="accept-crypto-payments"
                target="_blank"
              >
                Accept crypto payments
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.SecondaryOutline}
                iconName="ai"
                buttonClassNames="rounded-xl text-sm font-medium"
                href="https://docs.base.org/llms.txt"
                eventName="accept-crypto-payments"
                target="_blank"
              >
                Start with AI docs
              </ButtonWithLinkAndEventLogging>
            </div>

            <div className="relative w-full max-sm:hidden">
              <button
                type="button"
                onClick={handleSearchClick}
                className={classNames(
                  'whitespace-nowrap text-base', // Button shared base
                  'transition-all', // Button shared transition
                  'w-full px-4 py-3 md:px-6',
                  'font-medium text-white',
                )}
              >
                <div className="flex h-9 w-full items-start gap-4 md:items-center md:justify-center">
                  <div className="tracking-normal md:hidden">Quickstart...</div>
                  <TextShimmer
                    className="hidden text-sm tracking-normal hover:text-white md:inline"
                    duration={2}
                  >
                    Go to tools, templates, or guides with
                  </TextShimmer>
                  <div className="flex gap-1 text-xs">
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
          </div>
        </div>
      </div>
    </div>
  );
}
