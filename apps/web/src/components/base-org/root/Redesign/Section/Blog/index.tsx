'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, Variants, cubicBezier } from 'motion/react';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import {
  BlogPost,
  blogPosts,
} from 'apps/web/src/components/base-org/root/Redesign/Section/Blog/BlogPosts';
import classNames from 'classnames';
import { levelStyles } from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { variantStyles } from 'apps/web/src/components/base-org/typography/TextRedesign';

import AnimatedButton from 'apps/web/src/components/Button/AnimatedButton';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Link from 'apps/web/src/components/Link';
import { BlogCardImage } from 'apps/web/src/components/base-org/root/Redesign/Section/Blog/BlogCardImage';

export function SectionBlog() {
  return (
    <Section content={content}>
      <BlogCarousel />

      <Link href="https://blog.base.org">
        <AnimatedButton text="Read more" />
      </Link>
    </Section>
  );
}

const content = {
  title: 'Read the latest from Base',
};

function BlogCarouselControls({
  displayedPosts,
  currentIndex,
  onDotClick,
}: {
  displayedPosts: BlogPost[];
  currentIndex: number;
  onDotClick: (index: number) => () => void;
}) {
  return (
    <motion.div
      className="absolute bottom-4 left-4 z-30 md:bottom-[52px] md:left-auto md:right-6 xl:bottom-[48px] xl:right-12"
      variants={controlsVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex gap-3">
        {displayedPosts.map((post, index) => (
          <motion.button
            key={post.title}
            onClick={onDotClick(index)}
            className="relative w-10 h-10 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <motion.div
              animate={getBackgroundColor(index === currentIndex)}
              transition={blogCardTransition}
              className={classNames(
                'flex h-full w-full items-center justify-center rounded-sm border',
                {
                  'border-base-gray-150': index !== currentIndex,
                  'border-base-blue': index === currentIndex,
                },
              )}
            >
              <motion.span
                className={variantStyles['body-mono']}
                animate={getTextColor(index === currentIndex)}
                transition={blogCardTransition}
              >
                {(index + 1).toString().padStart(2, '0')}
              </motion.span>
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function BlogCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayedPosts = blogPosts.slice(0, 5);

  const handleDotClick = useCallback(
    (newIndex: number) => () => {
      setCurrentIndex(newIndex);
    },
    [],
  );

  const currentPost = displayedPosts[currentIndex];

  return (
    <div className="overflow-hidden relative col-span-full rounded-lg">
      {/* blog card container */}
      <div className="0-h-[400px] 0-md:h-[500px] 0-lg:h-[700px] relative col-span-full">
        <BlogCard
          title={currentPost.title}
          subtitle={currentPost.subtitle}
          href={currentPost.href}
          backgroundImage={currentPost.previewImage}
          slideNumber={currentIndex + 1}
          animationKey={currentIndex}
          brightness={currentPost.brightness}
          contrast={currentPost.contrast}
        />
      </div>

      {/* controls */}
      <BlogCarouselControls
        displayedPosts={displayedPosts}
        currentIndex={currentIndex}
        onDotClick={handleDotClick}
      />
    </div>
  );
}

type BlogCardProps = {
  title: string;
  subtitle: string;
  href: string;
  backgroundImage: string;
  className?: string;
};

function BlogCardSlideNumber({ slideNumber }: { slideNumber: number }) {
  return (
    <div className="hidden absolute left-0 -top-12 justify-center items-center w-12 h-12 rounded-tr-md bg-base-gray-25 xl:flex">
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
}: {
  title: string;
  subtitle: string;
  slideNumber: number;
  animationKey: number;
}) {
  return (
    <div className="relative flex flex-[3] bg-base-gray-25 md:flex-none">
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
          <div className="p-4 pt-8 w-full sm:pt-12 md:px-6 md:py-12 xl:px-12">
            <div className="flex justify-between items-end">
              {/* text */}
              <div className="flex flex-1 flex-col gap-4 md:max-w-[380px] lg:max-w-[420px] xl:h-36 xl:max-w-[600px]">
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
                    'hidden text-pretty !text-base-gray-200 xl:line-clamp-3 xl:block xl:h-auto',
                  )}
                  initial={textConfig2.initial}
                  animate={textConfig2.animate}
                  transition={textConfig2.transition}
                >
                  <Text variant={TextVariant.Body}>{subtitle}</Text>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

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
      className={classNames('flex overflow-hidden relative flex-col w-full h-full', className)}
    >
      <BlogCardImage
        backgroundImage={backgroundImage}
        title={title}
        brightness={brightness}
        contrast={contrast}
        shader={false}
      />
      <BlogCardContent
        title={title}
        subtitle={subtitle}
        slideNumber={slideNumber}
        animationKey={animationKey}
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

const getBackgroundColor = (isActive: boolean) => ({
  backgroundColor: isActive ? '#0000ff' : 'transparent',
});

const getTextColor = (isActive: boolean) => ({
  color: isActive ? '#ffffff' : '#0a0b0d',
});

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

const controlsVariants: Variants = {
  visible: {
    transition: blogCardTransition,
  },
};
