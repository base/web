'use client';

import { Icon } from 'apps/web/src/components/Icon/Icon';
import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';

export function AnimatedBaseAgent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const container = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 0.3,
        },
      },
    }),
    [],
  );

  const item = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    }),
    [],
  );

  return (
    <div ref={ref} className="my-8 flex h-full w-[285px] md:w-[292px] flex-col rounded-xl bg-black p-4">
      {/* Header */}
      <motion.div
        variants={item}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="mb-4 flex items-center gap-2"
      >
        <span className="flex items-center gap-2 text-lg font-medium text-white">
          <Icon name="terminal" width="14" height="12" />
          Based Agent
        </span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="flex flex-col gap-2"
      >
        <motion.div
          variants={item}
          className="w-1/2 self-start rounded-full bg-dark-palette-secondary p-2"
        >
          <div className="h-4 w-full rounded-full bg-dark-state-s-pressed" />
        </motion.div>

        <motion.div variants={item} className="w-1/2 self-end rounded-full bg-dark-blue-70 p-2">
          <div className="h-4 w-full rounded-full bg-dark-state-p-disabled" />
        </motion.div>

        <motion.div
          variants={item}
          className="w-1/2 self-start rounded-full bg-dark-palette-secondary p-2"
        >
          <div className="h-4 w-full rounded-full bg-dark-state-s-pressed" />
        </motion.div>

        <motion.div variants={item} className="w-1/2 self-end rounded-full bg-dark-blue-70 p-2">
          <div className="h-4 w-full rounded-full bg-dark-state-p-disabled" />
        </motion.div>
      </motion.div>
    </div>
  );
}
