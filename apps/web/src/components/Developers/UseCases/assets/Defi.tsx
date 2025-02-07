'use client';

import Image, { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
import NumberFlow from '@number-flow/react';
import usdc from 'apps/web/public/images/partners/usdc.svg';

const initialEarned = 4124.39;
const apy = 6.97;
const numberFlowFormat = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export function AnimatedDefi() {
  const [currentEarned, setCurrentEarned] = useState(initialEarned);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEarned((prev) => {
        const tier = Math.random() * 100;
        let increment;

        if (tier < 50) {
          increment = Math.random() * 15.4 + 0.5;
        } else if (tier < 80) {
          increment = Math.random() * 8.2 + 1.5;
        } else if (tier < 95) {
          increment = Math.random() * 5.75 + 2.5;
        } else {
          increment = Math.random() * 3.0 + 4.0;
        }

        return prev + increment;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const percentageIncrease = ((currentEarned - initialEarned) / initialEarned) * 100;

  return (
    <div className="flex h-full w-[250px] flex-col items-center justify-center">
      <div className="flex w-full flex-col gap-4 rounded-2xl bg-black p-4">
        <div className="h-8 w-8">
          <Image
            src={usdc as StaticImageData}
            alt="USDC Icon"
            width={36}
            height={36}
            className="h-full w-full"
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium text-dark-palette-foregroundMuted">APY</div>
          <div className="text-base font-medium text-white">{apy}%</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium uppercase text-dark-palette-foregroundMuted">
            Total Earned
          </div>
          <div className="flex items-center gap-2 text-xl font-medium text-white">
            $
            <NumberFlow value={currentEarned} format={numberFlowFormat} />
            <span className="text-sm font-medium text-dark-green-60">
              +{percentageIncrease.toFixed(2)}%
            </span>
          </div>
        </div>
        <button
          type="button"
          className="mb-1 h-12 w-full rounded-xl bg-white font-medium text-black transition-colors hover:bg-dark-gray-90"
        >
          Deposit
        </button>
      </div>
    </div>
  );
}
