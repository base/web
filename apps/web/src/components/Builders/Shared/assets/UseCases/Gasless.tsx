'use client';

import { useEffect, useState } from 'react';

export function AnimatedGasless() {
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    const initialHeights = Array(16)
      .fill(0)
      .map(
        () => Math.random() * 40 + 40, // Random values between 40% and 80% for initial state
      );
    setBarHeights(initialHeights);

    const interval = setInterval(() => {
      setBarHeights(
        (prev) => prev.map(() => Math.random() * 100), // Random values between 0 and 100% ($0 to $1.5K)
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-end justify-center">
      <div className="w-[328px] gap-4 rounded-l-2xl bg-black p-6 md:w-[484px]">
        <h3 className="text-base font-semibold text-white">Gas sponsored</h3>

        <div className="relative mt-6 h-[160px]">
          <div className="absolute left-0 flex h-full flex-col justify-between text-sm text-dark-palette-foregroundMuted">
            <span>$1.5K</span>
            <span>$1K</span>
            <span>$500</span>
            <span>$0</span>
          </div>

          <div className="ml-12 flex h-full items-end gap-2">
            {barHeights.map((height, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="flex-1 rounded-t-md bg-dark-purple-40 transition-all duration-500"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
