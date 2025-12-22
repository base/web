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

const prefix = PrefixAsset as ImageType;

export function SectionBasePay() {
  return (
    <Section content={content}>
      <motion.div
        className="relative col-span-full aspect-[16/12] h-full w-full items-center justify-center overflow-hidden rounded-lg bg-base-gray-25 md:aspect-auto md:max-h-[80svh]"
        variants={itemContentVariants}
      >
        <ImageSequenceCanvas
          className="mix-blend-multiply"
          srcPrefix="/videos/basepay-frames/"
          totalFrames={39}
          extension="jpg"
        />

        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          {/* <div className="relative h-fit w-fit p-6">
            <Image
              width={300}
              height={300}
              src="/images/base-pay-slide.png"
              alt="Base Pay"
              className="h-auto max-w-[250px] overflow-hidden rounded-xl object-contain md:max-w-[300px]"
            />
          </div> */}
          <div className="relative h-fit w-fit">
            <div className="h-[280px] w-full max-w-[300px] rounded-xl bg-white p-3 font-sans">
              <div className="flex h-full flex-col gap-4">
                <p className="text-base font-medium text-base-black">Order Summary</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full rounded-md border border-base-gray-100 px-3 py-1 text-sm"
                    placeholder="Discount Code"
                  />
                  <button className="rounded-md bg-black px-3 py-1 text-sm text-white">
                    Apply
                  </button>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <p>Blue sprint shoe x1</p>
                    <p>$200.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Estimated tax</p>
                    <p>$2.00</p>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-medium">
                  <p>Total</p>
                  <div className="flex flex-col items-end">
                    <p>$202.00</p>
                    <p className="text-xs font-normal text-base-gray-200">202.00 USDC</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end">
                  <SlideButton
                    text="Pay with USDC"
                    finalText="Purchased"
                    revealText="Buying now..."
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
