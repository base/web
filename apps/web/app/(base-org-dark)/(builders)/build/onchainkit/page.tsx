import type { Metadata } from 'next';
import { LiveDemo } from 'apps/web/src/components/Builders/Shared/LiveDemo';
import { LinkCard } from 'apps/web/src/components/base-org/shared/LinkCard';
import onchainkitCover from './onchainkit-cover.png';
import { OCKFeaturesSection } from 'apps/web/app/(base-org-dark)/(builders)/build/onchainkit/FeaturesSection';
import {
  CtaActions,
  CtaFooterSection,
} from 'apps/web/app/(base-org-dark)/(builders)/build/onchainkit/CtaFooterSection';
import { BuildersSection } from 'apps/web/app/(base-org-dark)/(builders)/BuildersSection';
import { BuildersContainer } from 'apps/web/app/(base-org-dark)/(builders)/BuildersContainer';
import ockHero from './ock-hero.avif';
const demoComponents = ['Wallet', 'Buy', 'Fund', 'Earn', 'Transact'];

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | OnchainKit`,
  openGraph: {
    title: `Base | OnchainKit`,
    url: `/build/onchainkit`,
    images: [onchainkitCover.src],
  },
};

const templateCardItems: {
  title: string;
  actionCta: string;
  copyText?: string;
  href?: string;
}[] = [
  {
    title: 'Quickstart Template',
    actionCta: 'npx create-onchain@latest',
    copyText: 'npx create-onchain@latest',
  },
  {
    title: 'Onchain Store Template',
    actionCta: 'FORK THE TEMPLATE',
    href: 'https://onchain-commerce-template.vercel.app/',
  },
  {
    title: 'Onchain Social Template',
    actionCta: 'FORK THE TEMPLATE',
    href: 'https://ock-mint.vercel.app/',
  },
];

const CDP_TERMS_OF_SERVICE_LINK =
  'https://www.coinbase.com/legal/developer-platform/terms-of-service';
const CDP_PRIVACY_POLICY_LINK = 'https://www.coinbase.com/legal/privacy';

export default function OnchainKit() {
  return (
    <BuildersContainer
      title="OnchainKit"
      asciiImageSrc={ockHero.src}
      asciiImageContainerClassName="aspect-square w-full md:w-[70%] right-[-20%] left-auto bottom-auto top-[-14%] lg:top-[-5%] xl:top-[-20%]"
      titleClassName="md:!mb-[400px]"
    >
      <BuildersSection
        viewport={{ once: true }}
        className="relative z-[10] -mt-[110px] flex flex-col gap-[90px] md:flex-row md:items-end md:gap-[148px]"
        contentBlocks={[
          <div className="order-2 max-w-[400px] md:order-1" key="ock-hero-content">
            <div className="text-3xl leading-[1.125] tracking-[-0.96px]">
              Ready-to-use, full-stack components to make building onchain faster and easier.
            </div>
            <div className="mt-4 text-xs text-base-gray-200" key="ock-terms-of-service">
              By continuing, I have read and agree to the{' '}
              <a
                href={CDP_TERMS_OF_SERVICE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                Terms&nbsp;of&nbsp;Service
              </a>{' '}
              and{' '}
              <a
                href={CDP_PRIVACY_POLICY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                Privacy&nbsp;Policy
              </a>
              . For users in EU/UK, I confirm I have read and understood the{' '}
              <a
                href={CDP_PRIVACY_POLICY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                Privacy&nbsp;Policy
              </a>
            </div>
          </div>,
          <div className="order-1 md:order-2" key="ock-hero-cta">
            <CtaActions />
          </div>,
        ]}
      />
      <BuildersSection contentBlocks={[<LiveDemo components={demoComponents} key="ock-demo" />]} />
      <OCKFeaturesSection />
      <BuildersSection
        className="flex flex-col gap-8"
        contentBlocks={[
          <h2 className="-mb-2 text-7xl leading-none tracking-[-2.56px]" key="templates-title">
            Templates
          </h2>,
          <div className="text-2xl leading-[1.116] tracking-[-0.72px]" key="templates-description">
            Start building with our most frequently used templates.
          </div>,
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6" key="templates-cards">
            {templateCardItems.map((item) => (
              <li key={item.title}>
                <LinkCard {...item} />
              </li>
            ))}
          </ul>,
        ]}
      />
      <BuildersSection contentBlocks={[<CtaFooterSection key="ock-cta" />]} />
    </BuildersContainer>
  );
}
