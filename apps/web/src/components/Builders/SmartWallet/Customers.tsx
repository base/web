import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import moshicam from 'apps/web/src/components/Builders/Shared/assets/Logos/moshicam.svg';
import opensea from 'apps/web/src/components/Builders/Shared/assets/Logos/opensea.svg';
import zora from 'apps/web/src/components/Builders/Shared/assets/Logos/zora.svg';
import moonwell from 'apps/web/src/components/Builders/Shared/assets/Logos/moonwell.svg';
import guild from 'apps/web/src/components/Builders/Shared/assets/Logos/guild.svg';
import aerodrome from 'apps/web/src/components/Builders/Shared/assets/Logos/aerodrome.svg';
import blocklords from 'apps/web/src/components/Builders/Shared/assets/Logos/blocklords.svg';
import heyelsa from 'apps/web/src/components/Builders/Shared/assets/Logos/heyelsa.svg';
import morpho from 'apps/web/src/components/Builders/Shared/assets/Logos/morpho.svg';
import frenpet from 'apps/web/src/components/Builders/Shared/assets/Logos/frenpet.svg';
import uniswap from 'apps/web/src/components/Builders/Shared/assets/Logos/uniswap.svg';
import Image, { StaticImageData } from 'next/image';
import Link from 'apps/web/src/components/Link';

type Customer = {
  href: string;
  logo: StaticImageData;
};

const customers: Customer[] = [
  {
    href: 'https://moshi.cam/',
    logo: moshicam as StaticImageData,
  },
  {
    href: 'https://opensea.io/',
    logo: opensea as StaticImageData,
  },
  {
    href: 'https://moonwell.fi/',
    logo: moonwell as StaticImageData,
  },
  {
    href: 'https://blocklords.com/',
    logo: blocklords as StaticImageData,
  },
  {
    href: 'https://morpho.org/',
    logo: morpho as StaticImageData,
  },
  {
    href: 'https://zora.co/',
    logo: zora as StaticImageData,
  },
  {
    href: 'https://aerodrome.finance/',
    logo: aerodrome as StaticImageData,
  },
  {
    href: 'https://www.heyelsa.ai/',
    logo: heyelsa as StaticImageData,
  },
  {
    href: 'https://guild.xyz/',
    logo: guild as StaticImageData,
  },
  {
    href: 'https://x.com/frenpetonbase',
    logo: frenpet as StaticImageData,
  },
  {
    href: 'https://uniswap.org/',
    logo: uniswap as StaticImageData,
  },
];

const logoStyle = {
  width: 'auto',
  height: 'auto',
  minWidth: '64px',
  maxWidth: '100%',
  maxHeight: '64px',
};

export function Customers() {
  return (
    <div className="flex w-full flex-col gap-10 tracking-tight">
      <Title level={TitleLevel.Title1} className="font-bold">
        Powering the best onchain experiences
      </Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="gap-8 [--duration:20s]" pauseOnHover>
          {customers.map((customer) => {
            return (
              <div className="flex w-[200px] items-center" key={`first-${customer.href}`}>
                <Link href={customer.href} target="_blank">
                  <Image
                    src={customer.logo}
                    alt={String(customer.logo.src)}
                    style={logoStyle}
                    className="flex-none object-contain opacity-50 transition-opacity hover:opacity-100"
                  />
                </Link>
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
