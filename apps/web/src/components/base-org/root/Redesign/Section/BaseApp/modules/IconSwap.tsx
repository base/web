import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';

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
  const successColor = '#00DA00';

  function hexToHsl(hex: string) {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    const d = max - min;

    if (d !== 0) {
      s = d / (1 - Math.abs(2 * l - 1));
      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }
      h *= 60;
    }

    return {
      h, // 0-360
      s: s * 100, // 0-100
      l: l * 100, // 0-100
    };
  }

  const baseHex = success ? successColor : backgroundColor;
  const hsl = hexToHsl(baseHex);
  const hslLightString = `hsl(${hsl.h}, ${Math.min(hsl.s + 10, 100)}%, ${Math.min(
    hsl.l + 30,
    100,
  )}%)`;
  const hslDarkString = `hsl(${hsl.h}, ${hsl.s}%, ${Math.max(hsl.l - 5, 0)}%)`;

  const [checkEnterDelay, setCheckEnterDelay] = useState(0);

  useEffect(() => {
    if (success) {
      console.log('success');
      setCheckEnterDelay(0);
      console.log('checkEnterDelay', checkEnterDelay);
    } else {
      setCheckEnterDelay(0.4);
    }
  }, [success]);

  return (
    <motion.div
      id="icon-swap-wrapper"
      initial={{ scale: 1 }}
      animate={success ? { scale: [1, 0.9, 1] } : { scale: 1 }}
      exit={{ scale: 1 }}
      transition={{ type: 'ease', bounce: 0.35, duration: 0.4, delay: checkEnterDelay - 0.2 }}
    >
      <motion.div
        initial={false}
        animate={{ backgroundColor: success ? successColor : backgroundColor }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.6, delay: checkEnterDelay }}
        className="aspect-square w-full rounded-full"
        // style={{
        //   boxShadow: `inset 0 2px 8px -2px ${hslLightString}, inset 0 -2px 8px 1px ${hslDarkString}`,
        // }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {success ? (
            <motion.div
              key="check"
              className="flex h-full w-full items-center justify-center"
              initial={{ opacity: 0, y: 0, scale: 0.5, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 0, scale: 0.9, filter: 'blur(3px)' }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6, delay: checkEnterDelay }}
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
              transition={{ type: 'spring', bounce: 0.3, duration: 0.6, delay: checkEnterDelay }}
            >
              {icon}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
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
            strokeWidth="6.8106"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            colorInterpolationFilters="sRGB"
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
      <path d="M19.9978 5V15.6277L28.7443 19.6416L19.9978 5Z" fill="white" fillOpacity="0.602" />
      <path d="M19.9977 5L11.25 19.6416L19.9977 15.6277V5Z" fill="white" />
      <path
        d="M19.9978 26.5289V33.7502L28.7501 21.3145L19.9978 26.5289Z"
        fill="white"
        fillOpacity="0.602"
      />
      <path d="M19.9977 33.7502V26.5277L11.25 21.3145L19.9977 33.7502Z" fill="white" />
      <path
        d="M19.9978 24.857L28.7443 19.6413L19.9978 15.6299V24.857Z"
        fill="white"
        fillOpacity="0.2"
      />
      <path
        d="M11.25 19.6413L19.9977 24.857V15.6299L11.25 19.6413Z"
        fill="white"
        fillOpacity="0.602"
      />
    </svg>
  );
}
