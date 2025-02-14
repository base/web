'use client';

import { useState, useEffect } from 'react';

type ButtonState = 'default' | 'loading' | 'success';

export function AnimatedPayment() {
  const [buttonState, setButtonState] = useState<ButtonState>('default');

  useEffect(() => {
    const animationCycle = () => {
      setButtonState('loading');
      setTimeout(() => {
        setButtonState('success');
        setTimeout(() => {
          setButtonState('default');
        }, 800);
      }, 1200);
    };

    const interval = setInterval(animationCycle, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full max-w-[285px] flex-col">
      <div className="mb-4 h-36 w-full rounded-b-xl bg-dark-state-s-hovered" />

      {/* Total amount with justified spacing */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-medium text-white">Total</span>
        <span className="text-lg font-medium text-white">$69.42</span>
      </div>

      <style>{`
        @keyframes springIn {
          0% {
            transform: scale(0);
          }
          60% {
            transform: scale(1.1);
          }
          80% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes springOut {
          0% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes fastSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spring-in {
          animation: springIn 0.5s cubic-bezier(0.37, 0, 0.63, 1);
        }
        .spring-out {
          animation: springOut 0.4s cubic-bezier(0.37, 0, 0.63, 1);
        }
        .fast-spin {
          animation: fastSpin 0.6s linear infinite;
        }
      `}</style>

      {/* Pay with crypto button */}
      <button
        type="button"
        className="relative h-12 w-full overflow-hidden rounded-xl bg-[#0052FF] font-medium text-white"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Default State: Logo + Text */}
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              buttonState === 'default'
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[-20px] opacity-0'
            }`}
          >
            {/* Base Logo */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_b_551_6632)">
                <path
                  d="M22.9801 34.3701C29.2725 34.3701 34.3736 29.2795 34.3736 22.9999C34.3736 16.7204 29.2725 11.6298 22.9801 11.6298C17.0101 11.6298 12.1126 16.2119 11.6262 22.0442H26.6859V23.9557H11.6262C12.1126 29.788 17.0101 34.3701 22.9801 34.3701Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <filter
                  id="filter0_b_551_6632"
                  x="-14"
                  y="-14"
                  width="74"
                  height="74"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="7" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_551_6632"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_551_6632"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <span>Pay with crypto</span>
          </div>

          {/* Spinner */}
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
            <svg
              className="fast-spin h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>

          {/* Success Icon */}
          <div
            className={`absolute transition-opacity duration-300 ${
              buttonState === 'success' ? 'spring-in opacity-100' : 'opacity-0'
            }`}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
