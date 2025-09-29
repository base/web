'use client';

import {
  ImageType,
  itemContentVariants,
  Section,
} from 'apps/web/src/components/base-org/root/Redesign/Section';
import PrefixAsset from './prefix.svg';
import { motion } from 'motion/react';
import { VideoPlayer } from 'apps/web/src/components/Brand/Video';

const prefix = PrefixAsset as ImageType;

export function SectionBasePay() {
  return (
    <Section content={content}>
      <motion.div
        className="col-span-full h-full max-h-[80svh] w-full items-center justify-center overflow-hidden rounded-lg"
        variants={itemContentVariants}
      >
        <VideoPlayer videoSrc="/videos/basepay.mp4" />
      </motion.div>
    </Section>
  );
}

const content = {
  prefix: {
    src: prefix.src,
    alt: 'Base Pay',
    width: prefix.width,
    height: prefix.height,
  },
  title: 'The fastest way to pay with USDC',
  description:
    'Express checkout with global settlement at near-zero cost. Live on Shopify, coming to more stores, and available for every business to accept USDC.',
  cta: {
    label: 'Learn more',
    href: 'https://base.org/pay',
  },
};
