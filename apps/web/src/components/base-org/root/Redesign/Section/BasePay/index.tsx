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
import { BasePayImagesCircle } from './BasePayImagesCircle';
import { useEffect, useState } from 'react';
import { RollingTextUpdate } from 'apps/web/src/components/base-org/RollingText/RollingTextUpdate';

const prefix = PrefixAsset as ImageType;

export function SectionBasePay() {
  return (
    <Section disableWrapperAnimation content={content}>
      <motion.div
        className="relative col-span-full aspect-[12/16] h-full w-full rounded-lg bg-base-gray-25 md:aspect-[16/8]"
        // variants={itemContentVariants}
      >
        <BasePayImagesCircle />
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
