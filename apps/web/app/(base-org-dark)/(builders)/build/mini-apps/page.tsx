import type { Metadata } from 'next';
import minikitCover from './minikit-cover.png';
import { MinikitFeaturesSection } from 'apps/web/app/(base-org-dark)/(builders)/build/onchainkit/FeaturesSection';
import {
  CtaActions,
  CtaFooterSection,
} from 'apps/web/app/(base-org-dark)/(builders)/build/onchainkit/CtaFooterSection';
import { MinikitAnalyticsUpsellSection } from 'apps/web/app/(base-org-dark)/(builders)/build/mini-apps/MinikitAnalyticsUpsellSection';
import { BuildersSection } from 'apps/web/app/(base-org-dark)/(builders)/BuildersSection';
import { BuildersContainer } from 'apps/web/app/(base-org-dark)/(builders)/BuildersContainer';
import minikitHero from './minikit-hero.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Mini Apps`,
  openGraph: {
    title: `Base | Mini Apps`,
    url: `/build/mini-apps`,
    images: [minikitCover.src],
  },
};

export default function Minikit() {
  return (
    <BuildersContainer
      title="Mini Apps"
      asciiImageSrc={minikitHero.src}
      asciiImageContainerClassName="aspect-[1876/629] inset-auto w-full bottom-0"
      titleClassName="md:!mb-[400px]"
    >
      <BuildersSection
        viewport={{ once: true }}
        className="mt-[-110px] flex flex-col gap-[90px] md:flex-row md:items-end md:gap-[148px]"
        contentBlocks={[
          <div className="order-2 max-w-[400px] md:order-1" key="minikit-hero-content">
            <div className="text-3xl leading-[1.125] tracking-[-0.96px]">
              Deploy mini apps in the Base app with a few lines of code to access millions of users
              on Base.
            </div>
          </div>,
          <div className="order-1 md:order-2" key="minikit-hero-cta">
            <CtaActions type="minikit" />
          </div>,
        ]}
      />
      <MinikitFeaturesSection />
      <BuildersSection
        contentBlocks={[<MinikitAnalyticsUpsellSection key="minikit-analytics-upsell" />]}
      />
      <BuildersSection contentBlocks={[<CtaFooterSection type="minikit" key="minikit-cta" />]} />
    </BuildersContainer>
  );
}
