'use client';

import Image, { StaticImageData } from 'next/image';
import { useCallback, useState } from 'react';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { HeaderAnimation } from 'apps/web/src/components/Builders/MiniKit/HeaderAnimation';
import minikit from 'apps/web/src/components/Builders/MiniKit/minikit.svg';
import { Icon } from 'apps/web/src/components/Icon/Icon';

export const GET_STARTED_URL = 'https://docs.base.org/builderkits/minikit/overview';
const MINIKIT_COMMAND = 'npx create-onchain --mini';

export function Hero() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(MINIKIT_COMMAND);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);

  return (
    <div className="flex items-center justify-between gap-10 pt-20 max-sm:flex-col">
      <div className="flex max-w-xl flex-col gap-2">
        <div className="flex items-center gap-2 pb-6 text-[#D058C1]">
          <Image
            src={minikit as StaticImageData}
            alt="minikit"
            width={32}
            height={32}
            className="h-5 w-5"
          />
          <Title level={TitleLevel.Title3} className="font-bold">
            Mini Apps
          </Title>
        </div>
        <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
          All-you-need to build and grow your mini apps
        </Title>
        <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
          All-you-need to build and grow your mini apps
        </Title>
        <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted">
          Mini apps make it simple to build and supercharge distribution across decentralized
          platforms.
        </Title>

        <div className="flex gap-4 pt-5  max-sm:flex-col">
          <button
            type="button"
            className="inline-flex items-center gap-2.5 rounded-lg bg-white px-4 pb-3 pt-3 font-medium text-dark-palette-primaryForeground transition-colors hover:bg-white/90 max-sm:mr-auto"
            onClick={handleCopy}
          >
            {MINIKIT_COMMAND}
            {hasCopied ? (
              <div className="text-green-60">
                <Icon name="checkmark" width="16" height="16" color="currentColor" />
              </div>
            ) : (
              <Icon name="copy" width="16" height="16" color="currentColor" />
            )}
          </button>
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
            href={GET_STARTED_URL}
            eventName="minikit-get-started"
            target="_blank"
          >
            <div className="flex items-center gap-4">
              <span>Get started</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>

      <HeaderAnimation />
    </div>
  );
}
