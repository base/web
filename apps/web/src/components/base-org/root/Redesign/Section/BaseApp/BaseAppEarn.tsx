import { motion, spring } from 'motion/react';
import { itemContentVariants } from '..';
import { useState, useEffect } from 'react';
import NumberFlow from '@number-flow/react';
import Image from 'next/image';
import { ImageType } from 'apps/web/src/components/base-org/root/Redesign/Section';

import ImageAsset1 from './social-img.png';
const img1 = ImageAsset1 as ImageType;

export function BaseAppEarn() {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(0);
  const targetCount = 14200;

  useEffect(() => {
    if (isHovered) {
      // Reset count when hover starts
      setCount(0);

      // Animate count from 0 to target
      const duration = 2000; // 2 seconds
      const startTime = Date.now();

      const animateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * targetCount);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isHovered]);

  return (
    <div
      className="group relative flex h-full w-full items-center justify-center p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute flex h-full w-full items-center justify-center">
        <svg
          width="241"
          height="233"
          className="h-full w-full"
          viewBox="-20 -20 281 273"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="227"
            cy="14"
            r="14"
            fill="#66C800"
            fillOpacity="0.2"
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? 0.4 : 0.0,
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: 'easeInOut',
              },
              opacity: {
                delay: isHovered ? 0.9 : 0,
                duration: 0.5,
                ease: 'easeOut',
              },
            }}
          />
          <motion.path
            d="M1.75 231.25L12.75 190.25H32.75L43.25 158.25L62.25 136.25H85.25L115.75 87.25L149.25 80.75L227.25 13.75"
            stroke="#66C800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="600"
            animate={{
              strokeDashoffset: isHovered ? 0 : 700,
              filter: isHovered ? 'drop-shadow(0 0 8px #66C800)' : 'drop-shadow(0 0 0px #66C80000)',
            }}
            transition={{
              strokeDashoffset: {
                duration: 2.5,
                ease: 'easeOut',
              },
              filter: {
                duration: 0.3,
                ease: 'easeOut',
              },
            }}
          />
          <motion.circle
            cx="227"
            cy="14"
            r="5"
            fill="#66C800"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? [1, 1, 1.2, 1] : 0,
              opacity: isHovered ? 1 : 0,
              filter: isHovered ? 'drop-shadow(0 0 6px #66C800)' : 'drop-shadow(0 0 0px #66C80000)',
            }}
            transition={{
              scale: {
                duration: 0.6,
                delay: isHovered ? 0.9 : 0, // Appears after line finishes (2.5s)
                times: [0, 0.3, 0.7, 1], // Quick scale up, then pulse
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.9, // Pause between pulses
                ease: 'easeInOut',
              },
              opacity: {
                duration: 0.3,
                delay: isHovered ? 0.5 : 0,
                ease: 'easeOut',
              },
              filter: {
                duration: 0.3,
                delay: isHovered ? 2.5 : 0,
                ease: 'easeOut',
              },
            }}
          />
        </svg>
      </div>

      <div
        style={{ backdropFilter: 'blur(6px)' }}
        className="flex scale-95 flex-col gap-4 rounded-md bg-white/60 p-2 text-lg transition-all duration-300 group-hover:scale-100"
      >
        <div className="flex gap-3 text-base-gray-200">
          <div className="flex items-center gap-2">
            {/* repost */}
            <svg
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 0px #008c38)'
                  : 'drop-shadow(0 0 0px #008c3800)',
              }}
              className="transition-all duration-300 group-hover:rotate-[540deg]"
              width="24"
              height="20"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-base-gray-200 group-hover:fill-[#008c38]"
                d="M6.22018 4.85153C7.59585 3.18992 9.6743 2.13135 12 2.13135C16.1421 2.13135 19.5 5.48921 19.5 9.63135L17 9.63135L20.5 13.6313L24 9.63135H21.5C21.5 4.38464 17.2467 0.131348 12 0.131348C9.12213 0.131348 6.54315 1.411 4.801 3.43235L6.22018 4.85153Z"
              />
              <path
                className="fill-base-gray-200 group-hover:fill-[#008c38]"
                d="M12 17.1313C14.3257 17.1313 16.4042 16.0728 17.7798 14.4112L19.199 15.8303C17.4569 17.8517 14.8779 19.1313 12 19.1313C6.75329 19.1313 2.5 14.8781 2.5 9.63135H0L3.5 5.63135L7 9.63135L4.5 9.63135C4.5 13.7735 7.85786 17.1313 12 17.1313Z"
              />
            </svg>
            <span className="w-6">
              <AnimatedCount
                initialCount={6}
                targetCount={24}
                isActive={isHovered}
                prefix=""
                suffix=""
              />
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* heart */}
            <svg
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 0px #FF2728)'
                  : 'drop-shadow(0 0 0px #FF272800)',
              }}
              className="transition-all duration-300 group-hover:scale-110"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66823 9.52364L9.99896 18L18.338 9.52364C20.554 7.34727 20.554 3.81273 18.338 1.63636C17.8132 1.12091 17.1884 0.703636 16.4969 0.425454C15.8055 0.139091 15.0724 0 14.3226 0C13.5728 0 12.8397 0.139091 12.1483 0.425454C11.4568 0.703636 10.832 1.12091 10.3072 1.63636L9.99896 1.93091L9.69905 1.63636C9.17422 1.12091 8.54941 0.703636 7.85796 0.425454C7.16651 0.147273 6.43341 0 5.68364 0C4.93387 0 4.20077 0.147273 3.50932 0.425454C2.81787 0.703636 2.19306 1.12091 1.66823 1.63636C-0.556076 3.80455 -0.556076 7.34727 1.66823 9.52364ZM9.99967 15.1475L3.08093 8.10778L3.06695 8.0941C1.64284 6.70068 1.64677 4.45027 3.06427 3.06854L3.06963 3.06327C3.41461 2.72446 3.81906 2.45663 4.25581 2.28092C4.71821 2.09489 5.1984 2 5.68364 2C6.16888 2 6.64907 2.09489 7.11148 2.28092C7.54822 2.45663 7.95268 2.72447 8.29765 3.06327L9.9799 4.71545L11.6988 3.07287L11.7086 3.06327C12.0536 2.72446 12.458 2.45663 12.8948 2.28092L12.9042 2.27714L12.9136 2.27326C13.3511 2.09204 13.823 2 14.3226 2C14.8222 2 15.2941 2.09204 15.7317 2.27326L15.741 2.27714L15.7504 2.28092C16.1872 2.45663 16.5916 2.72446 16.9366 3.06327C18.3545 4.45577 18.3545 6.70423 16.9366 8.09673L16.9244 8.10877L9.99967 15.1475Z"
                fill="#717886"
              />
              <path
                className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                d="M1.66823 9.52364L9.99896 18L18.338 9.52364C20.554 7.34727 20.554 3.81273 18.338 1.63636C17.8132 1.12091 17.1884 0.703636 16.4969 0.425454C15.8055 0.139091 15.0724 0 14.3226 0C13.5728 0 12.8397 0.139091 12.1483 0.425454C11.4568 0.703636 10.832 1.12091 10.3072 1.63636L9.99896 1.93091L9.69905 1.63636C9.17422 1.12091 8.54941 0.703636 7.85796 0.425454C7.16651 0.147273 6.43341 0 5.68364 0C4.93387 0 4.20077 0.147273 3.50932 0.425454C2.81787 0.703636 2.19306 1.12091 1.66823 1.63636C-0.556076 3.80455 -0.556076 7.34727 1.66823 9.52364Z"
                fill="#FF2728"
              />
            </svg>

            <span className="w-6">
              <AnimatedCount
                initialCount={12}
                targetCount={95}
                isActive={isHovered}
                prefix=""
                suffix=""
              />
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* pulse */}
            <svg
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 0px #005eff)'
                  : 'drop-shadow(0 0 0px #005eff00)',
              }}
              width="22"
              className="transition-all duration-300 group-hover:scale-110"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-base-gray-200 group-hover:fill-[#005eff]"
                d="M13.9942 3.62856L8.93633 17.1163L7.0694 17.1312L4.17198 9.76519H0V7.76519L5.53444 7.76514L7.97772 13.9766L13.0637 0.414062L14.9377 0.417837L17.6593 7.76518H22V9.76519L16.2673 9.76519L13.9942 3.62856Z"
              />
            </svg>
            <span className="">
              <AnimatedCount
                initialCount={100}
                targetCount={20}
                isActive={isHovered}
                prefix="$"
                suffix={isHovered ? 'k' : ''}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AnimatedCountProps {
  targetCount: number;
  duration?: number;
  isActive: boolean;
  initialCount?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

function AnimatedCount({
  targetCount,
  initialCount = 0,
  duration = 600,
  isActive,
  className = '',
  prefix = '',
  suffix = '',
}: AnimatedCountProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (isActive) {
      // Reset count when animation starts
      // setCount(0);

      setCount(targetCount);

      // // Animate count from 0 to target
      // const startTime = Date.now();

      // const animateCount = () => {
      //   const elapsed = Date.now() - startTime;
      //   const progress = Math.min(elapsed / duration, 1);

      //   // Use easing function for smooth animation
      //   const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      //   const currentCount = Math.floor(easeOutQuart * targetCount);

      //   setCount(currentCount);

      //   if (progress < 1) {
      //     requestAnimationFrame(animateCount);
      //   }
      // };

      // requestAnimationFrame(animateCount);
    } else {
      setCount(initialCount);
    }
  }, [isActive, targetCount, duration]);

  return (
    <span>
      <NumberFlow prefix={prefix} suffix={suffix} willChange value={count} locales="en-US" />
    </span>
  );
}
