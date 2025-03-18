'use client';

import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { StaticImageData } from 'next/image';
import onchainkit from 'apps/web/src/components/Builders/Onchainkit/onchainkit.svg';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { useCallback, useState } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';

const ONCHAINKIT_DOCS_LINK = 'https://docs.base.org/builderkits/onchainkit/getting-started';
const ONCHAINKIT_GITHUB_LINK = 'https://github.com/coinbase/onchainkit';

export function Hero() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);

  return (
    <div className="flex flex-col gap-2 pt-20 sm:items-center">
      <div className="flex items-center gap-2 pb-6 text-[#818CF8]">
        <Image
          src={onchainkit as StaticImageData}
          alt="onchainkit"
          width={32}
          height={32}
          className="h-5 w-5"
        />
        <Title level={TitleLevel.Title3} className="font-bold">
          OnchainKit
        </Title>
      </div>
      <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
        Build onchain apps in minutes
      </Title>
      <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
        Build onchain apps in minutes
      </Title>
      <Title level={TitleLevel.Title3} className="text-gray-muted">
        Ready-to-use, full-stack components to make building onchain faster and easier.
      </Title>

      <div className="flex gap-4 pt-5 max-sm:max-w-[240px] max-sm:flex-col">
        <button
          type="button"
          className="inline-flex items-center gap-2.5 rounded-lg bg-white px-4 pb-3 pt-3 font-medium text-dark-palette-primaryForeground transition-colors hover:bg-white/90 max-sm:mr-auto"
          onClick={handleCopy}
        >
          npm create onchain
          {hasCopied ? (
            <div className="text-green-60">
              <Icon name="checkmark" width="16" height="16" color="currentColor" />
            </div>
          ) : (
            <Icon name="copy" width="16" height="16" color="currentColor" />
          )}
        </button>
        <div className="flex gap-3 items-center">
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
            href={ONCHAINKIT_DOCS_LINK}
            eventName="onchainkit-documentation-click"
            target="_blank"
          >
            <div className="flex items-center justify-between gap-6">
              <span>Docs</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
            href={ONCHAINKIT_GITHUB_LINK}
            eventName="onchainkit-github-click"
            target="_blank"
          >
            <div className="flex items-center justify-between py-1 px-0.5"> 
              <Icon name="github" width={16} height={16} color="white" />  
            </div>
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>
    </div>
  );
}
