import type { Metadata } from 'next';
import { Suspense } from 'react';
import Content from 'apps/web/src/components/Ecosystem/Content';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import { EcosystemHero } from 'apps/web/src/components/Ecosystem/Hero';
import { Split } from 'apps/web/app/(base-org)/enterprises/Split';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { SolutionText } from './SolutionText';
import { GenericHero } from 'apps/web/src/components/base-org/root/Redesign/Hero/GenericHero';
import { CaseStudyCard } from 'apps/web/app/(base-org)/enterprises/CaseStudyCard';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { Halftone } from './Halftone';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import content from './content.json';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Ecosystem`,
  openGraph: {
    title: `Base | Enterprises`,
    url: `/enterprises`,
  },
};

import assetImage from 'apps/web/public/images/backgrounds/typography.webp';
import bankingImage from 'apps/web/public/images/backgrounds/sub-brands.webp';
import loyaltyImage from './images/loyalty-b&w.png';
import paymentsImage from 'apps/web/public/images/backgrounds/enterprises/enterprise-global-payments.webp';

import Image from 'next/image';

function GlassPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`whitespace-nowrap rounded-xl border border-white/30 bg-white/0 px-3.5 py-1.5 text-sm text-base-black backdrop-blur-md ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
}

function CheckTick() {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6CD731]">
      <svg
        className="h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

const GREEN = '#6CD731';
const BLUE = '#5B6EE8';
const ARROW_TRANSLATE_AMOUNT = 1;

type ArrowConfig = {
  id: string;
  color: string;
  line: { x1: number; y1: number; x2: number; y2: number };
  head: string;
  gradientStops: [number, number]; // [startOpacity, endOpacity]
  hoverTranslate: { x: number; y: number }; // translation on hover
};

const ARROWS: ArrowConfig[] = [
  // Green arrows (outward - move further out on hover)
  {
    id: 'up',
    color: GREEN,
    line: { x1: 100, y1: 68, x2: 100, y2: 20 },
    head: '95,26 100,20 105,26',
    gradientStops: [0, 1],
    hoverTranslate: { x: 0, y: -ARROW_TRANSLATE_AMOUNT },
  },
  {
    id: 'down',
    color: GREEN,
    line: { x1: 100, y1: 132, x2: 100, y2: 180 },
    head: '95,174 100,180 105,174',
    gradientStops: [0, 1],
    hoverTranslate: { x: 0, y: ARROW_TRANSLATE_AMOUNT },
  },
  {
    id: 'left',
    color: GREEN,
    line: { x1: 68, y1: 100, x2: 20, y2: 100 },
    head: '26,95 20,100 26,105',
    gradientStops: [0, 1],
    hoverTranslate: { x: -ARROW_TRANSLATE_AMOUNT, y: 0 },
  },
  {
    id: 'right',
    color: GREEN,
    line: { x1: 132, y1: 100, x2: 180, y2: 100 },
    head: '174,95 180,100 174,105',
    gradientStops: [0, 1],
    hoverTranslate: { x: ARROW_TRANSLATE_AMOUNT, y: 0 },
  },
  // Blue arrows (inward top - move closer to box on hover)
  {
    id: 'topLeft',
    color: BLUE,
    line: { x1: 30, y1: 30, x2: 72, y2: 72 },
    head: '72,64 72,72 64,72',
    gradientStops: [0, 1],
    hoverTranslate: { x: ARROW_TRANSLATE_AMOUNT, y: ARROW_TRANSLATE_AMOUNT },
  },
  {
    id: 'topRight',
    color: BLUE,
    line: { x1: 170, y1: 30, x2: 128, y2: 72 },
    head: '128,64 128,72 136,72',
    gradientStops: [0, 1],
    hoverTranslate: { x: -ARROW_TRANSLATE_AMOUNT, y: ARROW_TRANSLATE_AMOUNT },
  },
  // Blue arrows (outward bottom - move inward toward center on hover)
  {
    id: 'bottomLeft',
    color: BLUE,
    line: { x1: 72, y1: 128, x2: 30, y2: 170 },
    head: '72,136 72,128 64,128',
    gradientStops: [1, 0],
    hoverTranslate: { x: ARROW_TRANSLATE_AMOUNT, y: -ARROW_TRANSLATE_AMOUNT },
  },
  {
    id: 'bottomRight',
    color: BLUE,
    line: { x1: 128, y1: 128, x2: 170, y2: 170 },
    head: '128,136 128,128 136,128',
    gradientStops: [1, 0],
    hoverTranslate: { x: -ARROW_TRANSLATE_AMOUNT, y: -ARROW_TRANSLATE_AMOUNT },
  },
];

function ArrowsSvg() {
  return (
    <svg
      className="absolute h-[400px] w-[400px]"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {ARROWS.map(
          (arrow) => `
          #arrow-${arrow.id} {
            transition: transform 0.9s ease-out;
          }
          .group:hover #arrow-${arrow.id} {
            transform: translate(${arrow.hoverTranslate.x}px, ${arrow.hoverTranslate.y}px);
          }
        `,
        ).join('')}
      </style>
      <defs>
        {ARROWS.map((arrow) => (
          <linearGradient
            key={arrow.id}
            id={`gradient-${arrow.id}`}
            gradientUnits="userSpaceOnUse"
            x1={arrow.line.x1}
            y1={arrow.line.y1}
            x2={arrow.line.x2}
            y2={arrow.line.y2}
          >
            <stop offset="0%" stopColor={arrow.color} stopOpacity={arrow.gradientStops[0]} />
            <stop offset="100%" stopColor={arrow.color} stopOpacity={arrow.gradientStops[1]} />
          </linearGradient>
        ))}
      </defs>
      {ARROWS.map((arrow) => (
        <g key={arrow.id} id={`arrow-${arrow.id}`}>
          <line
            x1={arrow.line.x1}
            y1={arrow.line.y1}
            x2={arrow.line.x2}
            y2={arrow.line.y2}
            stroke={`url(#gradient-${arrow.id})`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <polyline
            points={arrow.head}
            stroke={arrow.color}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

export default async function Enterprises() {
  return (
    <>
      <AnalyticsProvider context="enterprises">
        <div id="webgl-canvas" className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="-z-1 h-full w-full">
            <WebGLCanvas />
          </div>
        </div>
        <Container className="lg:pt-0">
          <div className="col-span-full flex flex-col gap-12">
            {/* <Hero /> */}
            {/* <EcosystemHero /> */}
            <GenericHero
              title="Enterprises"
              description="The enterprise‑ready blockchain to run stablecoin payments, onchain finance, and tokenized value."
              imageUrl={'/images/backgrounds/enterprises/enterprise-header.webp'}
              primaryColor="#5B31F4"
            />

            {/* Logo Strip Section */}
            <Section content={{ title: content.logoStrip.label }}>
              <div className="relative col-span-full">
                <div
                  style={{ background: 'linear-gradient(to right, white, transparent)' }}
                  className="absolute left-0 top-0 z-20 h-full w-[10%] bg-base-gray-200/20"
                ></div>
                <div
                  style={{ background: 'linear-gradient(to left, white, transparent)' }}
                  className="absolute right-0 top-0 z-20 h-full w-[10%] bg-base-gray-200/20"
                ></div>

                <Marquee className="[--duration:40s]" pauseOnHover={false}>
                  {content.logoStrip.logos.map((logo) => (
                    <div
                      key={logo}
                      style={{ mixBlendMode: 'multiply', filter: 'grayscale(1) contrast(6)' }}
                      className="flex min-w-[120px] items-center justify-center px-6 opacity-30 grayscale transition-all hover:opacity-100"
                    >
                      <div className="h-full max-h-12 w-full">
                        <Image
                          className="h-full w-full object-contain"
                          src={`/images/startups/logos/${logo.toLowerCase()}.webp`}
                          alt={logo}
                          width={120}
                          height={60}
                        />
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </Section>

            {/*  Payments Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.payments.header,
                description: content.payments.subheader,
                cta: { label: content.payments.cta.label, href: content.payments.cta.url },
              }}
            >
              <div className="col-span-full aspect-[3/1] w-full overflow-hidden rounded-lg bg-base-gray-200/20">
                <Halftone
                  imageUrl={paymentsImage.src}
                  bottomFade={true}
                  sideFade={true}
                  topFade={true}
                  primaryColor="#8081FF"
                />
              </div>
            </Section>

            <Section
              textOnTop={true}
              content={{
                title: content.onchainFinance.header,
                description: content.onchainFinance.subheader,
              }}
            >
              {content.onchainFinance.solutions.map((solution) => (
                <div key={solution.header} className="col-span-3 flex flex-col gap-6">
                  <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <Halftone
                      imageUrl={solution.image}
                      backgroundColor="#fbfbfb"
                      primaryColor={solution.primaryColor}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Title level={TitleLevel.H2Regular}>{solution.header}</Title>
                    <Text className="!text-base-gray-200" variant={TextVariant.BodyLarge}>
                      {solution.subheader}
                    </Text>
                  </div>
                </div>
              ))}
            </Section>

            <div className="flex flex-col gap-12">
              {false && (
                <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-3">
                  <div className="col-span-full">
                    <div className="flex max-w-md flex-col gap-2">
                      <Title level={TitleLevel.H5Regular}>Case studies</Title>
                      <Text variant={TextVariant.BodyLarge}>
                        Explore how leading enterprises use Base for payments, finance, tokenized
                        holdings, and loyalty.
                      </Text>
                    </div>
                  </div>
                  <CaseStudyCard
                    name="Shopify"
                    tag="Payments"
                    description="Simple, borderless, low-cost payments for merchants, with support for 15+ local stablecoins. Instant settlement on 24/7 payment rails."
                    slug="/enterprises/shopify"
                    image="/images/enterprises/shopify.png"
                  />
                  <CaseStudyCard
                    name="JP Morgan"
                    tag="Onchain Finance"
                    description="Simple, borderless, low-cost payments for merchants, with support for 15+ local stablecoins. Instant settlement on 24/7 payment rails."
                    slug="/enterprises/shopify"
                    image="/images/enterprises/jpmorgan.jpeg"
                  />
                  <CaseStudyCard
                    name="Coinbase"
                    tag="Tokenization"
                    description="Keep assets at the bank, while taking advantage of programmable, global, instant onchain rails."
                    slug="/enterprises/coinbase"
                    image="/images/enterprises/coinbase.png"
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </AnalyticsProvider>
    </>
  );
}
