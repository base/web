'use client';
import { motion, Variants, cubicBezier, spring } from 'motion/react';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

export const itemContentVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: spring, bounce: 0.3, duration: 0.6 } },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export function AnimatedTitle() {
  const titleLines = ['A global economy,', 'built by all of us'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="row-start-1 row-end-3 -mt-2 max-w-[900px]"
    >
      <Title level={TitleLevel.H4Regular} as="h1">
        {titleLines.map((line) => (
          <motion.span key={line} variants={itemContentVariants} className="block">
            {line}
          </motion.span>
        ))}
      </Title>
    </motion.div>
  );
}
