import type { Metadata } from 'next';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import basenet from 'apps/web/src/components/Builders/Appchains/basenet.svg';
import { InfoCards } from 'apps/web/src/components/Builders/Appchains/InfoCards';
import { OnchainApps } from 'apps/web/src/components/Builders/Appchains/OnchainApps';
import { Pricing } from 'apps/web/src/components/Builders/Appchains/Pricing';
import { Testimonials } from 'apps/web/src/components/Builders/Appchains/Testimonials';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Image, { StaticImageData } from 'next/image';
import appchainCover from './appchains.png';
import { FAQ } from 'apps/web/src/components/Builders/Appchains/FAQ';

const CDP_APPCHAIN_URL = 'https://portal.cdp.coinbase.com/products/base-appchains';
const DOCS_URL = 'https://docs.cdp.coinbase.com/appchains/docs/welcome';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Appchains`,
  openGraph: {
    title: `Base | Appchains`,
    url: `/builders/base-appchains`,
    images: [appchainCover.src],
  },
};

export default async function Appchains() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col gap-40 bg-black px-2 pt-20 sm:items-center md:px-0">
        <div className="flex flex-col gap-2 pt-20 sm:items-center">
          <div className="flex items-center gap-2 pb-6 text-[#FFDF44]">
            <Image
              src={basenet as StaticImageData}
              alt="basenet"
              width={32}
              height={32}
              className="h-5 w-5"
            />
            <Title level={TitleLevel.Title3} className="font-bold">
              Base Appchains
            </Title>
          </div>
          <Title
            level={TitleLevel.Display3}
            className="max-w-lg font-bold max-sm:hidden sm:text-center"
          >
            Scale your app with a dedicated chain on Base
          </Title>
          <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
            Scale your app with a dedicated chain on Base
          </Title>
          <Title level={TitleLevel.Title3} className="max-w-2xl text-gray-muted sm:text-center">
            Grow your audience and maintain experiences users love.
          </Title>

          <div className="flex gap-4 pt-5 max-sm:flex-col">
            <ButtonWithLinkAndEventLogging
              href={CDP_APPCHAIN_URL}
              target="_blank"
              variant={ButtonVariants.Secondary}
              buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
              eventName="appchains-start-building"
            >
              <div className="flex items-center gap-4">
                <span>Start building</span>
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrowRight" width={16} height={16} color="black" />
                </div>
              </div>
            </ButtonWithLinkAndEventLogging>

            <ButtonWithLinkAndEventLogging
              href={DOCS_URL}
              target="_blank"
              variant={ButtonVariants.SecondaryOutline}
              buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
              eventName="appchains-docs"
            >
              <div className="flex items-center gap-4">
                <span>Docs</span>
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrowRight" width={16} height={16} color="white" />
                </div>
              </div>
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>

        <InfoCards />
        <OnchainApps />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CtaBanner
          title="Your own blockspace, built for scale"
          description="Unlock high-speed and low-cost transactions at scale, with dedicated blockspace and seamless integration with Base tools."
          cta={
            <ButtonWithLinkAndEventLogging
              href={CDP_APPCHAIN_URL}
              target="_blank"
              variant={ButtonVariants.Secondary}
              buttonClassNames="flex items-center justify-between px-4 pb-3 pt-3 group font-medium"
              eventName="appchains-get-started"
            >
              <div className="flex items-center gap-4">
                <span>Get started</span>
                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <Icon name="arrowRight" width={16} height={16} color="black" />
                </div>
              </div>
            </ButtonWithLinkAndEventLogging>
          }
        />
      </main>
    </Container>
  );
}
