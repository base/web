'use client';

import {
  Section,
  ImageType,
  itemContentVariants,
} from 'apps/web/src/components/base-org/root/Redesign/Section';
import PrefixAsset from './prefix.svg';
import Image from 'next/image';
import ImageAsset from './asset.png';
import { motion } from 'motion/react';

const img = ImageAsset as ImageType;
const prefix = PrefixAsset as ImageType;

export function SectionBaseApp() {
  return (
    <Section content={content}>
      <motion.div
        className="col-span-full h-full max-h-[80svh] w-full items-center justify-center overflow-hidden rounded-lg bg-base-gray-25"
        variants={itemContentVariants}
      >
        <Image
          src={img.src}
          alt="Base App"
          width={img.width}
          height={img.height}
          className="mx-auto w-1/3 translate-y-[15%]"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 450px"
          quality={99}
        />
      </motion.div>
    </Section>
  );
}

const content = {
  prefix: {
    src: prefix.src,
    alt: 'Base App',
    width: prefix.width,
    height: prefix.height,
  },
  title: 'Post, trade, chat, and earn — all in one place',
  description:
    'An everything app that brings together a social network, apps, payments, and finance. One place to earn, trade, and chat with everyone, everywhere.',
  cta: {
    label: 'Get Base app',
    href: 'https://base.app/',
  },
};
