'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import cx from 'classnames';

type Props = {
  className?: string;
};

export function AnimatedBaseAgent({ className }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.85 });

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
    <div
      ref={ref}
      className={cx(
        'my-8 flex h-full w-[285px] flex-col rounded-xl bg-black p-4 md:w-[292px]',
        className,
      )}
    >
      {/* Header */}
      <motion.div
        variants={item}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="mb-4 flex items-center gap-2"
      >
        <span className="flex items-center gap-2 text-lg font-medium text-white">Agent</span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="flex flex-col gap-4"
      >
        <motion.div variants={item} className="w-1/2 self-start rounded-full ">
          <div className="h-6 w-full rounded-full bg-dark-state-s-pressed" />
        </motion.div>

        <motion.div variants={item} className="w-1/2 self-end rounded-full">
          <div className="h-6 w-full rounded-full bg-[#7575FF]" />
        </motion.div>

        <motion.div variants={item} className="w-1/2 self-start rounded-full ">
          <div className="h-6 w-full rounded-full bg-dark-state-s-pressed" />
        </motion.div>

        <motion.div variants={item} className="w-1/2 self-end rounded-full">
          <div className="h-6 w-full rounded-full bg-[#7575FF]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
