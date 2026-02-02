'use client';

import {
  ImageType,
  itemContentVariants,
  Section,
} from 'apps/web/src/components/base-org/root/Redesign/Section';
import PrefixAsset from './prefix.svg';
import { motion } from 'motion/react';
import Image from 'next/image';
import ImageSequenceCanvas from './ImageSequenceCanvas';
import SlideButton from './SlideButton';
import { BasePayImages } from './BasePayImages';

const prefix = PrefixAsset as ImageType;

export function SectionBasePay() {
  return (
    <Section content={content}>
      <motion.div
        className="relative col-span-full aspect-[16/12] h-full w-full rounded-lg bg-base-gray-25/0 md:aspect-[16/10]"
        variants={itemContentVariants}
      >
        {/* TODO: Add content here */}
        <BasePayImages />
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
