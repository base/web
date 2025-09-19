'use client';

import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { CardScene } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/Believe/Card/Scene';
import { motion, Variants, cubicBezier } from 'motion/react';

type CardContent = {
  index?: string;
  title: string;
  description?: string;
  gltf?: {
    src: string;
    useRgbTexture?: boolean;
    stretchZ?: number;
    modelRotation?: [number, number, number];
  };
};

let patterns = [
  '/models/upd/pat-strip-blue.png',
  '/models/upd/pat-strip-green.png',
  '/models/upd/pat-strip-pink.png',
  '/models/upd/pat-strip-tan.png',
];

const viewport = { once: true, amount: 0.1 };

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
      duration: 0.25,
      ease: easeFn,
    },
  },
};

const itemContentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: easeFn } },
};

export function Card({ content }: { content: CardContent }) {
  return (
    <div className="0-h-[426px] 0-lg:h-[584px] relative flex aspect-square w-full flex-col overflow-hidden rounded-lg ">
      <div className="0-min-h-[245px] 0-lg:min-h-[388px] h-full w-full">
        <CardScene
          patternTexture={patterns[content?.index ? parseInt(content.index) % patterns.length : 0]}
          gltfSrc={content.gltf?.src}
          useRgbTexture={content.gltf?.useRgbTexture}
          stretchZ={content.gltf?.stretchZ}
          modelRotation={content.gltf?.modelRotation}
        />
      </div>
      <div className="absolute inset-0 right-0 bottom-0 left-0 px-2 py-1">
        <motion.div
          className="flex flex-col gap-3"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={itemContentVariants} className="">
            <Text
              variant={TextVariant.CaptionMono}
              className="!text-xs !leading-[90%] !text-black/40"
            >
              {content.title}
            </Text>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
