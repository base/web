import { motion } from 'motion/react';

import { Globe } from './Globe';

export function BaseAppSendGlobe() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ocspink " />
      <div className="absolute left-1/2 top-0 h-full w-px translate-x-1/2 bg-ocspink" /> */}

      <div className="relative flex aspect-[1/1] w-full items-center justify-center">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.5, 0.5, 1],
            // @ts-expect-error - z-index is not a valid property for motion.div
            'z-index': [20, 20, 9, 9, 20, 20],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            times: [0, 0.5, 0.8, 1],
            repeatDelay: 3,
            delay: 0.5,
          }}
          className="absolute"
        >
          <motion.div
            animate={{ scale: [1.5, 1, 1.5] }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1,
              times: [0, 0.3, 0.8, 1],
            }}
            className="w-[72px]"
          >
            <svg
              style={{ filter: 'drop-shadow(0 0 10px rgba(32 207 39 / 0.56))' }}
              width="31"
              height="31"
              className="size-full"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2568 1.35183C26.7247 0.147213 30.0527 3.47524 28.8481 6.94308L22.1768 26.1503C20.714 30.3606 14.6345 29.9672 13.7261 25.6034L12.2994 18.7519C12.2103 18.324 11.8759 17.9896 11.448 17.9005L4.59653 16.4738C0.232831 15.5653 -0.160151 9.48645 4.05031 8.02377L23.2568 1.35183Z"
                fill="url(#paint0_linear_1616_1294)"
                stroke="white"
                stroke-width="2.19648"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1616_1294"
                  x1="27.0284"
                  y1="3.17192"
                  x2="9.41623"
                  y2="20.7841"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#45C7FF" />
                  <stop offset="1" stop-color="#30CE1F" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
        <motion.div
          animate={{
            scale: [0, 1, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="relative z-10 aspect-[1/1] w-full max-w-[600px] opacity-90"
        >
          <Globe />
        </motion.div>
      </div>
    </div>
  );
}
