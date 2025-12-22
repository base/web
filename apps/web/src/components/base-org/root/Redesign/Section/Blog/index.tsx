'use client';

import { motion, AnimatePresence, Variants, cubicBezier } from 'motion/react';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import {
  BlogPost,
  blogPosts,
} from 'apps/web/src/components/base-org/root/Redesign/Section/Blog/BlogPosts';
import classNames from 'classnames';
import { levelStyles } from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { variantStyles } from 'apps/web/src/components/base-org/typography/TextRedesign';

import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Link from 'apps/web/src/components/Link';
import { BlogCardImage } from 'apps/web/src/components/base-org/root/Redesign/Section/Blog/BlogCardImage';

export function SectionBlog() {
  return (
    <Section content={content}>
      <BlogCarousel />
    </Section>
  );
}

const content = {
  title: 'Read the latest from Base',
  cta: {
    label: 'Read more',
    href: 'https://blog.base.org',
  },
};

function BlogCarousel() {
  const displayedPosts: BlogPost[] = blogPosts.slice(0, 2);

  return (
    <div className="grid-base relative col-span-full !gap-y-[80px] overflow-hidden">
      {/* blog card container */}
      {displayedPosts.map((post, index) => (
        <div key={post.href} className="relative col-span-full md:col-span-2">
          <BlogCard
            key={post.href}
            title={post.title}
            subtitle={post.subtitle}
            href={post.href}
            backgroundImage={post.previewImage}
            slideNumber={index + 1}
            animationKey={index}
            brightness={post.brightness}
            contrast={post.contrast}
          />
        </div>
      ))}
    </div>
  );
}

function BlogCardSlideNumber({ slideNumber }: { slideNumber: number }) {
  return (
    <div className="absolute -top-12 left-0 hidden h-12 w-12 items-center justify-center rounded-tr-md bg-base-gray-25 xl:flex">
      {/* slide number on the top left */}
      <motion.span
        className={classNames(variantStyles['body-mono'], 'text-base-black')}
        transition={blogCardTransition}
      >
        {slideNumber.toString()}
      </motion.span>
    </div>
  );
}

function BlogCardContent({
  title,
  subtitle,
  slideNumber,
  animationKey,
  carouselControls,
}: {
  title: string;
  subtitle: string;
  slideNumber: number;
  animationKey: number;
  carouselControls?: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-[3] md:flex-none">
      <BlogCardSlideNumber slideNumber={slideNumber} />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={animationKey}
          className="w-full"
          variants={textVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={blogCardTransition}
        >
          <div className="w-full pb-8 sm:pb-12 md:px-0 md:pb-12 xl:px-0">
            <div className="flex items-end justify-between">
              {/* text */}
              <motion.div className="flex flex-1 flex-col gap-4 md:max-w-[380px] lg:max-w-[420px] xl:h-36 xl:max-w-[600px]">
                <motion.h5
                  className={classNames(
                    levelStyles['h2-regular'],
                    '!flex items-end text-pretty md:h-12 md:items-center lg:line-clamp-2 lg:h-14 xl:h-auto xl:items-end',
                  )}
                  initial={textConfig1.initial}
                  animate={textConfig1.animate}
                  transition={textConfig1.transition}
                >
                  {title}
                </motion.h5>
                <motion.div
                  className={classNames(
                    variantStyles.body,
                    'text-pretty !text-base-gray-200 xl:line-clamp-3 xl:block xl:h-auto',
                  )}
                  initial={textConfig2.initial}
                  animate={textConfig2.animate}
                  transition={textConfig2.transition}
                >
                  <Text variant={TextVariant.Body}>{subtitle}</Text>
                </motion.div>
              </motion.div>
              {carouselControls}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type BlogCardProps = {
  title: string;
  subtitle: string;
  href: string;
  backgroundImage: string;
  className?: string;
  carouselControls?: React.ReactNode;
};

function BlogCard({
  title,
  subtitle,
  backgroundImage,
  href,
  className = '',
  slideNumber,
  animationKey,
  brightness,
  contrast,
  carouselControls,
}: BlogCardProps & {
  slideNumber: number;
  animationKey: number;
  brightness: number;
  contrast: number;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith('https') ? '_blank' : '_self'}
      className={classNames('relative flex h-full w-full flex-col overflow-hidden', className)}
    >
      <BlogCardContent
        title={title}
        subtitle={subtitle}
        slideNumber={slideNumber}
        animationKey={animationKey}
      />
      <BlogCardImage
        backgroundImage={backgroundImage}
        title={title}
        brightness={brightness}
        contrast={contrast}
        shader={false}
      />
    </Link>
  );
}

const easeFn = cubicBezier(0.4, 0, 0.2, 1);

export const blogCardTransition = {
  duration: 0.24,
  ease: easeFn,
};

const textConfig1 = {
  transition: {
    ...blogCardTransition,
    delay: 0.04,
  },
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const textConfig2 = {
  transition: {
    ...blogCardTransition,
    delay: 0.08,
  },
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

const textVariants: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
