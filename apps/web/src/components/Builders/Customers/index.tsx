'use client';

import logo from 'apps/web/src/components/base-org/shared/TopNavigation/assets/logo.svg';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { type StaticImageData } from 'next/image';
import 'apps/web/src/components/Builders/Customers/styles.css';

const LOGO_WIDTH = 200; // pixels
const LOGO_GAP = 40; // pixels
const TOTAL_LOGOS = 10;

export function Customers() {
  const logos = Array(TOTAL_LOGOS).fill(null);

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
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          className="animate-scroll animate-scroll absolute left-0 flex"
          style={{
            gap: `${LOGO_GAP}px`,
            width: `calc((${LOGO_WIDTH}px + ${LOGO_GAP}px) * ${TOTAL_LOGOS})`,
          }}
        >
          {/* First set of logos */}
          {logos.map((_, index) => (
            <Image
              key={`first-${index}`}
              src={logo as StaticImageData}
              alt="Base"
              width={LOGO_WIDTH}
              height={LOGO_WIDTH}
              className="flex-none opacity-50 transition-opacity hover:opacity-100"
            />
          ))}
          {/* Duplicate set of logos for seamless loop */}
          {logos.map((_, index) => (
            <Image
              key={`second-${index}`}
              src={logo as StaticImageData}
              alt="Base"
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
