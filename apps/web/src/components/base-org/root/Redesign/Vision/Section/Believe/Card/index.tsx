'use client';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
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
    <div className="relative flex h-[426px] w-full flex-col lg:h-[584px]">
      <div className="h-full min-h-[245px] w-full lg:min-h-[388px]">
        <CardScene
          gltfSrc={content.gltf?.src}
          useRgbTexture={content.gltf?.useRgbTexture}
          stretchZ={content.gltf?.stretchZ}
          modelRotation={content.gltf?.modelRotation}
        />
      </div>
      <div className="flex flex-col justify-between rounded-b-[8px] bg-base-gray-25 p-6 pt-8">
        <motion.div
          className="flex flex-col gap-3"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={itemContentVariants}>
            <Title level={TitleLevel.H5Regular}>{content.title}</Title>
          </motion.div>
          <motion.div variants={itemContentVariants}>
            <Title level={TitleLevel.H6Regular} className="!text-base-gray-200">
              {content.description}
            </Title>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
