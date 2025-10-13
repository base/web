'use client';

import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { StaticImageData } from 'next/image';
import Link from 'apps/web/src/components/Link';

import onboard from 'apps/web/src/components/Builders/Shared/assets/Logos/onboard.svg';
import moshicam from 'apps/web/src/components/Builders/Shared/assets/Logos/moshicam.svg';
import cooprecords from 'apps/web/src/components/Builders/Shared/assets/Logos/cooprecords.svg';
import metacade from 'apps/web/src/components/Builders/Shared/assets/Logos/metacade.svg';
import opensea from 'apps/web/src/components/Builders/Shared/assets/Logos/opensea.svg';
import moonwell from 'apps/web/src/components/Builders/Shared/assets/Logos/moonwell.svg';
import blocklords from 'apps/web/src/components/Builders/Shared/assets/Logos/blocklords.svg';
import blackbird from 'apps/web/src/components/Builders/Shared/assets/Logos/blackbird.svg';
import morpho from 'apps/web/src/components/Builders/Shared/assets/Logos/morpho.svg';
import zora from 'apps/web/src/components/Builders/Shared/assets/Logos/zora.svg';
import aerodrome from 'apps/web/src/components/Builders/Shared/assets/Logos/aerodrome.svg';
import superchamps from 'apps/web/src/components/Builders/Shared/assets/Logos/superchamps.svg';
import heyelsa from 'apps/web/src/components/Builders/Shared/assets/Logos/heyelsa.svg';
import byteai from 'apps/web/src/components/Builders/Shared/assets/Logos/byteai.svg';
import guild from 'apps/web/src/components/Builders/Shared/assets/Logos/guild.svg';
import moxie from 'apps/web/src/components/Builders/Shared/assets/Logos/moxie.svg';
// import frenpet from 'apps/web/src/components/Builders/Shared/assets/Logos/frenpet.svg';
import megaphone from 'apps/web/src/components/Builders/Shared/assets/Logos/megaphone.svg';
import seamless from 'apps/web/src/components/Builders/Shared/assets/Logos/seamless.svg';
import uniswap from 'apps/web/src/components/Builders/Shared/assets/Logos/uniswap.svg';

import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';

type Customer = {
  href: string;
  logo: StaticImageData;
};

const customers: Customer[] = [
  {
    href: 'https://onboard.xyz/',
    logo: onboard as StaticImageData,
  },
  {
    href: 'https://moshi.cam/',
    logo: moshicam as StaticImageData,
  },
  {
    href: 'https://www.cooprecords.xyz/',
    logo: cooprecords as StaticImageData,
  },
  {
    href: 'https://tournaments.metacade.co/',
    logo: metacade as StaticImageData,
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
    href: 'https://blackbird.xyz/',
    logo: blackbird as StaticImageData,
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
    href: 'https://www.superchamps.com/',
    logo: superchamps as StaticImageData,
  },
  {
    href: 'https://www.heyelsa.ai/',
    logo: heyelsa as StaticImageData,
  },
  {
    href: 'https://www.tryabyte.xyz/',
    logo: byteai as StaticImageData,
  },
  {
    href: 'https://guild.xyz/',
    logo: guild as StaticImageData,
  },
  {
    href: 'https://moxie.xyz/',
    logo: moxie as StaticImageData,
  },
  // {
  //   href: 'https://x.com/frenpetonbase',
  //   logo: frenpet as StaticImageData,
  // },
  {
    href: 'https://www.megaphone.xyz//',
    logo: megaphone as StaticImageData,
  },
  {
    href: 'https://www.seamlessprotocol.com/',
    logo: seamless as StaticImageData,
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

export function Apps() {
  return (
    <section className="h-full w-full pt-32">
      <Title level={TitleLevel.Title1} as="h2" className="mb-10">
        Powering your favorite onchain apps
      </Title>
      <Marquee className="[--duration:60s]" childrenClassName="mr-24 !gap-24">
        {customers.map((customer) => (
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
        ))}
      </Marquee>
    </section>
  );
}
