'use client';
import { useEffect, useState } from 'react';
import { animate, useMotionValue, useTransform, motion } from 'motion/react';
import { TextMorph } from 'torph/react';
import { RollingText } from 'apps/web/src/components/base-org/RollingText/RollingText';
import { RollingTextUpdate } from 'apps/web/src/components/base-org/RollingText/RollingTextUpdate';
import { AnimatePresence } from 'framer-motion';

type Props = {
  triggerCount?: number;
};

export function BuyButton({ triggerCount = 0 }: Props) {
  const [isFinished, setIsFinished] = useState(false);
  const [buttonText, setButtonText] = useState('Buy');
  const scaleMV = useMotionValue(1);
  const scale = useTransform(scaleMV, (v) => v);

  useEffect(() => {
    if (triggerCount === 0) return;

    setIsFinished(false);
    setButtonText('Buy');

    const buyTimeout = setTimeout(() => {
      triggerClick();
      setTimeout(() => {
        setIsFinished(true);
        setButtonText('Buying');
      }, 200);
    }, 1500);
    return () => clearTimeout(buyTimeout);
  }, [triggerCount, scaleMV]);

  function triggerClick() {
    scaleMV.set(0.95);
    setTimeout(() => scaleMV.set(1), 200);
  }

  return (
    <motion.div
      style={{ scale }}
      className="relative w-full rounded-full bg-[#EEF0F3] p-1 spring-bounce-20 spring-duration-200"
    >
      <motion.div
        style={{ backgroundColor: isFinished ? '#66C800' : '#0000ff' }}
        className="w-full rounded-full bg-base-gray-50 px-2 py-4 text-white"
      >
        <button className="flex w-full items-center justify-center gap-2 font-sans text-base">
          <AnimatePresence>
            {isFinished && (
              <motion.div
                key="spinner-slot"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 20, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex shrink-0 items-center justify-center overflow-hidden"
              >
                <Spinner strokeWidth={3} />
              </motion.div>
            )}
          </AnimatePresence>
          {/* <RollingText from="Buy" to="Buying" active={isFinished} /> for 50 USDC */}
          <span>
            <RollingTextUpdate text={buttonText} /> for 50 USDC
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}

function Spinner({ strokeWidth }: { strokeWidth: number }) {
  return (
    <div className="relative inline-block h-5 w-5">
      <svg
        width="20"
        height="20"
        className="h-full w-full animate-spin duration-300"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="10"
          cy="10"
          r={10 - strokeWidth / 2}
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="10"
          cy="10"
          r={10 - strokeWidth / 2}
          stroke="white"
          strokeWidth={strokeWidth}
          strokeMiterlimit="1.52166"
          strokeDasharray="14.137 42.411"
        />
      </svg>
    </div>
  );
}
