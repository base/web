'use client';

import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { StaticImageData } from 'next/image';
import wallet from 'apps/web/src/components/Builders/SmartWallet/svg/wallet.svg';
import headerImage from 'apps/web/src/components/Builders/SmartWallet/header.png';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import { useCallback, useState } from 'react';

const SMART_WALLET_DOCS_LINK =
  'https://docs.base.org/identity/smart-wallet/introduction/getting-started';

export function Hero() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText('npm create onchain');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  }, []);

  return (
    <div className="flex w-full items-center justify-between gap-1 pt-20 max-sm:flex-col sm:pb-20">
      <div className="flex max-w-xl flex-col gap-2">
        <div className="flex gap-4 pb-6 text-[#578BFA] max-md:flex-col md:items-center md:gap-5">
          <div className="flex items-center gap-2">
            <Image
              src={wallet as StaticImageData}
              alt="wallet"
              width={32}
              height={32}
              className="h-5 w-5"
            />
            <Title level={TitleLevel.Title3} className="font-bold">
              Smart Wallet
            </Title>
          </div>
          <Link
            href="https://docs.base.org/identity/smart-wallet/introduction/base-gasless-campaign"
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-full border px-2 py-1 max-md:mr-auto"
          >
            <Text variant={TextVariant.Body}>$15K gas credits available</Text>
            <Icon name="arrowRight" width={12} height={12} color="currentColor" />
          </Link>
        </div>
        <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
          The universal account for the onchain future
        </Title>
        <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
          The universal account for the onchain future
        </Title>
        <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted">
          A single sign-on for the open internet. Simple, secure, powerful — no app or extension
          required.
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
          <ButtonWithLinkAndEventLogging
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
            href={SMART_WALLET_DOCS_LINK}
            eventName="smart-wallet-documentation-click"
            target="_blank"
          >
            <div className="flex items-center justify-between gap-6">
              <span>Docs</span>
              <div className="transition-transform duration-200 group-hover:translate-x-1">
                <Icon name="arrowRight" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
        </div>
      </div>

      <Image src={headerImage} alt="header-image" width={400} className="max-sm:hidden" />
    </div>
  );
}
