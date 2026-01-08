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
            {/* <svg
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 0px #008c38)'
                  : 'drop-shadow(0 0 0px #008c3800)',
              }}
              className="transition-all duration-300"
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
            </svg> */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="fill-base-gray-200 group-hover:fill-[#008c38]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.5423 3C17.2131 3.00013 21 6.80071 21 11.4888C20.9999 16.1768 17.213 19.9774 12.5423 19.9775C11.1672 19.9775 9.8699 19.6452 8.72217 19.0608L6.54963 19.8761C5.03524 20.4439 3.55776 18.9612 4.1234 17.4412L4.94721 15.2259C4.39539 14.0982 4.08468 12.8299 4.08465 11.4888C4.08465 6.80066 7.87151 3.00004 12.5423 3ZM12.5423 4.88885C8.92189 4.8889 5.97398 7.83689 5.97398 11.4888C5.974 12.5353 6.21623 13.5204 6.64465 14.3958C6.87209 14.8608 6.89884 15.3993 6.71845 15.8844L5.89464 18.0998L5.89187 18.1044L8.05795 17.2928L8.24707 17.2328C8.69181 17.1173 9.16664 17.167 9.58011 17.3776C10.4712 17.8313 11.4754 18.0887 12.5423 18.0887C16.0494 18.0886 18.9259 15.322 19.1024 11.8291L19.1107 11.4888C19.1107 7.83693 16.1627 4.88899 12.5423 4.88885Z" />
              <path d="M12.542 3C17.2127 3.00013 21 6.8012 21 11.4893L20.9893 11.9258C20.7626 16.4107 17.0667 19.9774 12.542 19.9775V19.7773C17.1014 19.7772 20.7995 16.0673 20.7998 11.4893L20.7891 11.0625C20.568 6.68238 16.9592 3.20032 12.542 3.2002C7.98247 3.20042 4.28418 6.91102 4.28418 11.4893C4.28427 12.7989 4.58832 14.0369 5.12695 15.1377C5.15105 15.1869 5.15387 15.2445 5.13476 15.2959L4.31054 17.5107C3.80403 18.8718 5.12746 20.1954 6.47949 19.6885L8.65234 18.873L8.69238 18.8633C8.7332 18.8571 8.77508 18.8638 8.8125 18.8828C9.93298 19.4534 11.1996 19.7773 12.542 19.7773V19.9775C11.1672 19.9775 9.87022 19.6449 8.72265 19.0605L6.5498 19.876L6.4082 19.9238C4.99251 20.338 3.66412 19.0049 4.07617 17.584L4.12304 17.4414L4.94726 15.2256C4.46449 14.239 4.16567 13.1448 4.09863 11.9883L4.08496 11.4893C4.08496 6.80126 7.87133 3.00023 12.542 3ZM12.542 4.68848C16.2734 4.68862 19.3105 7.72757 19.3105 11.4893V11.4932L19.3027 11.834L19.3018 11.8389C19.12 15.4371 16.1567 18.2889 12.542 18.2891C11.4426 18.289 10.4074 18.0231 9.48925 17.5557C9.12074 17.368 8.69754 17.3236 8.30078 17.4258L8.12695 17.4795L8.12793 17.4805L5.96191 18.292C5.88236 18.3217 5.79266 18.2976 5.73828 18.2324C5.69066 18.1752 5.68079 18.0978 5.708 18.0303H5.70703L6.53125 15.8145C6.6924 15.3808 6.66816 14.899 6.46484 14.4834C6.02354 13.5815 5.77451 12.5667 5.77441 11.4893C5.77441 7.72766 8.81062 4.6887 12.542 4.68848ZM5.98535 11.8779C6.03754 12.7795 6.26971 13.6295 6.64453 14.3955C6.87197 14.8605 6.89914 15.3996 6.71875 15.8848L5.89453 18.0996L5.8916 18.1045L8.05761 17.293L8.24707 17.2324C8.69178 17.117 9.16663 17.1674 9.58007 17.3779C10.3598 17.7749 11.2263 18.0217 12.1455 18.0771L12.542 18.0889C16.0491 18.0887 18.9261 15.322 19.1025 11.8291L19.1103 11.4893C19.1103 7.83741 16.1623 4.88881 12.542 4.88867C8.9217 4.8889 5.97363 7.83749 5.97363 11.4893L5.98535 11.8779Z" />
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
            {/* pulse */}
            {/* <svg
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
            </svg> */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="fill-base-gray-200 group-hover:fill-[#005eff]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 17.9999C20.5523 17.9999 21 18.4476 21 18.9999C20.9999 19.5521 20.5523 19.9999 20 19.9999H4C3.44775 19.9999 3.00005 19.5521 3 18.9999C3 18.4476 3.44772 17.9999 4 17.9999H20Z" />
              <path d="M19.2568 5.33096C19.6263 4.9205 20.2585 4.8873 20.6689 5.25674C21.0794 5.62621 21.1126 6.25837 20.7432 6.66885L16.2432 11.6688L16.2334 11.6796L16.2246 11.6894L15.2139 12.7499C14.0085 14.0154 11.9807 13.9874 10.8115 12.6884L9.29785 11.0067C8.89108 10.5548 8.17854 10.567 7.78809 11.0331L4.7666 14.6415C4.41211 15.0649 3.78185 15.1209 3.3584 14.7665C2.93499 14.412 2.87903 13.7818 3.2334 13.3583L6.25391 9.7499C7.42513 8.35094 9.56364 8.3127 10.7842 9.66885L12.2979 11.3505C12.6876 11.7834 13.3638 11.7928 13.7656 11.371L14.7754 10.3105L19.2568 5.33096Z" />
            </svg>

            <span className="w-12">
              <AnimatedCount
                initialCount={100}
                targetCount={20}
                isActive={isHovered}
                prefix="$"
                suffix={isHovered ? 'k' : ''}
              />
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* heart */}
            {/* <svg
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 0px #FF2728)'
                  : 'drop-shadow(0 0 0px #FF272800)',
              }}
              className="transition-all duration-300 group-hover:scale-100"
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
            </svg> */}

            <svg
              width="24"
              height="24"
              style={{
                fill: isHovered ? 'linear-gradient(to right, #FF2728, #FF2728)' : '',
              }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-base-gray-200 group-hover:fill-[#FF2728]"
            >
              <path d="M11.9346 4.82812C14.6045 3.17938 17.7364 3.80394 19.749 5.66602L19.8926 5.79883L19.7109 5.87402L17.8154 6.64941L17.7559 6.67383L17.7012 6.63867C16.1996 5.67241 14.2109 5.58444 12.5693 6.85645L12.0361 7.26953L11.9619 7.32715L11.8857 7.27051L11.3438 6.86914C9.34777 5.39188 6.93546 5.76597 5.41992 7.25977C4.60279 8.06602 4.23839 9.34234 4.47852 10.8311C4.71787 12.3133 5.5543 13.9286 7.01367 15.2461C8.84671 16.8828 10.403 17.7981 11.4043 18.2949C11.7468 18.4648 12.1485 18.4649 12.4902 18.2959C12.6433 18.22 12.81 18.1324 12.9893 18.0352L13.0713 17.9902L13.1367 18.0566L14.4482 19.3643L14.5635 19.4785L14.4219 19.5605C14.0429 19.7804 13.6986 19.9649 13.3936 20.1162C12.4822 20.5679 11.4122 20.5668 10.502 20.1152C9.35591 19.5466 7.64671 18.5343 5.66602 16.7666L5.65723 16.7598L5.6582 16.7588C3.87714 15.1531 2.79112 13.1274 2.47266 11.1543C2.15533 9.18701 2.59831 7.18969 3.99512 5.8125C6.01275 3.824 9.19646 3.20547 11.9346 4.82812ZM18.1914 7.89941C18.3933 7.37662 18.9809 7.11627 19.5039 7.31738C19.9943 7.50647 20.2545 8.03483 20.1191 8.53125L20.0869 8.62988L19.9893 8.87988C20.0699 8.93048 20.1501 8.98438 20.2285 9.04297C20.6891 9.38747 21.0485 9.82732 21.3535 10.375C21.626 10.865 21.4497 11.483 20.96 11.7559C20.4699 12.0286 19.851 11.8523 19.5781 11.3623C19.3825 11.0112 19.1989 10.8099 19.0117 10.6699C18.8179 10.5251 18.5636 10.4031 18.165 10.2842C17.7188 10.1512 17.1287 10.1752 16.7148 10.3516C16.5193 10.435 16.415 10.5303 16.3662 10.6006C16.3292 10.6541 16.2913 10.7375 16.3105 10.9053C16.3192 10.9801 16.339 11.0395 16.376 11.0957C16.4141 11.1536 16.4753 11.2157 16.5771 11.2871C16.8203 11.4573 17.1673 11.595 17.6689 11.7793C18.1105 11.9415 18.7118 12.1523 19.2061 12.4707C19.7393 12.8145 20.2567 13.3517 20.3926 14.1914C20.5077 14.9045 20.3573 15.5588 19.9883 16.0938C19.6338 16.6072 19.1236 16.9456 18.6152 17.1572C18.0367 17.398 17.3767 17.5069 16.7383 17.4971L16.5723 17.8916V17.8926C16.3537 18.4088 15.7576 18.6507 15.2412 18.4326C14.7248 18.2141 14.4829 17.6171 14.7012 17.1006L14.748 16.9873C13.9866 16.558 13.228 15.8229 12.8555 14.8545L12.7832 14.6484C12.6144 14.114 12.9109 13.5425 13.4453 13.373C13.9798 13.204 14.5501 13.5012 14.7197 14.0352C14.8195 14.3499 15.0265 14.6402 15.2754 14.874C15.5246 15.108 15.8093 15.2785 16.0547 15.3594C16.5557 15.5242 17.293 15.5068 17.835 15.2812C18.094 15.1734 18.2431 15.0457 18.3164 14.9395C18.3748 14.8546 18.4229 14.7345 18.3877 14.5156C18.3791 14.463 18.3622 14.4161 18.3252 14.3662C18.2862 14.3139 18.2199 14.2525 18.1055 14.1787C17.8414 14.0086 17.4826 13.8753 16.9688 13.6865C16.5147 13.5197 15.9094 13.2984 15.4121 12.9502H15.4111C14.8694 12.5704 14.3921 11.9945 14.293 11.1387C14.2198 10.505 14.364 9.92311 14.6953 9.44434C15.0152 8.98226 15.466 8.67583 15.917 8.4834C16.5825 8.19954 17.3606 8.1166 18.0732 8.20215L18.1914 7.89941Z" />
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
