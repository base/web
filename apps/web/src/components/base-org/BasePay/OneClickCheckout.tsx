'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

export default function OneClickCheckout() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.7, 1, 1]);

  const animationStyle = useMemo(
    () => ({
      scale,
      opacity,
    }),
    [scale, opacity],
  );

  return (
    <section ref={ref} className="col-span-full text-black file:py-12">
      <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
        <div className="rounded-md bg-gray-5 px-8 pb-8">
          <motion.div style={animationStyle} className="origin-top">
            <ImageWithLoading
              src="/images/basepay/checkout-image.webp"
              alt="Base Pay checkout"
              width={375}
              height={410}
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-8 md:max-w-sm">
          <Title level={TitleLevel.H4Regular}>One-click checkout</Title>
          <Title level={TitleLevel.H6Regular}>
            Pay with crypto instantly, no extra steps. Save shipping info to make purchases even
            more convenient.
          </Title>
        </div>
      </div>
    </section>
  );
}
