'use client';

import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';

import Container from 'apps/web/src/components/base-org/Container';
import HeroBackground from 'apps/web/src/components/Brand/Hero/Background';
import { AnimatedTitle } from 'apps/web/src/components/AnimatedTitle';
import type { HeroBackgroundConfig } from 'apps/web/src/components/Brand/Hero/Background';
import Link from 'apps/web/src/components/Link';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

type CtaButton = {
  label: string;
  url: string;
};

type GenericHeroProps = {
  title: string;
  subheader?: string;
  imageUrl: string;
  ctas?: {
    primary?: CtaButton;
    secondary?: CtaButton;
  };
};

export function GenericHero({ title, subheader, imageUrl, ctas }: GenericHeroProps) {
  const heroBackgroundConfig: HeroBackgroundConfig = {
    imageUrl: imageUrl,
    altPattern: {
      url: '/patterns/pat-colorful.png',
      columns: 6,
    },
    className: 'h-full w-full',
    enableInteractivity: true,
    velocityDissipation: 0.94,
    radius: 0.25,
    bottomFade: true,
  };
  return (
    <Container className="pointer-events-none gap-y-12 lg:pt-0">
      <div className="relative col-span-full h-[412px] w-full pb-0 lg:h-[670px]">
        <div className="relative z-20 flex h-full w-full flex-col">
          <AnimatedTitle titleLines={[title]} />
          {ctas && (
            <div className="mt-12 flex max-w-xs flex-col items-start gap-5 md:max-w-md md:flex-row">
              {ctas.primary && (
                <Button
                  variant={ButtonVariants.Primary}
                  size={ButtonSizes.Small}
                  className="pointer-events-auto w-full"
                >
                  <Link href={ctas.primary.url}>{ctas.primary.label}</Link>
                </Button>
              )}
              {ctas.secondary && (
                <Button
                  variant={ButtonVariants.SecondaryOutline}
                  size={ButtonSizes.Small}
                  className="pointer-events-auto w-full"
                >
                  <Link href={ctas.secondary.url}>{ctas.secondary.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="pointer-events-auto absolute inset-0 overflow-hidden">
          <HeroBackground config={heroBackgroundConfig} />
        </div>
      </div>
      {subheader && (
        <Title level={TitleLevel.H5Regular} as="h2" className="col-span-8">
          {subheader}
        </Title>
      )}
    </Container>
  );
}
