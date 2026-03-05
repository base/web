'use client';
import { useEffect, useState } from 'react';
import { TextMorph } from 'torph/react';

export function BuyButton() {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFinished((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const buttonText = isFinished ? 'Buying for 50 USDC' : 'Buy for 50 USDC';

  return (
    <div
      style={{ backgroundColor: isFinished ? '#66C800' : '#0000ff' }}
      className="w-full rounded-full bg-base-gray-50 px-2 py-4 text-white"
    >
      <button className="w-full font-sans text-base">
        <TextMorph duration={600}>{buttonText}</TextMorph>
      </button>
    </div>
  );
}
