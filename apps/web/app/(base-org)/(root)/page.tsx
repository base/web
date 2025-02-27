import Image, { StaticImageData } from 'apps/web/node_modules/next/image';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Container from 'apps/web/src/components/base-org/Container';
import VideoCardsSection from 'apps/web/src/components/base-org/root/VideoCardsSection';
import BuildExploreSection from 'apps/web/src/components/base-org/root/BuildExploreSection';
import SlidingTextSection from 'apps/web/src/components/base-org/root/SlidingTextSection';
import TransactionsFeesSection from 'apps/web/src/components/base-org/root/TransactionsFeesSection';
import BuildAndRewardSection from 'apps/web/src/components/base-org/root/BuildAndRewardSection';
import ErrorsProvider from 'apps/web/contexts/Errors';
import BlogSection from 'apps/web/src/components/base-org/root/BlogSection';
import Link from 'apps/web/src/components/Link';
import MissionSection from 'apps/web/src/components/base-org/root/MissionSection';
import OpLogo from 'apps/web/public/images/op_logo.svg';
import SceneDynamic from 'apps/web/src/components/ThreeHero/dynamic';

export default async function Home() {
  return (
    <ErrorsProvider context="base_landing_page">
      <AnalyticsProvider context="hero">
        <div className="relative z-10 h-screen w-full">
          <SceneDynamic />
          <div className="absolute bottom-0 z-20 flex w-full flex-col justify-between gap-6 pb-20 text-white lg:flex-row">
            <div className="lg:ml-20">
              <Container>
                <Title level={TitleLevel.Title1}>Base is for everyone.</Title>
                <div className="mt-4 flex gap-4">
                  <Link href="/builders?utm_source=dotorg&medium=hero">
                    <Button variant={ButtonVariants.Secondary} iconName="baseOrgDiagonalUpArrow">
                      Start building
                    </Button>
                  </Link>
                  <Link href="/names?utm_source=dotorg&medium=hero">
                    <Button variant={ButtonVariants.Outlined} iconName="baseOrgDiagonalUpArrow">
                      Get a Basename
                    </Button>
                  </Link>
                </div>
              </Container>
            </div>
            <div className="px-[1rem] lg:mr-16 lg:self-end">
              <Link href="https://optimism.io/vision" target="_blank" rel="noopener noreferrer">
                <div className="flex flex-row gap-2">
                  <Image src={OpLogo as StaticImageData} alt="optimism logo" />
                  <span>Built on the Superchain</span>
                </div>
              </Link>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[50px] w-full bg-gradient-to-b from-transparent to-black" />
          </div>
        </div>
      </AnalyticsProvider>

      <main className="relative z-20 flex w-full flex-col items-center bg-black">
        <Container>
          <div className="flex flex-col gap-20 pb-40 pt-20 md:gap-40">
            <MissionSection />
            <BuildExploreSection />
            <VideoCardsSection />
            <SlidingTextSection />
            <TransactionsFeesSection />
            <BuildAndRewardSection />
            <AnalyticsProvider context="blog_carousel">
              <BlogSection />
            </AnalyticsProvider>
          </div>
        </Container>
      </main>
    </ErrorsProvider>
  );
}
