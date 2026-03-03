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

import { BaseAppTrade } from './modules/BaseAppTrade';
import { BaseAppMain } from './modules/BaseAppMain';
import { BaseAppBuy } from './modules/BaseAppBuy';
import { BaseAppSendGlobe } from './modules/BaseAppSendGlobe';

// import ImageAsset from './tba.png';
// import ImageAsset from './base-app-phone.png';
// import ImageAsset from './phone-mock-bg.png';
import ImageAsset from './phone.webp';
import HandImage from './hand.webp';
import BackgroundAsset from './sky-bg.png';
import { motion, spring } from 'motion/react';
import { ParallaxScaleWrapper } from './ParallaxScaleWrapper';
import { useState } from 'react';

const img = ImageAsset as ImageType;
const hand = HandImage as ImageType;
const prefix = PrefixAsset as ImageType;

export function SectionBaseApp() {
  const [phoneIsHovered, setPhoneIsHovered] = useState(false);
  const [socialIsHovered, setSocialIsHovered] = useState(false);
  const [smsIsHovered, setSmsIsHovered] = useState(false);
  const [sendIsHovered, setSendIsHovered] = useState(false);

  return (
    <Section content={content}>
      <div className="grid-base mb-base col-span-full min-h-[300px] select-none md:mb-20">
        <motion.div
          variants={itemContentVariants}
          onMouseEnter={() => setPhoneIsHovered(true)}
          onMouseLeave={() => setPhoneIsHovered(false)}
          className="relative col-span-full flex h-full w-full flex-col md:col-span-2"
        >
          <motion.div
            transition={{ type: spring, bounce: 0.3, duration: 0.3 }}
            className="group relative aspect-[16/9] h-full w-full flex-1 items-center justify-center overflow-hidden rounded-lg bg-base-gray-25"
          >
            <BaseAppMain />
          </motion.div>
          <div className="left-0 top-full block h-fit max-w-[95%] py-3 lg:py-4">
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              An everything app that brings together a social network, apps, payments, and finance.
              One place to earn, trade, and chat with everyone, everywhere.
            </Text>
          </div>
        </motion.div>

        {/* UI Section */}
        <motion.div
          onMouseEnter={() => setSocialIsHovered(true)}
          onMouseLeave={() => setSocialIsHovered(false)}
          className="col-span-full md:col-span-2"
        >
          <motion.div
            transition={{ type: spring, bounce: 0.3, duration: 0.3 }}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-base-gray-25"
          >
            <div className="absolute inset-0 h-full w-full">
              <BaseAppBuy />
            </div>
          </motion.div>
          <div className="block h-fit max-w-[95%] py-3 lg:py-4">
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              Buy any asset onchain
            </Text>
          </div>
        </motion.div>
        <motion.div
          onMouseEnter={() => setSmsIsHovered(true)}
          onMouseLeave={() => setSmsIsHovered(false)}
          variants={itemContentVariants}
          className="col-span-full md:col-span-2"
        >
          <motion.div
            transition={{ type: spring, bounce: 0.3, duration: 0.3 }}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-base-gray-25"
          >
            <div className="absolute inset-0 h-full w-full">
              <BaseAppTrade />
            </div>
          </motion.div>
          <div className="block h-fit max-w-[95%] py-3 lg:py-4">
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              See what your friends are trading
            </Text>
          </div>
        </motion.div>

        <motion.div
          onMouseEnter={() => setSendIsHovered(true)}
          onMouseLeave={() => setSendIsHovered(false)}
          variants={itemContentVariants}
          className="relative col-span-full flex h-full w-full flex-col md:col-span-2"
        >
          <motion.div
            transition={{ type: spring, bounce: 0.3, duration: 0.3 }}
            className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-base-gray-25"
          >
            <div className="absolute inset-0 h-full w-full">
              <BaseAppSendGlobe />
            </div>
          </motion.div>
          <div className="block h-fit max-w-[95%] py-3 lg:py-4">
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
