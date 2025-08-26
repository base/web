import type { Metadata } from 'next';
import Link from 'apps/web/src/components/Link';
import appchainsCover from './appchains-cover.png';
import { AppchainsFeaturesSection } from 'apps/web/app/(base-org-dark)/(builders)/build/onchainkit/FeaturesSection';
import { BuildersSection } from 'apps/web/app/(base-org-dark)/(builders)/BuildersSection';
import { AppchainPartners } from 'apps/web/app/(base-org-dark)/(builders)/build/appchains/AppchainPartners';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import { TWEETS } from 'apps/web/src/components/Builders/Appchains/tweets';
import { TweetCard } from 'apps/web/src/components/Builders/Shared/TweetCard';
import { AppchainsFAQ } from 'apps/web/app/(base-org-dark)/(builders)/build/appchains/AppchainsFAQ';
import { BuildersContainer } from 'apps/web/app/(base-org-dark)/(builders)/BuildersContainer';
import appchainsHero from './appchains-hero.png';
import { appchainDocsUrl } from 'apps/web/app/(base-org-dark)/(builders)/build/appchains/constants';
export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Appchains`,
  openGraph: {
    title: `Base | Appchains`,
    url: `/build/appchains`,
    images: [appchainsCover.src],
  },
};

const contactUsForm =
  'https://app.deform.cc/form/4705840f-d6ae-4a31-b52d-906f89a8e206/?page_number=0';

export default function Appchains() {
  return (
    <BuildersContainer
      title="Appchains"
      asciiImageSrc={appchainsHero.src}
      titleClassName="md:!mb-[400px]"
      sectionClassName="mb-[-110px]"
    >
      <BuildersSection
        viewport={{ once: true }}
        className="flex flex-col gap-[90px] md:flex-row md:items-end md:gap-[148px]"
        contentBlocks={[
          <div className="order-2 max-w-[400px] md:order-1" key="appchains-hero-content">
            <div className="text-3xl leading-[1.125] tracking-[-0.96px]">
              Scale your app with a dedicated chain on Base.
            </div>
          </div>,
          <div className="order-1 flex flex-col gap-2 md:order-2" key="appchains-hero-cta">
            <Button
              variant={ButtonVariants.Primary}
              size={ButtonSizes.Small}
              asChild
              className="w-full px-6 leading-none md:w-auto md:min-w-[280px]"
            >
              <Link href={appchainDocsUrl} target="_blank" rel="noopener noreferrer">
                Learn more
              </Link>
            </Button>
          </div>,
        ]}
      />
      <AppchainsFeaturesSection />
      <BuildersSection contentBlocks={[<AppchainPartners key="onchain-apps" />]} />
      <BuildersSection
        contentBlocks={[
          <div key="testimonials" className="flex flex-col gap-10">
            <div className="w-full text-3xl leading-[1.125] tracking-[-0.96px] md:max-w-[400px]">
              What our early customers are saying.
            </div>
            <Marquee className="[--duration:20s]" pauseOnHover>
              {TWEETS?.map((tweet) => {
                return (
                  <Link key={tweet.username} target="_blank" href={tweet.link}>
                    <TweetCard
                      image={tweet.image}
                      name={tweet.name}
                      username={tweet.username}
                      content={tweet.content}
                    />
                  </Link>
                );
              })}
            </Marquee>
          </div>,
        ]}
      />
      <BuildersSection contentBlocks={[<AppchainsFAQ key="appchains-faq" />]} />
      <BuildersSection
        contentBlocks={[
          <div
            className="flex flex-col gap-9 md:flex-row md:items-end md:gap-[140px]"
            key="appchains-footer"
          >
            <div className="flex max-w-[450px] flex-col gap-6">
              <div className="text-7xl leading-none tracking-[-2.56px]">
                Your own blockspace, built for scale.
              </div>
            </div>
            <Button
              variant={ButtonVariants.Primary}
              size={ButtonSizes.Small}
              asChild
              className="w-full px-6 leading-none md:w-auto md:min-w-[280px]"
            >
              <Link href={contactUsForm} target="_blank" rel="noopener noreferrer">
                Contact us
              </Link>
            </Button>
          </div>,
        ]}
      />
    </BuildersContainer>
  );
}
