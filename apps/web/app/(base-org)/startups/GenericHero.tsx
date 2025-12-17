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
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Link from 'apps/web/src/components/Link';

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
    <Container className="pointer-events-none h-[40vh] gap-y-10 lg:pt-0">
      <div className="relative z-20 col-span-full flex h-[412px] w-full flex-col pb-0 lg:col-span-10 lg:h-[670px]">
        <AnimatedTitle titleLines={[title]} />
        {subheader && (
          <Text variant={TextVariant.BodyLarge} className="mt-4 max-w-xl !text-base-gray-200">
            {subheader}
          </Text>
        )}
        {ctas && (
          <div className="pointer-events-auto mt-8 flex flex-wrap gap-4">
            {ctas.primary && (
              <Link href={ctas.primary.url}>
                <Button variant={ButtonVariants.Primary} size={ButtonSizes.Small}>
                  {ctas.primary.label}
                </Button>
              </Link>
            )}
            {ctas.secondary && (
              <Link href={ctas.secondary.url}>
                <Button variant={ButtonVariants.SecondaryOutline} size={ButtonSizes.Small}>
                  {ctas.secondary.label}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="pointer-events-auto absolute -bottom-[4.5rem] left-0 right-0 top-0 z-10 overflow-hidden lg:-bottom-20">
        <HeroBackground config={heroBackgroundConfig} />
      </div>
    </Container>
  );
}
