import type { Metadata } from 'next';
import Image from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
// import { GenericHero } from './GenericHero';
import { GenericHero } from 'apps/web/src/components/base-org/root/Redesign/Hero/GenericHero';
import content from './content.json';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import classNames from 'classnames';
import { Halftone } from 'apps/web/app/(base-org)/enterprises/Halftone';

import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import Link from 'apps/web/src/components/Link';
import { cn } from 'apps/web/src/utils/cn';
import AnimatedButton from 'apps/web/src/components/Button/AnimatedButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Startups`,
  openGraph: {
    title: `Base | Startups`,
    url: `/startups`,
  },
};

export default async function Startups() {
  return (
    <>
      <AnalyticsProvider context="startups">
        <div id="webgl-canvas" className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="-z-1 h-full w-full">
            <WebGLCanvas />
          </div>
        </div>
        <Container className="!lg:pt-0 !pt-0">
          <div className="col-span-full flex flex-col gap-0">
            {/* Hero Section */}
            <GenericHero
              title={content.hero.header}
              description={content.hero.subheader}
              imageUrl={'/images/backgrounds/vision.webp'}
              primaryColor="#FF6330"
              buttons={[
                { text: content.hero.ctas.primary.label, href: content.hero.ctas.primary.url },
              ]}
            />

            {/* Logo Strip Section */}
            <Section content={{ title: content.logoStrip.label }}>
              <div className="col-span-full">
                <Marquee className="[--duration:40s]" pauseOnHover={false}>
                  {content.logoStrip.logos.map((logo) => (
                    <div key={logo} className="flex min-w-[120px] items-center justify-center px-6">
                      <Text
                        variant={TextVariant.BodyLarge}
                        className="whitespace-nowrap !text-base-gray-200"
                      >
                        {logo}
                      </Text>
                    </div>
                  ))}
                </Marquee>
              </div>
            </Section>

            {/* Value Props Section */}
            <Section content={{ title: 'Why build on Base?' }} className="w-full">
              <div className="col-span-full grid gap-8 md:grid-cols-3">
                {content.valueProps.map((prop) => (
                  <div key={prop.id} className="flex flex-col gap-4 rounded-xl">
                    <div className="aspect-square w-full rounded-lg bg-base-gray-200/20">
                      {/* <Image src={prop.image} alt={prop.header} fill className="object-cover" /> */}
                      <Halftone
                        imageUrl={prop.image}
                        backgroundColor="#fbfbfb"
                        primaryColor={prop.primaryColor}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Title level={TitleLevel.H2Regular}>{prop.header}</Title>
                      <Text variant={TextVariant.BodyLarge} className="!text-base-gray-200">
                        {prop.subheader}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Base Batches Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.baseBatches.header,
                description: content.baseBatches.subheader,
                cta: { label: content.baseBatches.cta.label, href: content.baseBatches.cta.url },
              }}
            >
              <div className="col-span-full aspect-[3/1] w-full overflow-hidden rounded-lg bg-base-gray-200/20">
                <Halftone
                  imageUrl="/images/startups/batches.webp"
                  backgroundColor="#fbfbfb"
                  primaryColor="#8081FF"
                />
              </div>
            </Section>

            {/* Accelerator Programs Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.acceleratorPrograms.header,
                description: content.acceleratorPrograms.subheader,
              }}
            >
              <div
                className={cn(
                  'col-span-full grid gap-[min(2.25vw,_32px)]',
                  'grid-cols-1 lg:grid-cols-2',
                )}
              >
                {content.acceleratorPrograms.cards.map((card, index) => (
                  <Link
                    href={card.url}
                    key={card.title}
                    target={card.url.includes('https://') ? '_blank' : '_self'}
                    className="group flex h-[308px] flex-col rounded-lg bg-base-gray-25 p-6 transition-colors duration-300 hover:bg-base-gray-50"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="2"
                            fill={['#f37021', '#0847f7'][index % 2]}
                          />
                        </svg>
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
                        >
                          <path
                            d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="mt-auto flex flex-col gap-3">
                        <Title level={TitleLevel.H6Regular} as="h4">
                          {card.title}
                        </Title>
                        <Text
                          variant={TextVariant.Body}
                          className="!text-pretty !text-base-gray-200"
                        >
                          {card.subtitle}
                        </Text>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>

            {/* Base Ecosystem Fund Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.baseEcosystemFund.header,
                description: content.baseEcosystemFund.subheader,
                cta: { label: 'Apply now', href: content.baseEcosystemFund.url },
              }}
            >
              <div className="col-span-full aspect-[3/1] w-full overflow-hidden rounded-lg bg-base-gray-200/20">
                <Halftone
                  imageUrl="/images/backgrounds/ecosystem.webp"
                  backgroundColor="#fbfbfb"
                  primaryColor="#FFD200"
                  bottomFade={false}
                />
              </div>
            </Section>

            {/* Scale Your Business Section */}
            <Section
              content={{
                title: 'Scale Your Business',
              }}
            >
              <div
                className={cn(
                  'col-span-full grid gap-[min(2.25vw,_32px)]',
                  'grid-cols-1 lg:grid-cols-2',
                )}
              >
                {content.scaleYourBusiness.cards.map((card, index) => (
                  <Link
                    href={card.url}
                    key={card.header}
                    target={card.url.includes('https://') ? '_blank' : '_self'}
                    className="group flex h-[308px] flex-col rounded-lg bg-base-gray-25 p-6 transition-colors duration-300 hover:bg-base-gray-50"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="2"
                            fill={['#0000ff', '#66C800'][index % 2]}
                          />
                        </svg>
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
                        >
                          <path
                            d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="mt-auto flex flex-col gap-3">
                        <Title level={TitleLevel.H6Regular} as="h4">
                          {card.header}
                        </Title>
                        <Text
                          variant={TextVariant.Body}
                          className="!text-pretty !text-base-gray-200"
                        >
                          {card.subheader}
                        </Text>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>

            {/* Base Layer Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.baseLayer.eyebrow,
                description: content.baseLayer.header,
              }}
            >
              <div className="col-span-full">
                <div className="grid grid-cols-1 gap-[min(2.25vw,_32px)] gap-y-12 sm:grid-cols-2 md:gap-y-20">
                  {content.baseLayer.cards.map((card) => (
                    <a
                      key={card.episode}
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="outline-card group flex flex-col gap-4"
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-base-gray-200/20">
                        {card.image && (
                          <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            className="object-cover transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Text
                          variant={TextVariant.CaptionMono}
                          className="!leading-none !text-base-gray-200"
                        >
                          {card.episode}
                        </Text>
                        <Title level={TitleLevel.H2Regular} className="!leading-none">
                          {card.name}
                        </Title>
                        {card.title && (
                          <Text variant={TextVariant.Body} className="!text-base-gray-200">
                            {card.title}
                          </Text>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Section>

            {/* Accelerator Programs Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.acceleratorPrograms.header,
                description: content.acceleratorPrograms.subheader,
              }}
            >
              <div className="col-span-full">
                <div className={cn('grid gap-[min(2.25vw,_32px)]', 'grid-cols-1 lg:grid-cols-2')}>
                  {content.acceleratorPrograms.cards.map((card, index) => (
                    <Link
                      href={card.url}
                      key={card.title}
                      target={card.url.includes('https://') ? '_blank' : '_self'}
                      className="group flex h-[308px] flex-col rounded-lg bg-base-gray-25 p-6 transition-colors duration-300 hover:bg-base-gray-50"
                    >
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="24"
                              height="24"
                              rx="2"
                              fill={['#66C800', '#ffd200'][index % 2]}
                            />
                          </svg>
                          <svg
                            width="13"
                            height="14"
                            viewBox="0 0 13 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
                          >
                            <path
                              d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div className="mt-auto flex flex-col gap-3">
                          <Title level={TitleLevel.H6Regular} as="h4">
                            {card.title}
                          </Title>
                          <Text
                            variant={TextVariant.Body}
                            className="!text-pretty !text-base-gray-200"
                          >
                            {card.subtitle}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Section>

            {/* Resources Section */}
            <Section content={{ title: content.resources.header }}>
              <div
                className={cn(
                  'grid gap-[min(2.25vw,_32px)]',
                  'col-span-full grid-cols-1 lg:grid-cols-3',
                )}
              >
                {content.resources.cards.map((card, index) => (
                  <Link
                    href={card.url}
                    key={card.title}
                    target={card.url.includes('https://') ? '_blank' : '_self'}
                    className="group flex h-[308px] flex-col rounded-lg bg-base-gray-25 p-6 transition-colors duration-300 hover:bg-base-gray-50"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="2"
                            fill={['#0000ff', '#66C800', '#ffd200'][index % 3]}
                          />
                        </svg>
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
                        >
                          <path
                            d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="mt-auto flex flex-col gap-3">
                        <Title level={TitleLevel.H6Regular} as="h4">
                          {card.title}
                        </Title>
                        <Text
                          variant={TextVariant.Body}
                          className="!text-pretty !text-base-gray-200"
                        >
                          {card.subtitle}
                        </Text>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          </div>
        </Container>
      </AnalyticsProvider>
    </>
  );
}
