'use client';

import LottieAnimation from 'apps/web/src/components/LottieAnimation';
import { getBasenameAnimation } from 'apps/web/src/utils/usernames';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function AnimatedSocial() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.85 });
  const basenameAnimation = getBasenameAnimation('basename');
  const heartAnimationControls = useAnimation();
  const [heartHovered, setHeartHovered] = useState(false);

  const heartAnimations = useMemo(
    () => ({
      animate: {
        scale: [1, 1.2, 1],
      },
      transition: {
        duration: 1,
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
    [],
  );

  const buttonAnimations = useMemo(
    () => ({
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: 0.4,
      },
    }),
    [],
  );

  const toggleHeartHover = useCallback(() => {
    setHeartHovered((prev) => !prev);
  }, []);

  useEffect(() => {
    if (heartHovered) {
      void heartAnimationControls.start(heartAnimations.animate);
    } else {
      heartAnimationControls.stop();
    }
  }, [heartHovered, heartAnimationControls, heartAnimations]);

  return (
    <div
      ref={ref}
      onMouseEnter={toggleHeartHover}
      onMouseLeave={toggleHeartHover}
      className="m-6 w-[285px] md:w-[292px]"
    >
      <div className="mb-3 flex items-center gap-3">
        <LottieAnimation
          data={basenameAnimation}
          wrapperClassName="rounded-full h-[2rem] max-h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] max-w-[2rem]"
        />
        <div className="h-4 w-32 rounded-xl bg-dark-state-s-hovered" />
      </div>
      <div className="mb-4 h-32 w-full rounded-xl bg-dark-state-s-hovered" />
      <div className="flex items-center gap-4">
        <motion.div className="flex h-12 w-16 items-center justify-center rounded-xl border border-red-50">
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            animate={heartAnimationControls}
            transition={heartAnimations.transition}
            className="fill-red-50 text-red-50"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
        <motion.button
          initial={buttonAnimations.initial}
          animate={isInView && buttonAnimations.animate}
          transition={buttonAnimations.transition}
          className="h-12 w-full rounded-xl bg-white font-medium text-black transition-colors hover:bg-dark-gray-90"
        >
          Collect
        </motion.button>
      </div>
    </div>
  );
}
