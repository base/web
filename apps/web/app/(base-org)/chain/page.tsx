import type { Metadata } from 'next';
import Image from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { GenericHero } from './GenericHero';
import content from './content.json';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
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
          <div className="col-span-full flex flex-col gap-24">
            {/* Hero Section */}
            <GenericHero
              title={content.hero.header}
              subheader={content.hero.subheader}
              imageUrl={'/images/backgrounds/partnerships.webp'}
              ctas={content.hero.ctas}
            />

            {/* Value Props Section */}
            <section className="flex flex-col gap-16">
              {content.valueProps.map((prop, index) => (
                <div
                  key={prop.id}
                  className={cn(
                    'flex flex-col gap-6 rounded-2xl p-8',
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                  )}
                >
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Text
                        variant={TextVariant.CTALabel}
                        className="uppercase tracking-widest !text-base-gray-200"
                      >
                        {prop.eyebrow}
                      </Text>
                      {prop.pill && (
                        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
                          {prop.pill}
                        </span>
                      )}
                    </div>
                    <Title level={TitleLevel.H4Regular} as="h3">
                      {prop.header}
                    </Title>
                    <Text variant={TextVariant.BodyLarge} className="max-w-2xl !text-base-gray-200">
                      {prop.subheader}
                    </Text>
                  </div>
                </div>
              ))}
            </section>

            {/* Stats Section */}
            <section className="flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
                {/* Live Stats */}
                {content.stats.live.map((stat) => (
                  <div key={stat.id} className="flex flex-col gap-2 rounded-xl bg-base-gray-25 p-6">
                    <Text
                      variant={TextVariant.CTALabel}
                      className="uppercase tracking-widest !text-base-gray-200"
                    >
                      {stat.label}
                    </Text>
                    <Title level={TitleLevel.H4Regular} className="tabular-nums">
                      {/* Placeholder for live counter */}
                      <span className="animate-pulse">--</span>
                    </Title>
                    <div className="flex items-center gap-1">
                      <span className="bg-green-500 h-2 w-2 animate-pulse rounded-full" />
                      <Text variant={TextVariant.Caption} className="!text-green-500">
                        Live
                      </Text>
                    </div>
                  </div>
                ))}
                {/* Static Stats */}
                {content.stats.static.map((stat) => (
                  <div key={stat.id} className="flex flex-col gap-2 rounded-xl bg-base-gray-25 p-6">
                    <Text
                      variant={TextVariant.CTALabel}
                      className="uppercase tracking-widest !text-base-gray-200"
                    >
                      {stat.label}
                    </Text>
                    <Title level={TitleLevel.H5Regular}>{stat.value}</Title>
                  </div>
                ))}
              </div>
            </section>

            {/* Ecosystem Section */}
            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Title level={TitleLevel.H4Regular} as="h2">
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
            </section>

            {/* Engineering Blog Section */}
            <section className="flex flex-col gap-8">
              <Title level={TitleLevel.H4Regular} as="h2">
                {content.engineeringBlog.header}
              </Title>
              <div className={cn('grid gap-[min(2.25vw,_32px)]', 'grid-cols-1 lg:grid-cols-3')}>
                {content.engineeringBlog.cards
                  .filter((card) => card.title)
                  .map((card, index) => (
                    <Link
                      href={card.url}
                      key={card.title || index}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col overflow-hidden rounded-lg bg-base-gray-25 transition-colors duration-300 hover:bg-base-gray-50"
                    >
                      {card.image && (
                        <div className="relative aspect-video w-full overflow-hidden">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-3 p-6">
                        <Title level={TitleLevel.H6Regular} as="h4">
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
              <Link
                href={content.engineeringBlog.cta.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimatedButton text={content.engineeringBlog.cta.label} />
              </Link>
            </section>

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
