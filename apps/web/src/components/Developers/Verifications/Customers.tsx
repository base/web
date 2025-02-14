import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import icebreaker from 'apps/web/src/components/Developers/Verifications/icebreaker.svg';
import deform from 'apps/web/src/components/Developers/Verifications/deform.svg';
import gitcoin from 'apps/web/src/components/Developers/Verifications/gitcoin.svg';
import talentProtocol from 'apps/web/src/components/Developers/Verifications/talent-protocol.svg';
import Image, { StaticImageData } from 'next/image';

export function Customers() {
  return (
    <div className="flex w-full flex-col gap-10 tracking-tight">
      <Title level={TitleLevel.Title1}>
        Powering the most consumer-friendly applications onchain.
      </Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          <div className="p-4 px-8">
            <Image src={icebreaker as StaticImageData} alt="icebreaker" className="h-10 w-auto" />
          </div>

          <div className="p-4 px-8">
            <Image src={deform as StaticImageData} alt="deform" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={gitcoin as StaticImageData} alt="gitcoin" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image
              src={talentProtocol as StaticImageData}
              alt="talentProtocol"
              className="h-10 w-auto"
            />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
