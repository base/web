'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useCallback } from 'react';
import { itemContentVariants } from 'apps/web/src/components/base-org/root/Redesign/Section';

const TERMINAL_CONFIG = {
  easing: [0.4, 0, 0.2, 1] as const,
  duration: 180,
  cursorBlinkDuration: 800,
  restartDelay: 2000,
  steps: [
    {
      id: 'command',
      type: 'typewriter' as const,
      prompt: '$ ',
      text: 'npm create onchain',
      className: 'text-[#66C800]',
      delay: 50,
      speed: 15,
      nextStepDelay: 120,
    },
    {
      id: 'ascii',
      type: 'ascii' as const,
      delay: 0,
      nextStepDelay: 140,
    },
    {
      id: 'project-name',
      type: 'typewriter' as const,
      prompt: 'Project name:',
      text: 'my onchain app',
      className: 'text-[#66C800]',
      delay: 100,
      speed: 12,
      nextStepDelay: 120,
    },
    {
      id: 'smart-wallet',
      type: 'typewriter' as const,
      prompt: 'Use Coinbase Smart Wallet? (recommended):',
      text: 'yes',
      className: 'text-[#66C800]',
      delay: 160,
      speed: 18,
      nextStepDelay: 140,
    },
    {
      id: 'api-key',
      type: 'prompt' as const,
      prompt: 'Enter your Coinbase Developer Platform API Key: (Optional)',
      delay: 120,
      nextStepDelay: 2000,
    },
  ],
  asciiArt: `
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         ::::::::  ::::    :::  ::::::::  :::    :::     :::     ::::::::::: ::::    ::: :::    ::: ::::::::::: :::::::::::   //
//       :+:    :+: :+:+:   :+: :+:    :+: :+:    :+:   :+: :+:       :+:     :+:+:   :+: :+:   :+:      :+:         :+:        //
//      +:+    +:+ :+:+:+  +:+ +:+        +:+    +:+  +:+   +:+      +:+     :+:+:+  +:+ +:+  +:+       +:+         +:+         //
//     +#+    +:+ +#+ +:+ +#+ +#+        +#+    +#+ +#++:++#++:     +#+     +#+ +:+ +#+ +#++:++        +#+         +#+          //
//    +#+    +#+ +#+  +#+#+# +#+        +#+    +#+ +#+     +#+     +#+     +#+  +#+#+# +#+  +#+       +#+         +#+           //
//   #+#    #+# #+#   #+#+# #+#    #+# #+#    #+# #+#     #+#     #+#     #+#   #+#+# #+#   #+#      #+#         #+#            //
//   ########  ###    ####  ########  ###    ### ###     ### ########### ###    #### ###    ### ###########     ###             //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////`,
};

const TERMINAL_STYLES = {
  container: {
    width: 'clamp(300px, 90vw, 900px)',
  },
  asciiArt: {
    fontSize: 'clamp(2px, 1vw, 8px)',
    lineHeight: '1.1',
    fontFamily: 'monospace',
    color: '#EEF0F3',
    whiteSpace: 'pre' as const,
    textAlign: 'left' as const,
    margin: 0,
    overflow: 'hidden' as const,
    textOverflow: 'clip' as const,
  },
};

const CURSOR_ANIMATION = { opacity: [1, 0] };
const CURSOR_TRANSITION = {
  duration: TERMINAL_CONFIG.cursorBlinkDuration / 1000,
  ease: TERMINAL_CONFIG.easing,
  repeat: Infinity,
  repeatType: 'reverse' as const,
};

function BlinkingCursor() {
  return (
    <motion.span
      animate={CURSOR_ANIMATION}
      transition={CURSOR_TRANSITION}
      className="inline-block text-[#EEF0F3]"
    >
      |
    </motion.span>
  );
}

function SolidCursor() {
  return <span className="inline-block text-[#EEF0F3]">|</span>;
}

function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 25,
  onComplete,
  showCursor = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShowBlinkingCursor(true);
      setIsTyping(true);

      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else if (currentIndex === text.length && onComplete) {
        setIsTyping(false);
        onComplete();
      }
    }, delay);

    return () => clearTimeout(startTimer);
  }, [currentIndex, text, delay, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showBlinkingCursor && showCursor && isTyping && <SolidCursor />}
    </span>
  );
}

function TerminalContent({ onComplete }: { onComplete: () => void }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleStepComplete = useCallback(
    (stepId: string) => {
      const currentConfig = TERMINAL_CONFIG.steps.find((step) => step.id === stepId);
      const nextStepDelay = currentConfig?.nextStepDelay ?? TERMINAL_CONFIG.duration;

      setTimeout(() => {
        if (currentStepIndex < TERMINAL_CONFIG.steps.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
        } else {
          // Animation sequence complete, trigger restart
          onComplete();
        }
      }, nextStepDelay);
    },
    [currentStepIndex, onComplete],
  );

  const handleCommandComplete = useCallback(
    () => handleStepComplete('command'),
    [handleStepComplete],
  );
  const handleProjectNameComplete = useCallback(
    () => handleStepComplete('project-name'),
    [handleStepComplete],
  );
  const handleSmartWalletComplete = useCallback(
    () => handleStepComplete('smart-wallet'),
    [handleStepComplete],
  );

  const handleAsciiRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el && currentStepIndex === 1) {
        // ASCII is step index 1
        setTimeout(() => handleStepComplete('ascii'), 0);
      }
    },
    [handleStepComplete, currentStepIndex],
  );

  const handleApiKeyRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el && currentStepIndex === 4) {
        // API key prompt is step index 4
        setTimeout(() => handleStepComplete('api-key'), 120);
      }
    },
    [handleStepComplete, currentStepIndex],
  );

  return (
    <div className="space-y-2 p-3 text-[10px] md:p-4 md:text-xs lg:text-sm">
      <div className="space-y-1 md:space-y-1.5">
        {TERMINAL_CONFIG.steps.map((step, index) => {
          const shouldShow = index <= currentStepIndex;
          const isCurrentStep = index === currentStepIndex;

          if (!shouldShow) return null;

          if (step.type === 'typewriter') {
            const getHandler = () => {
              switch (step.id) {
                case 'command':
                  return handleCommandComplete;
                case 'project-name':
                  return handleProjectNameComplete;
                case 'smart-wallet':
                  return handleSmartWalletComplete;
                default:
                  return handleCommandComplete;
              }
            };
            const stepHandler = getHandler();

            return (
              <div key={step.id} className="text-[#999ca1]">
                {step.prompt && (
                  <span className="text-[#999ca1]">
                    {step.prompt.includes('$') ? step.prompt : `${step.prompt} `}
                  </span>
                )}
                {isCurrentStep ? (
                  <TypewriterText
                    text={step.text}
                    className={step.className}
                    delay={step.delay}
                    speed={step.speed}
                    onComplete={stepHandler}
                    showCursor
                  />
                ) : (
                  <span className={step.className}>{step.text}</span>
                )}
              </div>
            );
          }

          if (step.type === 'ascii') {
            return (
              <div key={step.id} ref={handleAsciiRef} className="overflow-hidden w-full">
                <pre className="w-full ascii-art" style={TERMINAL_STYLES.asciiArt}>
                  {TERMINAL_CONFIG.asciiArt}
                </pre>
              </div>
            );
          }

          if (step.type === 'prompt') {
            return (
              <div key={step.id} className="text-[#5b616e]" ref={handleApiKeyRef}>
                <span>{step.prompt} </span>
                {isCurrentStep && <BlinkingCursor />}
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

export function Terminal() {
  const [animationKey, setAnimationKey] = useState(0);

  const incrementKey = useCallback((prev: number) => prev + 1, []);

  const handleAnimationComplete = useCallback(() => {
    setTimeout(() => {
      setAnimationKey(incrementKey);
    }, TERMINAL_CONFIG.restartDelay);
  }, [incrementKey]);

  return (
    <motion.div
      className="h-auto min-h-[180px] w-fit min-w-[300px] max-w-[660px] rounded-lg bg-[#000000] font-mono md:min-h-[280px]"
      style={TERMINAL_STYLES.container}
      variants={itemContentVariants}
    >
      <div className="flex items-center justify-between rounded-t-lg bg-[#262626] p-2 md:p-3 md:px-4">
        <div className="flex items-center gap-1.5 md:gap-2">
          <IconClose />

          <IconMinimize />

          <IconMaximize />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex items-center text-[10px] text-base-gray-150 md:text-sm">
            <span className="ml-2">&gt;- OnchainKit</span>
          </div>
        </div>
        <div className="w-[48px] md:w-[64px]" />
      </div>

      <AnimatePresence mode="wait">
        <TerminalContent key={animationKey} onComplete={handleAnimationComplete} />
      </AnimatePresence>
    </motion.div>
  );
}

function IconClose() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <rect width="14" height="14" rx="7" fill="#FC4954" />
      <rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke="black" strokeOpacity="0.3" />
      <g className="opacity-0 transition-opacity duration-100 group-hover:opacity-60">
        <path
          d="M10.7734 9.97699C10.8791 10.0827 10.9385 10.226 10.9385 10.3754C10.9385 10.5249 10.8791 10.6682 10.7734 10.7739C10.6678 10.8795 10.5244 10.9389 10.375 10.9389C10.2256 10.9389 10.0822 10.8795 9.97656 10.7739L7.00047 7.79683L4.02344 10.7729C3.91776 10.8786 3.77444 10.938 3.625 10.938C3.47556 10.938 3.33223 10.8786 3.22656 10.7729C3.12089 10.6673 3.06152 10.5239 3.06152 10.3745C3.06152 10.225 3.12089 10.0817 3.22656 9.97605L6.20359 6.99996L3.2275 4.02293C3.12183 3.91726 3.06246 3.77393 3.06246 3.62449C3.06246 3.47505 3.12183 3.33173 3.2275 3.22605C3.33317 3.12038 3.47649 3.06102 3.62594 3.06102C3.77538 3.06102 3.9187 3.12038 4.02437 3.22605L7.00047 6.20309L9.9775 3.22558C10.0832 3.11991 10.2265 3.06055 10.3759 3.06055C10.5254 3.06055 10.6687 3.11991 10.7744 3.22558C10.88 3.33126 10.9394 3.47458 10.9394 3.62402C10.9394 3.77347 10.88 3.91679 10.7744 4.02246L7.79734 6.99996L10.7734 9.97699Z"
          fill="#0A0B0D"
        />
      </g>
    </svg>
  );
}

function IconMinimize() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <rect width="14" height="14" rx="7" fill="#FCAF40" />
      <rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke="black" strokeOpacity="0.3" />
      <g className="opacity-0 transition-opacity duration-100 group-hover:opacity-60">
        <path
          d="M11.6875 7C11.6875 7.14918 11.6282 7.29226 11.5227 7.39775C11.4173 7.50324 11.2742 7.5625 11.125 7.5625H2.875C2.72582 7.5625 2.58274 7.50324 2.47725 7.39775C2.37176 7.29226 2.3125 7.14918 2.3125 7C2.3125 6.85082 2.37176 6.70774 2.47725 6.60225C2.58274 6.49676 2.72582 6.4375 2.875 6.4375H11.125C11.2742 6.4375 11.4173 6.49676 11.5227 6.60225C11.6282 6.70774 11.6875 6.85082 11.6875 7Z"
          fill="#0A0B0D"
        />
      </g>
    </svg>
  );
}

function IconMaximize() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <rect width="14" height="14" rx="7" fill="#2EC444" />
      <rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke="black" strokeOpacity="0.3" />
      <g className="opacity-0 transition-opacity duration-100 group-hover:opacity-60">
        <path
          d="M7.93736 3.97797C7.90901 3.90943 7.86098 3.85083 7.79932 3.80959C7.73767 3.76835 7.66517 3.74632 7.59099 3.74628L4.40901 3.74628C4.35973 3.74626 4.31093 3.75594 4.26539 3.77479C4.21986 3.79364 4.17848 3.82127 4.14364 3.85612C4.10879 3.89097 4.08115 3.93234 4.06231 3.97787C4.04346 4.02341 4.03377 4.07221 4.0338 4.12149L4.0338 7.30347C4.03376 7.37769 4.05574 7.45024 4.09695 7.51195C4.13817 7.57367 4.19677 7.62176 4.26533 7.65015C4.3339 7.67855 4.40935 7.68596 4.48213 7.67144C4.5549 7.65693 4.62174 7.62116 4.67417 7.56864L7.85616 4.38666C7.90859 4.3342 7.94429 4.26738 7.95874 4.19463C7.9732 4.12189 7.96576 4.04649 7.93736 3.97797ZM6.32583 9.22029L9.50781 6.03831C9.56024 5.98579 9.62708 5.95001 9.69985 5.9355C9.77263 5.92099 9.84808 5.9284 9.91665 5.95679C9.98521 5.98519 10.0438 6.03328 10.085 6.095C10.1262 6.15671 10.1482 6.22926 10.1482 6.30347L10.1482 9.48545C10.1482 9.53474 10.1385 9.58354 10.1197 9.62907C10.1008 9.67461 10.0732 9.71598 10.0383 9.75083C10.0035 9.78567 9.96212 9.81331 9.91659 9.83216C9.87105 9.851 9.82225 9.86069 9.77297 9.86066L6.59099 9.86066C6.51678 9.8607 6.44422 9.83873 6.38251 9.79751C6.3208 9.75629 6.2727 9.69769 6.24431 9.62913C6.21592 9.56056 6.20851 9.48512 6.22302 9.41234C6.23753 9.33956 6.27331 9.27272 6.32583 9.22029Z"
          fill="#0A0B0D"
        />
      </g>
    </svg>
  );
}
