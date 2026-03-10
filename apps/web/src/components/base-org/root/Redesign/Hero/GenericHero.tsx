'use client';

import Container from 'apps/web/src/components/base-org/Container';
import { Halftone } from 'apps/web/app/(base-org)/enterprises/Halftone';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import AnimatedButton from 'apps/web/src/components/Button/AnimatedButton';
import Link from 'apps/web/src/components/Link';

import { motion, cubicBezier, Variants, spring } from 'motion/react';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

export const motionConfig: any = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { type: spring, bounce: 0.3, duration: 0.5, delay: 0.3 },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: spring, bounce: 0.3, duration: 0.6 } },
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
  return (
    <Container className="!lg:pt-0 grid-cols-9 gap-y-12 !pt-0">
      <div className="col-span-full flex h-fit flex-col justify-start gap-y-6 md:h-fit md:justify-start">
        <div className="relative col-span-full w-full pb-0">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <Halftone imageUrl={imageUrl} primaryColor={primaryColor} sideFade={true} />
          </div>
        </div>
        <div className="col-span-full grid w-full grid-cols-4">
          <div className="col-span-full md:col-span-2 md:col-start-1">
            <div className="w-full">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="row-start-1 row-end-3 -mt-2 max-w-[900px]"
              >
                <Title level={TitleLevel.H4Regular} as="h1">
                  {title.split('\n').map((line) => (
                    <motion.span key={line} variants={itemVariants} className="block">
                      {line}
                    </motion.span>
                  ))}
                </Title>
              </motion.div>
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
