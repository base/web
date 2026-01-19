'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

export default function Earn() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.75 });

  const slideInAnimation = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay: 0.3,
      duration: 0.8,
    },
  };

  return (
    <section ref={ref} className="col-span-full py-12 text-black">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        <div className="flex flex-col gap-8 md:max-w-sm">
          <Title level={TitleLevel.H1Regular}>Earn while you spend.</Title>
          <Title level={TitleLevel.H2Regular}>
            Your USDC automatically earns 3.35% APY until the moment you spend it. Plus 1% back on
            all purchases at Shopify stores.
          </Title>
        </div>
        <div className="flex justify-center rounded-md bg-gray-5 px-6 py-40">
          <motion.div
            initial={slideInAnimation.initial}
            animate={isInView ? slideInAnimation.animate : slideInAnimation.initial}
            transition={slideInAnimation.transition}
          >
            <ImageWithLoading
              src="/images/basepay/earn-image.webp"
              alt="Base Pay earn"
              width={390}
              height={95}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
