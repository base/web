import type { Metadata } from 'next';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { GenericHero } from './GenericHero';
import content from './content.json';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import CardLink from 'apps/web/src/components/base-org/CardLink';
import { CtaBanner } from 'apps/web/src/components/Builders/Shared/CtaBanner';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import Link from 'apps/web/src/components/Link';

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
        <Container className="lg:pt-0">
          <div className="col-span-full flex flex-col gap-24">
            {/* Hero Section */}
            <GenericHero
              title={content.hero.header}
              subheader={content.hero.subheader}
              imageUrl={'/images/backgrounds/partnerships.webp'}
              ctas={content.hero.ctas}
            />

            {/* Logo Strip Section */}
            <section className="flex flex-col gap-8">
              <Text
                variant={TextVariant.Label1}
                className="text-center uppercase tracking-widest !text-base-gray-200"
              >
                {content.logoStrip.label}
              </Text>
              <Marquee className="[--duration:40s]" pauseOnHover>
                {content.logoStrip.logos.map((logo) => (
                  <div key={logo} className="flex min-w-[120px] items-center justify-center px-6">
                    <Text
                      variant={TextVariant.Body}
                      className="whitespace-nowrap !text-base-gray-200"
                    >
                      {logo}
                    </Text>
                  </div>
                ))}
              </Marquee>
            </section>

            {/* Value Props Section */}
            <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {content.valueProps.map((prop) => (
                <div key={prop.id} className="flex flex-col gap-4 rounded-xl p-6">
                  <Title level={TitleLevel.Title3} className="font-bold">
                    {prop.header}
                  </Title>
                  <Text variant={TextVariant.Body} className="!text-base-gray-200">
                    {prop.subheader}
                  </Text>
                </div>
              ))}
            </section>

            {/* Base Batches Section */}
            <section className="flex flex-col items-center gap-6 rounded-2xl px-8 py-16 text-center">
              <Text
                variant={TextVariant.Label1}
                className="uppercase tracking-widest !text-base-gray-200"
              >
                {content.baseBatches.eyebrow}
              </Text>
              <Title level={TitleLevel.Title1} as="h2">
                {content.baseBatches.header}
              </Title>
              <Text variant={TextVariant.Body} className="max-w-2xl !text-base-gray-200">
                {content.baseBatches.subheader}
              </Text>
              <Link href={content.baseBatches.cta.url}>
                <Button variant={ButtonVariants.SecondaryOutline} size={ButtonSizes.Small}>
                  {content.baseBatches.cta.label}
                </Button>
              </Link>
            </section>

            {/* Base Layer Section */}
            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <Text
                  variant={TextVariant.Label1}
                  className="uppercase tracking-widest !text-base-gray-200"
                >
                  {content.baseLayer.eyebrow}
                </Text>
                <Title level={TitleLevel.Title1} as="h2">
                  {content.baseLayer.header}
                </Title>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {content.baseLayer.cards.map((card) => (
                  <div
                    key={card.episode}
                    className={`flex flex-col gap-3 rounded-xl p-6 ${
                      card.isPlaceholder ? 'border border-dashed border-base-gray-200/30' : ''
                    }`}
                  >
                    <Text variant={TextVariant.Label2} className="!text-base-gray-200">
                      {card.episode}
                    </Text>
                    <Title level={TitleLevel.Title3} className="font-bold">
                      {card.name}
                    </Title>
                    {card.title && (
                      <Text variant={TextVariant.Body} className="!text-base-gray-200">
                        {card.title}
                      </Text>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Ecosystem Programs Section */}
            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <Title level={TitleLevel.Title1} as="h2">
                  {content.ecosystemPrograms.header}
                </Title>
                <Text variant={TextVariant.Body} className="max-w-2xl !text-base-gray-200">
                  {content.ecosystemPrograms.subheader}
                </Text>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {content.ecosystemPrograms.cards.map((card) => (
                  <CardLink key={card.title} href={card.url}>
                    <div className="flex flex-col gap-2 p-2">
                      <Title level={TitleLevel.Title3} className="font-bold">
                        {card.title}
                      </Title>
                      <Text variant={TextVariant.Body} className="!text-base-gray-200">
                        {card.subtitle}
                      </Text>
                    </div>
                  </CardLink>
                ))}
              </div>
            </section>

            {/* Accelerator Programs Section */}
            <section className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <Title level={TitleLevel.Title1} as="h2">
                  {content.acceleratorPrograms.header}
                </Title>
                <Text variant={TextVariant.Body} className="max-w-2xl !text-base-gray-200">
                  {content.acceleratorPrograms.subheader}
                </Text>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {content.acceleratorPrograms.cards.map((card) => (
                  <CardLink key={card.title} href={card.url}>
                    <div className="flex flex-col gap-2 p-2">
                      <Title level={TitleLevel.Title3} className="font-bold">
                        {card.title}
                      </Title>
                      <Text variant={TextVariant.Body} className="!text-base-gray-200">
                        {card.subtitle}
                      </Text>
                    </div>
                  </CardLink>
                ))}
              </div>
            </section>

            {/* Final CTA Section */}
            <div className="text-white">
              <CtaBanner
                title={content.finalCta.header}
                description={content.finalCta.subheader}
                cta={
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link href={content.finalCta.ctas.primary.url}>
                      <Button variant={ButtonVariants.Primary} size={ButtonSizes.Small}>
                        {content.finalCta.ctas.primary.label}
                      </Button>
                    </Link>
                    <Link href={content.finalCta.ctas.secondary.url}>
                      <Button variant={ButtonVariants.SecondaryOutline} size={ButtonSizes.Small}>
                        {content.finalCta.ctas.secondary.label}
                      </Button>
                    </Link>
                  </div>
                }
              />
            </div>
          </div>
        </Container>
      </AnalyticsProvider>
    </>
  );
}
