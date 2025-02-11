'use client';

import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { type StaticImageData } from 'next/image';
import 'apps/web/src/components/Builders/Customers/styles.css';

import b3 from 'apps/web/src/components/Builders/Customers/assets/appchains/b3.svg';
import blocklords from 'apps/web/src/components/Builders/Customers/assets/appchains/blocklords.svg';
import illuvium from 'apps/web/src/components/Builders/Customers/assets/appchains/illuvium.svg';
import metacade from 'apps/web/src/components/Builders/Customers/assets/appchains/metacade.png';
import proofworks from 'apps/web/src/components/Builders/Customers/assets/appchains/proofworks.svg';
import superchamps from 'apps/web/src/components/Builders/Customers/assets/appchains/superchamps.svg';
import aerodrome from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/aerodrome.svg';
import cattown from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/cattown.svg';
import cooprecords from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/cooprecords.svg';
import frenpet from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/frenpet.svg';
import guild from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/guild.svg';
import heyelsa from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/heyelsa.svg';
import kyberswap from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/kyberswap.svg';
import layer3 from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/layer3.svg';
import magiceden from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/magiceden.png';
import mochicam from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/mochicam.svg';
import moonwell from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/moonwell.svg';
import opensea from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/opensea.svg';
import pancakeswap from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/pancakeswap.svg';
import seamless from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/seamless.svg';
import tokeimon from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/tokeimon.svg';
import uniswap from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/uniswap.svg';
import virtual from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/virtual.svg';
import zora from 'apps/web/src/components/Builders/Customers/assets/smart-wallet/zora.svg';

const logos: StaticImageData[] = [
  b3,
  blocklords,
  illuvium,
  // metacade,
  proofworks,
  superchamps,
  aerodrome,
  cattown,
  cooprecords,
  frenpet,
  guild,
  heyelsa,
  kyberswap,
  layer3,
  // magiceden,
  mochicam,
  moonwell,
  opensea,
  pancakeswap,
  seamless,
  tokeimon,
  uniswap,
  virtual,
  zora,
];
const LOGO_WIDTH = 200; // pixels
const LOGO_GAP = 40; // pixels
const TOTAL_LOGOS = logos.length * 2;

export function Customers() {
  return (
    <section className="h-full w-full pt-32">
      <Title level={TitleLevel.Title1} as="h2" className="mb-16 hidden md:block">
        Powering the most consumer-friendly applications onchain.
      </Title>
      <Title level={TitleLevel.Title3} className="mb-8 font-medium md:hidden">
        Powering the most consumer-friendly applications onchain.
      </Title>
      <figure
        className="relative flex h-28 items-center overflow-hidden"
        // className={`relative flex h-[${LOGO_WIDTH}px] items-center overflow-hidden`}
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          className="animate-scroll absolute left-0 flex h-full items-center"
          style={{
            gap: `${LOGO_GAP}px`,
            width: `calc((${LOGO_WIDTH}px + ${LOGO_GAP}px) * ${TOTAL_LOGOS})`,
          }}
        >
          {/* First set of logos */}
          {logos.map((logo) => (
            <Image
              key={`first-${String(logo.src)}`}
              src={logo as StaticImageData}
              alt={String(logo.src)}
              width={LOGO_WIDTH}
              height={LOGO_WIDTH}
              className="flex-none opacity-50 transition-opacity hover:opacity-100"
            />
          ))}
          {/* Duplicate set of logos for seamless loop */}
          {logos.map((logo) => (
            <Image
              key={`second-${String(logo.src)}`}
              src={logo as StaticImageData}
              alt={String(logo.src)}
              width={LOGO_WIDTH}
              height={LOGO_WIDTH}
              className="flex-none opacity-50 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </figure>
    </section>
  );
}
