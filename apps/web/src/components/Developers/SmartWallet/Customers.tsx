import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import cattown from 'apps/web/src/components/Developers/SmartWallet/svg/cattown.svg';
import aerodrome from 'apps/web/src/components/Developers/SmartWallet/svg/aerodrome.svg';
import cooprecrods from 'apps/web/src/components/Developers/SmartWallet/svg/cooprecrods.svg';
import frenpet from 'apps/web/src/components/Developers/SmartWallet/svg/frenpet.svg';
import guild from 'apps/web/src/components/Developers/SmartWallet/svg/guild.svg';
import heyelsa from 'apps/web/src/components/Developers/SmartWallet/svg/heyelsa.svg';
import kyberswap from 'apps/web/src/components/Developers/SmartWallet/svg/kyberswap.svg';
import layer3 from 'apps/web/src/components/Developers/SmartWallet/svg/layer3.svg';
import mochicam from 'apps/web/src/components/Developers/SmartWallet/svg/mochicam.svg';
import moonwell from 'apps/web/src/components/Developers/SmartWallet/svg/moonwell.svg';
import opensea from 'apps/web/src/components/Developers/SmartWallet/svg/opensea.svg';
import Image, { StaticImageData } from 'next/image';

export function Customers() {
  return (
    <div className="flex w-full flex-col gap-8 tracking-tight">
      <Title level={TitleLevel.Title1} className="font-bold max-sm:hidden">
        Powering the best onchain experiences.
      </Title>
      <Title level={TitleLevel.Title3} className="font-bold sm:hidden">
        Powering the best onchain experiences.
      </Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="gap-8 [--duration:20s]" pauseOnHover>
          <div className="p-4 px-8">
            <Image src={cattown as StaticImageData} alt="cattown" className="h-10 w-10" />
          </div>
          <div className="p-4 px-8">
            <Image src={aerodrome as StaticImageData} alt="aerodrome" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={cooprecrods as StaticImageData} alt="cooprecrods" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={frenpet as StaticImageData} alt="frenpet" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={guild as StaticImageData} alt="guild" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={heyelsa as StaticImageData} alt="heyelsa" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={kyberswap as StaticImageData} alt="kyberswap" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={layer3 as StaticImageData} alt="layer3" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={mochicam as StaticImageData} alt="mochicam" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={moonwell as StaticImageData} alt="moonwell" className="h-10 w-auto" />
          </div>
          <div className="p-4 px-8">
            <Image src={opensea as StaticImageData} alt="opensea" className="h-10 w-auto" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
