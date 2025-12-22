import type { Metadata } from 'next';
import Image from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { GenericHero } from './GenericHero';
import { content } from './content';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';

import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import Link from 'apps/web/src/components/Link';
import { cn } from 'apps/web/src/utils/cn';
import AnimatedButton from 'apps/web/src/components/Button/AnimatedButton';
import { GlobeWrapper } from './GlobeWrapper';
import { ChainValueProp } from './ChainValueProp';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Chain`,
  openGraph: {
    title: `Base | Chain`,
    url: `/chain`,
  },
};

export default async function Chain() {
  return (
    <>
      <AnalyticsProvider context="chain">
        <div id="webgl-canvas" className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="-z-1 h-full w-full">
            <WebGLCanvas />
          </div>
        </div>
        <Container className="lg:pt-0">
          <div className="col-span-full flex flex-col">
            {/* Hero Section */}
            <GenericHero
              title={content.hero.header}
              subheader={content.hero.subheader}
              imageUrl={'/images/backgrounds/partnerships.webp'}
              ctas={content.hero.ctas}
            />

            {/* Value Props Section */}
            <Section
              content={{
                title: 'Why Base Chain',
              }}
            >
              <div className="col-span-full grid gap-16 md:grid-cols-2">
                {content.valueProps.map((prop, index) => {
                  let content = {
                    title: prop.header,
                    description: prop.subheader,
                  };

                  return (
                    // <Section content={content}>
                    //   <div className="col-span-full aspect-video w-full overflow-hidden bg-gray-5">
                    //     <p>TEST</p>
                    //   </div>
                    // </Section>
                    <div
                      key={prop.id}
                      className={cn(
                        'flex flex-col gap-6',
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                      )}
                    >
                      <ChainValueProp
                        eyebrow={prop.eyebrow}
                        pill={prop.pill}
                        header={prop.header}
                        subheader={prop.subheader}
                      />
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Globe Section */}
            <Section content={{}}>
              <section className="col-span-full w-full">
                <GlobeWrapper />
              </section>
            </Section>

            {/* Ecosystem Section */}

            <Section
              content={{
                title: content.ecosystem.header,
                description: content.ecosystem.subheader,
                cta: {
                  label: content.ecosystem.cta.label,
                  href: content.ecosystem.cta.url,
                },
              }}
            >
              <div className="col-span-full">
                <Marquee className="[--duration:60s]" pauseOnHover>
                  {content.ecosystem.logos.map((logo) => (
                    <div
                      key={logo}
                      className="relative flex aspect-square w-[100px] items-center justify-center overflow-hidden rounded-lg bg-black"
                    >
                      {/* <Text
                        variant={TextVariant.BodyLarge}
                        className="whitespace-nowrap !text-base-gray-200"
                      >
                        {logo}
                      </Text> */}
                      {/* <div className="absolute inset-0">
                        <Image
                          className="h-full w-full scale-150 object-cover blur-lg"
                          src={logo}
                          alt={logo}
                          width={140}
                          height={140}
                        />
                      </div> */}
                      <div className="absolute inset-0 h-full w-full scale-90 overflow-hidden rounded-md">
                        <Image
                          className="h-full w-full object-contain"
                          src={logo}
                          alt={logo}
                          width={140}
                          height={140}
                        />
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </Section>
            {/* <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Title level={TitleLevel.H1Regular} as="h2">
                  {content.ecosystem.header}
                </Title>
                <Text variant={TextVariant.BodyLarge} className="max-w-3xl !text-base-gray-200">
                  {content.ecosystem.subheader}
                </Text>
              </div>
              <Marquee className="[--duration:60s]" pauseOnHover>
                {content.ecosystem.logos.map((logo) => (
                  <div key={logo} className="flex min-w-[140px] items-center justify-center px-6">
                    <Text
                      variant={TextVariant.BodyLarge}
                      className="whitespace-nowrap !text-base-gray-200"
                    >
                      {logo}
                    </Text>
                  </div>
                ))}
              </Marquee>
              <Link href={content.ecosystem.cta.url} target="_blank" rel="noopener noreferrer">
                <AnimatedButton text={content.ecosystem.cta.label} />
              </Link>
            </section> */}

            {/* Engineering Blog Section */}
            <Section
              content={{
                title: content.engineeringBlog.header,
                cta: {
                  label: content.engineeringBlog.cta.label,
                  href: content.engineeringBlog.cta.url,
                },
              }}
            >
              <div
                className={cn(
                  'col-span-full grid gap-[min(2.25vw,_32px)]',
                  'grid-cols-1 lg:grid-cols-3',
                )}
              >
                {content.engineeringBlog.cards
                  .filter((card) => card.title)
                  .map((card, index) => (
                    <Link
                      href={card.url}
                      key={card.title || index}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2  transition-colors duration-300 hover:bg-base-gray-50"
                    >
                      {card.image && (
                        <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-3">
                        <Title level={TitleLevel.H2Regular} as="h4">
                          {card.title}
                        </Title>
                        <Text
                          variant={TextVariant.Body}
                          className="line-clamp-2 !text-base-gray-200"
                        >
                          {card.subtitle}
                        </Text>
                      </div>
                    </Link>
                  ))}
              </div>
            </Section>
            {/* <section className="flex flex-col gap-8">
              <Title level={TitleLevel.H4Regular} as="h2">
                {content.engineeringBlog.header}
              </Title>

              <Link
                href={content.engineeringBlog.cta.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimatedButton text={content.engineeringBlog.cta.label} />
              </Link>
            </section> */}

            {/* Final CTA Section */}
            <section className="col-span-full py-12 text-black">
              <div className="grid gap-[min(2.25vw,_32px)] md:grid-cols-2 md:items-center">
                <div className="max-w-[30ch]">
                  <Title level={TitleLevel.H1Regular}>{content.finalCta.header}</Title>
                </div>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={content.finalCta.ctas.primary.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant={ButtonVariants.Primary} size={ButtonSizes.Small}>
                        {content.finalCta.ctas.primary.label}
                      </Button>
                    </Link>
                    <Link
                      href={content.finalCta.ctas.secondary.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant={ButtonVariants.SecondaryOutline} size={ButtonSizes.Small}>
                        {content.finalCta.ctas.secondary.label}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </AnalyticsProvider>
    </>
  );
}
