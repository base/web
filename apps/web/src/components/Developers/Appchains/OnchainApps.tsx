import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import proof from 'apps/web/src/components/Developers/Appchains/proofworks.svg';
import superchamps from 'apps/web/src/components/Developers/Appchains/superchamps.svg';
import blocklords from 'apps/web/src/components/Developers/Appchains/blocklords.svg';
import illuvium from 'apps/web/src/components/Developers/Appchains/illuvium.svg';
import Image, { StaticImageData } from 'next/image';
import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';

export function OnchainApps() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>
        Ideal for high-performance onchain apps, like games and AI applications.
      </Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          <div className="flex p-4 px-8">
            <Image src={proof as StaticImageData} alt="proof" />
          </div>
          <div className="flex p-4 px-8">
            <Image src={superchamps as StaticImageData} alt="superchamps" />
          </div>
          <div className="flex p-4 px-8">
            <Image src={blocklords as StaticImageData} alt="blocklords" />
          </div>
          <div className="flex p-4 px-8">
            <Image src={illuvium as StaticImageData} alt="illuvium" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
