import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import baseGlobe from 'apps/web/src/components/Builders/Stories/Hero/assets/base_globe.webp';
import Image from 'next/image';

export function Hero() {
  return (
    <div className="relative w-full">
      <Image
        src={baseGlobe}
        alt="Base Globe"
        className="absolute right-[-110px] top-0 hidden md:block"
      />
      <div className="my-32 flex w-full flex-col items-start justify-center">
        <Title level={TitleLevel.Display3}>Builder Stories</Title>
        <Title level={TitleLevel.Title3} className="max-w-[575px] text-gray-50">
          Inspirational stories of builders and the new internet they&apos;re building on Base.
        </Title>
      </div>
    </div>
  );
}
