'use client';

import { useState, useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import './styles.css';

type ButtonState = 'default' | 'loading' | 'success';

export function AnimatedPayment() {
  const [buttonState, setButtonState] = useState<ButtonState>('default');

  const handleHover = useCallback(() => {
    if (buttonState === 'default') {
      setButtonState('loading');
      setTimeout(() => {
        setButtonState('success');
        setTimeout(() => {
          setButtonState('default');
        }, 800);
      }, 1200);
    }
  }, [buttonState]);

  return (
    <div className="flex w-full max-w-[285px] flex-col">
      <div className="mb-4 h-36 w-full rounded-b-xl bg-dark-state-s-hovered" />

      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-medium text-white">Total</span>
        <span className="text-lg font-medium text-white">$69.42</span>
      </div>
      <button
        type="button"
        onMouseEnter={handleHover}
        className="relative h-12 w-full overflow-hidden rounded-xl bg-[#0052FF] font-medium text-white"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              buttonState === 'default'
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[-20px] opacity-0'
            }`}
          >
            <Icon name="baseLogo" color="white" width={30} height={30} />
            <span>Pay with crypto</span>
          </div>
          <div
            className={`absolute transition-opacity duration-300 ${
              buttonState === 'loading' ? 'opacity-100' : 'opacity-0'
            } ${
              buttonState === 'loading'
                ? 'spring-in'
                : buttonState === 'success'
                ? 'spring-out'
                : ''
            }`}
          >
            <Icon name="spinner" color="white" width={24} height={24} />
          </div>
          <div
            className={`absolute transition-opacity duration-300 ${
              buttonState === 'success' ? 'spring-in opacity-100' : 'opacity-0'
            }`}
          >
            <Icon name="checkmark" color="white" width={20} height={20} />
          </div>
        </div>
      </button>
    </div>
  );
}
