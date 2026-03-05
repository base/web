'use client';
import { useEffect, useState } from 'react';
import { animate, useMotionValue, useTransform, motion } from 'motion/react';
import { TextMorph } from 'torph/react';

type Props = {
  triggerCount?: number;
};

export function BuyButton({ triggerCount = 0 }: Props) {
  const [isFinished, setIsFinished] = useState(false);
  const scaleMV = useMotionValue(1);
  const scale = useTransform(scaleMV, (v) => v);

  useEffect(() => {
    if (triggerCount === 0) return;

    setIsFinished(false);

    const buyTimeout = setTimeout(() => {
      triggerClick();
      setTimeout(() => setIsFinished(true), 200);
    }, 1500);
    return () => clearTimeout(buyTimeout);
  }, [triggerCount, scaleMV]);

  function triggerClick() {
    scaleMV.set(0.95);
    setTimeout(() => scaleMV.set(1), 200);
  }

  const buttonText = isFinished ? 'Bought for 50 USDC' : 'Buy for 50 USDC';

  return (
    <motion.div
      style={{ scale }}
      className="relative w-full rounded-full bg-[#EEF0F3] p-1 spring-bounce-20 spring-duration-200"
    >
      <motion.div
        style={{ backgroundColor: isFinished ? '#66C800' : '#0000ff' }}
        className="w-full rounded-full bg-base-gray-50 px-2 py-4 text-white"
      >
        <button className="w-full font-sans text-base">
          <TextMorph duration={600}>{buttonText}</TextMorph>
        </button>
      </motion.div>
    </motion.div>
  );
}
