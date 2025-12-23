'use client';

import Container from 'apps/web/src/components/base-org/Container';
import { AnimatedTitle } from 'apps/web/src/components/base-org/root/Redesign/Hero/AnimatedTitle';
import { LogoHero } from 'apps/web/src/components/base-org/root/Redesign/Hero/LogoHero';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { LogoHeroAlt } from 'apps/web/src/components/base-org/root/Redesign/Hero/LogoHeroAlt';
import { LogoHeroSlot } from 'apps/web/src/components/base-org/root/Redesign/Hero/LogoHeroSlot';
import { Halftone } from 'apps/web/app/(base-org)/enterprises/Halftone';
import { HeroBackgroundConfig } from 'apps/web/src/components/Brand/Hero/Background';
import AnimatedButton from 'apps/web/src/components/Button/AnimatedButton';
import Link from 'apps/web/src/components/Link';

import { motion, cubicBezier, Variants, spring } from 'motion/react';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

export const motionConfig: any = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { type: spring, bounce: 0.3, duration: 0.5, delay: 0.3 },
};

type GenericHeroProps = {
  title: string;
  imageUrl: string;
  buttons?: ButtonProps[];
  description: string;
  primaryColor?: string;
};

type ButtonProps = {
  text: string;
  href: string;
};

export function GenericHero({
  title,
  description,
  imageUrl,
  buttons,
  primaryColor,
}: GenericHeroProps) {
  const heroBackgroundConfig: HeroBackgroundConfig = {
    imageUrl: imageUrl,
    altPattern: {
      url: '/patterns/pat-colorful.png',
      columns: 6,
    },
  };
  return (
    <Container className="!lg:pt-0 grid-cols-9 gap-y-12 !pt-0">
      <div className="col-span-full flex h-fit flex-col justify-start gap-y-6 md:h-fit md:justify-start">
        <div className="relative col-span-full w-full pb-0">
          {/* <LogoHeroSlot> */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <Halftone imageUrl={imageUrl} primaryColor={primaryColor} />
          </div>
          {/* </LogoHeroSlot> */}
        </div>
        <div className="grid-base col-span-full w-full">
          <div className="col-span-full md:col-span-2 md:col-start-1">
            <div className="w-full">
              <AnimatedTitle titleLines={[title]} />
            </div>
          </div>
          <motion.div
            initial={motionConfig.initial}
            animate={motionConfig.animate}
            transition={motionConfig.transition}
            className="col-span-full flex flex-col gap-4 md:col-span-2 md:col-start-3"
          >
            <div className="w-full">
              <Text variant={TextVariant.BodyLarge} className="!text-base-gray-200">
                {description}
              </Text>
            </div>
            {buttons && (
              <div className="w-full">
                {buttons.map((button) => (
                  <Link key={button.text} href={button.href}>
                    <AnimatedButton key={button.text} text={button.text} />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
