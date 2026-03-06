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

  const [scaleDelay, setScaleDelay] = useState(0);
  const [checkEnterDelay, setCheckEnterDelay] = useState(0);
  const [buttonScale, setButtonScale] = useState(1);

  useEffect(() => {
    if (success) {
      setCheckEnterDelay(0);
      const pressStart = setTimeout(() => setButtonScale(0.9), 1200);
      const pressEnd = setTimeout(() => setButtonScale(1), 1400);
      return () => {
        clearTimeout(pressStart);
        clearTimeout(pressEnd);
      };
    } else {
      setButtonScale(1);
      setCheckEnterDelay(1.4);
    }
  }, [success]);

  return (
    <motion.div
      id="icon-swap-wrapper"
      style={{ scale: buttonScale }}
      className="spring-bounce-30 spring-duration-500"
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
              transition={{
                type: 'spring',
                bounce: 0.3,
                duration: 0.6,
                delay: checkEnterDelay,
              }}
            >
              <CheckIcon delay={checkEnterDelay} />
            </motion.div>
          ) : (
            <motion.div
              key="eth"
              className="flex h-full w-full items-center justify-center"
              initial={{ opacity: 0, y: 0, scale: 0.9, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 0, scale: 0.9, filter: 'blur(3px)' }}
              transition={{
                type: 'spring',
                bounce: 0.3,
                duration: 0.6,
                delay: checkEnterDelay,
              }}
            >
              {icon}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function CheckIcon({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex size-full items-center justify-center p-5">
      <svg
        width="25"
        height="20"
        className="size-full"
        viewBox="0 0 25 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          pathLength={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.6, delay: delay }}
          d="M3.40527 10.5247L8.63307 15.752L20.9798 3.40527"
          stroke="white"
          strokeWidth="6.8106"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
