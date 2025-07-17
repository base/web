import { Metadata } from 'next';
import { LiveDemo } from 'apps/web/src/components/Builders/Shared/LiveDemo';
import baseAccountCover from './base-account.png';
import { ExploreDocsButton } from 'apps/web/app/(base-org-dark)/(builders)/build/onchainkit/CtaFooterSection';
import { BaseAccountFeaturesSection } from 'apps/web/app/(base-org-dark)/(builders)/build/onchainkit/FeaturesSection';
import { PartnersSection } from 'apps/web/app/(base-org-dark)/(builders)/build/base-account/PartnersSection';
import { FeaturesPanes } from 'apps/web/app/(base-org-dark)/(builders)/build/base-account/FeaturesPanes';
import { BuildersSection } from 'apps/web/app/(base-org-dark)/(builders)/BuildersSection';
import { BuildersContainer } from 'apps/web/app/(base-org-dark)/(builders)/BuildersContainer';
import baseAccountHero from './base-account-hero.webp';

const demoComponents = ['SmartWallet'];

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Base Account`,
  openGraph: {
    title: `Base | Base Account`,
    url: `/build/base-account`,
    images: [baseAccountCover.src],
  },
};

export default function BaseAccount() {
  return (
    <BuildersContainer
      title="Base Account"
      asciiImageSrc={baseAccountHero.src}
      asciiImageContainerClassName="w-[70%] right-[-10%] left-auto aspect-square inset-auto top-[-5%]"
      titleClassName="md:!mb-[400px]"
    >
      <BuildersSection
        viewport={{ once: true }}
        className="relative z-[10] mt-[-110px] flex flex-col gap-[90px] md:flex-row md:items-end md:gap-[148px]"
        wrapperComponent="div"
        contentBlocks={[
          <div className="order-2 max-w-[400px] md:order-1" key="description">
            <div className="text-3xl leading-[1.125] tracking-[-0.96px]">
              Seamless login and payments — no app or extension required.
            </div>
          </div>,
          <div className="order-1 w-full md:order-2 md:w-auto" key="cta">
            <ExploreDocsButton
              ctaLabel="Start building"
              url="https://docs.base.org/smart-wallet/quickstart"
            />
          </div>,
        ]}
      />
      <BaseAccountFeaturesSection />
      <BuildersSection
        contentBlocks={[
          <div className="col-span-12 h-20" key="partners">
            <PartnersSection />
          </div>,
        ]}
      />
      <BuildersSection
        className="flex flex-col gap-8 md:gap-10"
        contentBlocks={[
          <div
            className="w-full text-3xl leading-[1.125] tracking-[-1.28px] md:max-w-[460px]"
            key="description"
          >
            Seamless end-to-end onchain experiences purpose-built for payments and identity.
          </div>,
          <FeaturesPanes key="features" />,
        ]}
      />
      <BuildersSection
        className="flex flex-col gap-8 md:gap-10"
        contentBlocks={[
          <div
            className="text-3xl leading-[1.125] tracking-[-1.28px] md:max-w-[460px]"
            key="description"
          >
            Unlock onchain superpowers with a few lines of code.
          </div>,
          <LiveDemo
            components={demoComponents}
            key="demo"
            smartWalletOnly
            defaultTab="SmartWallet"
            hideDescription
          />,
        ]}
      />
      <BuildersSection
        className="flex flex-col gap-9 md:flex-row md:items-end md:gap-[140px]"
        contentBlocks={[
          <div className="flex max-w-[450px] flex-col gap-6" key="description">
            <div className="text-7xl leading-none tracking-[-2.56px]">
              Integrate Base Account in minutes
            </div>
          </div>,
          <ExploreDocsButton
            key="cta"
            ctaLabel="Start building"
            url="https://docs.base.org/smart-wallet/quickstart"
          />,
        ]}
      />
    </BuildersContainer>
  );
}
