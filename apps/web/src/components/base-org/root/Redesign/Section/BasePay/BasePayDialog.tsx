'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useSpring } from 'framer-motion';
import SlideButton from './SlideButton';
import { BuyButton } from './BuyButton';

const MIN_WIDTH_PX = 71;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

type Props = {
  /** Current sticker index at top; drives slide animations and BuyButton when it changes. */
  triggerCount?: number;
  /** Company name to display in the dialog. */
  company?: string;
};

export function BasePayDialog({ triggerCount, company }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [bgMask, setBgMask] = useState<React.CSSProperties>({});
  const [windowWidth, setWindowWidth] = useState(0);

  const progressSpring = useSpring(0, { stiffness: 650, damping: 48 });
  const [springProgress, setSpringProgress] = useState(0);

  useEffect(() => {
    progressSpring.set(progress);
  }, [progress, progressSpring]);

  useMotionValueEvent(progressSpring, 'change', (v) => {
    setSpringProgress(v as number);
  });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTrackWidth(el.clientWidth));
    ro.observe(el);
    setTrackWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWindowWidth(el.offsetWidth));
    ro.observe(el);
    setWindowWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Measure the window div's position within the card and build a mask that
  // punches a transparent hole through the white background layer.
  useEffect(() => {
    function measure() {
      const card = cardRef.current;
      const win = windowRef.current;
      if (!card || !win) return;
      // Use offset* — unaffected by CSS transforms on ancestor elements.
      const cardW = card.offsetWidth;
      const cardH = card.offsetHeight;
      const left = win.offsetLeft;
      const top = win.offsetTop;
      const w = win.offsetWidth;
      const h = win.offsetHeight;
      // Match the border-radius on the window div (rounded-xl = 12px).
      const r = 12;

      // Even-odd SVG path: white outer rect minus a rounded inner rect.
      // CSS alpha mask — white (opaque) = show, absent = hide.
      const svg = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="${cardW}" height="${cardH}">`,
        `<path fill-rule="evenodd" fill="white" d="`,
        `M0 0 H${cardW} V${cardH} H0 Z `,
        `M${left + r} ${top} `,
        `H${left + w - r} A${r} ${r} 0 0 1 ${left + w} ${top + r} `,
        `V${top + h - r} A${r} ${r} 0 0 1 ${left + w - r} ${top + h} `,
        `H${left + r} A${r} ${r} 0 0 1 ${left} ${top + h - r} `,
        `V${top + r} A${r} ${r} 0 0 1 ${left + r} ${top} Z`,
        `"/></svg>`,
      ].join('');

      const uri = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;

      setBgMask({
        maskImage: uri,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskImage: uri,
        WebkitMaskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
      } as React.CSSProperties);
    }
    const ro = new ResizeObserver(measure);
    if (cardRef.current) ro.observe(cardRef.current);
    measure();
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative flex w-full flex-col items-center justify-between gap-4 overflow-hidden rounded-[46px] p-6 shadow-lg"
    >
      {/* White background layer — mask punches out the window area */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[46px] bg-white"
        style={bgMask}
      />
      <div className="relative flex w-full items-center justify-start gap-3.5">
        <div className="w-12">
          <svg
            width="96"
            height="96"
            className="h-full w-full"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1275_1239)">
              <path
                d="M48 96C74.5097 96 96 74.5097 96 48C96 21.4903 74.5097 0 48 0C21.4903 0 0 21.4903 0 48C0 74.5097 21.4903 96 48 96Z"
                fill="#0B53BF"
              />
              <path
                d="M56.6409 13.0497V19.2297C68.971 22.9497 78.0009 34.4097 78.0009 47.9997C78.0009 61.5897 68.971 73.0497 56.6409 76.7697V82.9497C72.3609 79.1097 84.0009 64.9197 84.0009 47.9997C84.0009 31.0797 72.3609 16.8897 56.6409 13.0497Z"
                fill="white"
              />
              <path
                d="M18 47.9997C18 34.4097 27.03 22.9497 39.36 19.2297V13.0497C23.64 16.8897 12 31.0797 12 47.9997C12 64.9197 23.64 79.1097 39.36 82.9497V76.7697C27.03 73.0797 18 61.5897 18 47.9997Z"
                fill="white"
              />
              <path
                d="M60.9007 54.69C60.9007 42.4199 41.6706 47.4601 41.6706 40.68C41.6706 38.25 43.6207 36.69 47.3407 36.69C51.7807 36.69 53.3106 38.85 53.7906 41.76H59.9106C59.3647 36.2988 56.2303 32.8506 51.0007 31.8234V27H45.0007V31.6512C39.2716 32.3808 35.6706 35.7171 35.6706 40.68C35.6706 53.01 54.9307 48.39 54.9307 55.05C54.9307 57.57 52.5007 59.25 48.3906 59.25C43.0207 59.25 41.2507 56.88 40.5906 53.61H34.6207C35.0074 59.5917 38.6959 63.3354 45.0007 64.2696V69H51.0007V64.3326C57.154 63.5376 60.9007 59.958 60.9007 54.69Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1275_1239">
                <rect width="96" height="96" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="font-sans text-lg font-medium !leading-none text-base-black">
            Pay with USDC
          </p>
          <div className="overflow-clip">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.p
                key={company}
                initial={{ y: 10, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -10, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="origin-left font-sans text-sm font-normal !leading-none text-base-gray-200"
              >
                To {company}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div
        ref={windowRef}
        style={windowWidth > 0 ? { height: windowWidth } : undefined}
        className="relative w-full rounded-xl"
      />

      <div className="w-full">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={triggerCount}
            initial={{ x: 200, opacity: 0, scale: 0.6, originX: 0, filter: 'blur(10px)' }}
            animate={{ x: 0, opacity: 1, scale: 1, originX: 0, filter: 'blur(0px)' }}
            exit={{ x: -200, opacity: 0, scale: 0.6, originX: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, type: 'spring', bounce: 0.2 }}
            className="relative w-full origin-center"
          >
            <BuyButton triggerCount={triggerCount} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
