import type { Metadata } from 'next';
import Image from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { content } from './content';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import { GenericHero } from 'apps/web/src/components/base-org/root/Redesign/Hero/GenericHero';

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
              description={content.hero.subheader}
              imageUrl={'/images/backgrounds/partnerships.webp'}
              buttons={[
                { text: content.hero.ctas.primary.label, href: content.hero.ctas.primary.url },
              ]}
            />

            {/* Value Props Section */}
            <Section
              content={{
                title: 'An open platform for the global economy',
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
                <div className="relative">
                  <div
                    style={{
                      background:
                        'linear-gradient(-90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 1) 100%)',
                    }}
                    className="absolute inset-0 z-20 h-full w-[120px] "
                  ></div>
                  <div
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 1) 100%)',
                    }}
                    className="absolute right-0 top-0 z-20 h-full w-[120px] "
                  ></div>
                  <Marquee className="[--duration:60s]" pauseOnHover={false}>
                    {content.ecosystem.logos.map((logo) => (
                      <div
                        key={logo}
                        className="relative flex aspect-square w-[100px] items-center justify-center overflow-hidden rounded-[26px] bg-base-gray-100"
                      >
                        <div className="absolute inset-0 h-full w-full overflow-hidden p-4">
                          <Image
                            className="h-full w-full rounded-xl object-contain"
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
              </div>
            </Section>

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
          </div>
        </Container>
      </AnalyticsProvider>
    </>
  );
}
