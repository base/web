import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';

type IconSwapProps = {
  success: boolean;
  backgroundColor?: string;
  icon?: ReactNode;
};

export function IconSwap({
  success,
  backgroundColor = '#0052FF',
  icon = <EthereumIcon />,
}: IconSwapProps) {
  const successColor = '#27AD75';
  return (
    <motion.div
      initial={false}
      animate={{ backgroundColor: success ? successColor : backgroundColor }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
      className="aspect-square w-full rounded-full"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {success ? (
          <motion.div
            key="check"
            className="flex h-full w-full items-center justify-center"
            initial={{ opacity: 0, y: 0, scale: 0.5, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 0, scale: 0.9, filter: 'blur(3px)' }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.6, delay: 0 }}
          >
            <CheckIcon />
          </motion.div>
        ) : (
          <motion.div
            key="eth"
            className="flex h-full w-full items-center justify-center"
            initial={{ opacity: 0, y: 0, scale: 0.9, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 0, scale: 0.9, filter: 'blur(3px)' }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.6, delay: 0 }}
          >
            {icon}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <div className="flex size-full items-center justify-center p-5">
      <svg
        width="25"
        height="20"
        className="h-full w-full"
        viewBox="0 0 25 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_i_1606_1241)">
          <path
            d="M20.9798 3.40527L19.216 5.16909L15.6883 8.69673L8.63307 15.752L5.64576 12.765L4.1521 11.2715L3.40527 10.5247"
            stroke="white"
            stroke-width="6.8106"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_i_1606_1241"
            x="0"
            y="-1.29726"
            width="24.385"
            height="20.4545"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-1.29726" />
            <feGaussianBlur stdDeviation="1.88102" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.168627 0 0 0 0 0.635294 0 0 0 0 0.984314 0 0 0 0.25 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1606_1241" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function EthereumIcon() {
  return (
    <svg
      width="40"
      height="40"
      className="size-full"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.9978 5V15.6277L28.7443 19.6416L19.9978 5Z" fill="white" fill-opacity="0.602" />
      <path d="M19.9977 5L11.25 19.6416L19.9977 15.6277V5Z" fill="white" />
      <path
        d="M19.9978 26.5289V33.7502L28.7501 21.3145L19.9978 26.5289Z"
        fill="white"
        fill-opacity="0.602"
      />
      <path d="M19.9977 33.7502V26.5277L11.25 21.3145L19.9977 33.7502Z" fill="white" />
      <path
        d="M19.9978 24.857L28.7443 19.6413L19.9978 15.6299V24.857Z"
        fill="white"
        fill-opacity="0.2"
      />
      <path
        d="M11.25 19.6413L19.9977 24.857V15.6299L11.25 19.6413Z"
        fill="white"
        fill-opacity="0.602"
      />
    </svg>
  );
}
