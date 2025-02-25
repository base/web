'use client';

import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import agentkit from 'apps/web/src/components/Builders/AgentKit/agentkit.svg';
import { Demo } from 'apps/web/src/components/Builders/AgentKit/Demo';
import { AGENTKIT_DOCS_LINK } from 'apps/web/src/components/Builders/AgentKit/links';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Image, { StaticImageData } from 'next/image';
import { useCallback, useState } from 'react';

export function Hero() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npx create-agentkit-app');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);
  return (
    <div className="flex flex-col gap-2 pt-20 sm:items-center">
      <div className="flex items-center gap-2 pb-6 text-[#E66020]">
        <Image
          src={agentkit as StaticImageData}
          alt="agentkit"
          width={32}
          height={32}
          className="h-5 w-5"
        />
        <Title level={TitleLevel.Title3} className="font-bold">
          AgentKit
        </Title>
      </div>
      <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
        Every AI agent deserves a crypto wallet
      </Title>
      <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
        Every AI agent deserves a crypto wallet
      </Title>
      <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted sm:text-center">
        A production-ready, framework-agnostic toolkit to give AI agents access to crypto wallets
        and allow them to transact onchain.
      </Title>

      <div className="flex gap-4 bg-black pb-24  pt-5 max-sm:flex-col">
        <button
          type="button"
          className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-lg bg-white px-4 pb-3 pt-3 font-medium text-dark-palette-primaryForeground transition-colors hover:bg-white/90 max-sm:mr-auto"
          onClick={handleCopy}
        >
          npx create-agentkit-app
          {hasCopied ? (
            <div className="text-green-60">
              <Icon name="checkmark" width="16" height="16" color="currentColor" />
            </div>
          ) : (
            <Icon name="copy" width="16" height="16" color="currentColor" />
          )}
        </button>
        <ButtonWithLinkAndEventLogging
          href={AGENTKIT_DOCS_LINK}
          target="_blank"
          variant={ButtonVariants.SecondaryOutline}
          buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
          eventName="agentkit-docs"
        >
          <div className="flex items-center justify-between gap-6">
            <span>Docs</span>
            <div className="transition-transform duration-200 group-hover:translate-x-1">
              <Icon name="arrowRight" width={16} height={16} color="white" />
            </div>
          </div>
        </ButtonWithLinkAndEventLogging>
      </div>
      <Demo />
    </div>
  );
}
