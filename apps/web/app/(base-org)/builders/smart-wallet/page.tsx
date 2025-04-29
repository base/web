import type { Metadata } from 'next';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { InfoCards } from 'apps/web/src/components/Builders/SmartWallet/InfoCards';
import { Transactions } from 'apps/web/src/components/Builders/SmartWallet/Transactions';
import { Customers } from 'apps/web/src/components/Builders/SmartWallet/Customers';
import wallet from 'apps/web/src/components/Builders/SmartWallet/svg/wallet.svg';
import headerImage from 'apps/web/src/components/Builders/SmartWallet/header.png';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import Image, { StaticImageData } from 'next/image';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { LiveDemo } from 'apps/web/src/components/Builders/Shared/LiveDemo';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Link from 'apps/web/src/components/Link';
import smartWalletCover from './smart-wallet.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Smart Wallet`,
  openGraph: {
    title: `Base | Smart Wallet`,
    url: `/builders/smart-wallet`,
    images: [smartWalletCover.src],
  },
};

const components = ['Wallet'];

export default async function BaseWallet() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col items-center gap-40 bg-black px-2 pt-20 md:px-0">
        {/* Header  */}
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
            <div className="flex gap-4 pt-5">
              <ButtonWithLinkAndEventLogging
                target="_blank"
                variant={ButtonVariants.Secondary}
                buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
                eventName="wallet-start-building"
                href="https://docs.base.org/identity/smart-wallet/quickstart"
              >
                <div className="flex items-center gap-4">
                  <span>Start building</span>
                  <div className="transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="arrowRight" width={16} height={16} color="black" />
                  </div>
                </div>
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
            href="https://docs.base.org/identity/smart-wallet/llms.txt"
            target="_blank"
            variant={ButtonVariants.SecondaryOutline}
            buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
            eventName="smart-wallet-ai-docs"
          >
            <div className="flex items-center justify-between gap-6">
              <span>AI docs</span>
              <div className="transition-transform duration-200">
                <Icon name="ai" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
            </div>
          </div>

          <Image src={headerImage} alt="header-image" width={400} className="max-sm:hidden" />
        </div>

        <Customers />
        <InfoCards />
        <Transactions />
        <LiveDemo
          components={components}
          title="Unlock onboarding superpowers with a few lines of code"
          hideDescription
        />

        <CtaBanner
          title="Integrate Smart Wallet in minutes"
          description="Start building with a starter template or see documentation."
          cta={
            <div className="flex w-full gap-4 max-sm:flex-col max-sm:items-center">
              <ButtonWithLinkAndEventLogging
                variant={ButtonVariants.Secondary}
                href="https://docs.base.org/identity/smart-wallet/quickstart"
                target="_blank"
                eventName="start-building-footer"
                buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
              >
                <div className="flex items-center gap-4">
                  <span>Start building</span>
                  <div className="transition-transform duration-200 group-hover:translate-x-1">
                    <Icon name="arrowRight" width={16} height={16} color="black" />
                  </div>
                </div>
              </ButtonWithLinkAndEventLogging>
              <ButtonWithLinkAndEventLogging
                href="https://docs.base.org/identity/smart-wallet/llms.txt"
                target="_blank"
                variant={ButtonVariants.SecondaryOutline}
                buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
                eventName="smart-wallet-ai-docs"
              >
              <div className="flex items-center justify-between gap-6">
                <span>AI docs</span>
              <div className="transition-transform duration-200">
                <Icon name="ai" width={16} height={16} color="white" />
              </div>
            </div>
          </ButtonWithLinkAndEventLogging>
            </div>
          }
        />
      </main>
    </Container>
  );
}
