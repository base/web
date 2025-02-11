import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import baseGlobe from 'apps/web/app/(base-org)/developers/stories/assets/base_globe.webp';
import Image, { StaticImageData } from 'next/image';

export default function Stories() {
  return (
    <AnalyticsProvider context="stories">
      <Container className="!px-[1.5rem] lg:!px-[2rem]">
        <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
          <div className="relative w-full">
            <Image
              src={baseGlobe as StaticImageData}
              alt="Base Globe"
              className="absolute right-[-110px] top-0"
            />
            <div className="mt-32 flex w-full flex-col items-start justify-center">
              <Title level={TitleLevel.Display3}>Builder Stories</Title>
              <Title level={TitleLevel.Title3} className="max-w-[575px] text-gray-50">
                Inspirational stories of builders and the new internet they're building on Base.
              </Title>
            </div>
          </div>
        </main>
      </Container>
    </AnalyticsProvider>
  );
}
