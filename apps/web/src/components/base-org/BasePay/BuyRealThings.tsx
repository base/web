'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

export default function BuyRealThings() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-400, 0]);

  const leftCarouselItems = [
    { src: '/images/basepay/item-1.webp', alt: 'Product 1' },
    { src: '/images/basepay/item-2.webp', alt: 'Product 2' },
    { src: '/images/basepay/item-3.webp', alt: 'Product 3' },
    { src: '/images/basepay/item-4.webp', alt: 'Product 4' },
  ];

  const rightCarouselItems = [
    { src: '/images/basepay/item-5.webp', alt: 'Product 5' },
    { src: '/images/basepay/item-6.webp', alt: 'Product 6' },
    { src: '/images/basepay/item-7.webp', alt: 'Product 7' },
    { src: '/images/basepay/item-8.webp', alt: 'Product 8' },
  ];

  return (
    <section ref={ref} className="col-span-full py-12 text-black">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-24">
        <div className="flex flex-col gap-8 md:max-w-sm">
          <Title level={TitleLevel.H4Regular}>Buy real things</Title>
          <Title level={TitleLevel.H6Regular}>
            Available soon at millions of US Shopify stores, with a growing list of merchants
            accepting Base Pay.
          </Title>
        </div>

        {/* Animated Carousels Container */}
        <div className="relative flex h-[800px] w-full max-w-md justify-center gap-4 overflow-hidden">
          {/* Fade gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />

          {/* Add to Cart Button */}
          <div className="absolute left-1/2 top-1/2 z-20 flex h-9 w-60 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[8px] bg-black text-white shadow-lg">
            <span className="pointer-events-none select-none font-sans text-[0.9375rem] font-medium leading-[114%]">
              Add to Cart
            </span>
          </div>

          {/* Left Carousel - Moving Up */}
          <motion.div className="flex flex-col items-center gap-3" style={{ y: y1 }}>
            {[...leftCarouselItems, ...leftCarouselItems].map((item) => (
              <div key={crypto.randomUUID()} className="flex-shrink-0 overflow-hidden rounded-3xl">
                <ImageWithLoading src={item.src} alt={item.alt} width={245} height={343} />
              </div>
            ))}
          </motion.div>

          {/* Right Carousel - Moving Down */}
          <motion.div className="flex flex-col items-center gap-3" style={{ y: y2 }}>
            {[...rightCarouselItems, ...rightCarouselItems].map((item) => (
              <div key={crypto.randomUUID()} className="flex-shrink-0 overflow-hidden rounded-3xl">
                <ImageWithLoading src={item.src} alt={item.alt} width={245} height={343} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
