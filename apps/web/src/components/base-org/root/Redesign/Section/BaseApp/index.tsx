'use client';

import {
  Section,
  ImageType,
  itemContentVariants,
} from 'apps/web/src/components/base-org/root/Redesign/Section';
import PrefixAsset from './prefix.svg';
import Image from 'next/image';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';

import { BaseAppSocial } from './BaseAppSocial';
import { BaseAppSend } from './BaseAppSend';
import { BaseAppSms } from './BaseAppSms';
import { BaseAppEarn } from './BaseAppEarn';

import ImageAsset from './base-app-phone.png';
import { motion, spring } from 'motion/react';
import { ParallaxScaleWrapper } from './ParallaxScaleWrapper';
import { useState } from 'react';

const img = ImageAsset as ImageType;
const prefix = PrefixAsset as ImageType;

export function SectionBaseApp() {
  const [phoneIsHovered, setPhoneIsHovered] = useState(false);
  const [socialIsHovered, setSocialIsHovered] = useState(false);
  const [smsIsHovered, setSmsIsHovered] = useState(false);
  const [sendIsHovered, setSendIsHovered] = useState(false);

  return (
    <Section content={content}>
      <div className="grid-base mb-base col-span-full min-h-[300px] md:mb-20">
        <motion.div
          variants={itemContentVariants}
          onMouseEnter={() => setPhoneIsHovered(true)}
          onMouseLeave={() => setPhoneIsHovered(false)}
          className="relative col-span-full flex h-full w-full flex-col md:col-span-2 md:row-span-2"
        >
          <motion.div
            animate={
              phoneIsHovered ? { backgroundColor: '#F6F6F6' } : { backgroundColor: '#FAFAFA' }
            }
            transition={{ type: spring, bounce: 0.3, duration: 0.3 }}
            className="group relative aspect-square h-full w-full items-center justify-center overflow-hidden rounded-lg bg-base-gray-25 md:aspect-auto"
          >
            <ParallaxScaleWrapper
              parallaxMultiplier={1.1}
              maxScale={1.1}
              disableScale
              startingScale={0.7}
              scrollRange={{ start: 1, end: -1.0 }}
            >
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={img.src}
                  alt="Base App"
                  width={img.width}
                  height={img.height}
                  className="mx-auto w-[90%] translate-y-[10%]"
                  draggable={false}
                  sizes="(max-width: 768px) 100vw, 450px"
                  quality={99}
                />
              </div>
            </ParallaxScaleWrapper>
          </motion.div>
          <div className="left-0 top-full block h-fit max-w-[95%] py-3 md:absolute lg:py-4">
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              An everything app that brings together a social network, apps, payments, and finance.
              One place to earn, trade, and chat with everyone, everywhere.
            </Text>
          </div>
        </motion.div>

        <motion.div
          onMouseEnter={() => setSocialIsHovered(true)}
          onMouseLeave={() => setSocialIsHovered(false)}
          className="col-span-2 md:col-span-1"
        >
          <motion.div
            animate={
              socialIsHovered ? { backgroundColor: '#F6F6F6' } : { backgroundColor: '#FAFAFA' }
            }
            transition={{ type: spring, bounce: 0.3, duration: 0.3 }}
            className="relative aspect-square w-full overflow-hidden rounded-lg bg-base-gray-25"
          >
            <div className="absolute inset-0 h-full w-full">
              <BaseAppSocial />
            </div>
          </motion.div>
          <div className="block h-fit max-w-[95%] py-3 lg:py-4">
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              Your social network, onchain
            </Text>
          </div>
        </motion.div>
        <motion.div
          onMouseEnter={() => setSmsIsHovered(true)}
          onMouseLeave={() => setSmsIsHovered(false)}
          variants={itemContentVariants}
          className="col-span-2 md:col-span-1"
        >
          <motion.div
            animate={smsIsHovered ? { backgroundColor: '#F6F6F6' } : { backgroundColor: '#FAFAFA' }}
            transition={{ type: spring, bounce: 0.3, duration: 0.3 }}
            className="relative aspect-square w-full overflow-hidden rounded-lg bg-base-gray-25"
          >
            <div className="absolute inset-0 h-full w-full">
              {/* <BaseAppSms /> */}
              <BaseAppEarn />
            </div>
          </motion.div>
          <div className="block h-fit max-w-[95%] py-3 lg:py-4">
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              Create and earn
            </Text>
          </div>
        </motion.div>

        <motion.div
          variants={itemContentVariants}
          className="relative col-span-full md:col-span-2 md:col-start-3"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-base-gray-25">
            <div className="absolute inset-0 h-full w-full">
              <BaseAppSend />
            </div>
          </div>
          <div className="left-0 top-full block h-fit max-w-[95%] py-3 md:absolute lg:py-4">
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              Send money globally for free
            </Text>
          </div>
        </motion.div>
      </div>
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
  // description:
  //   'An everything app that brings together a social network, apps, payments, and finance. One place to earn, trade, and chat with everyone, everywhere.',
  cta: {
    label: 'Get Base app',
    href: 'https://base.app/',
  },
};
