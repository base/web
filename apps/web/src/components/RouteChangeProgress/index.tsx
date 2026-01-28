'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RouteChangeProgress - Shows a loading indicator during page navigation
 *
 * Features:
 * - Animates progress 0% → 30% → 80% during navigation, then 100% on completion
 * - Only shows if navigation takes >100ms (avoids flash for fast navigations)
 * - Respects prefers-reduced-motion for accessibility
 * - Includes ARIA attributes and screen reader announcements
 * - 10s max timeout fallback to hide bar if something goes wrong
 */
export default function RouteChangeProgress() {
  const pathname = usePathname();
  const previousPathnameRef = useRef<string>(pathname);
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const showDelayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Cleanup function
  const clearAllTimers = useCallback(() => {
    if (showDelayTimerRef.current) clearTimeout(showDelayTimerRef.current);
    if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    if (maxTimeoutRef.current) clearTimeout(maxTimeoutRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  // Handle navigation completion
  const finishNavigation = useCallback(() => {
    clearAllTimers();
    setProgress(100);
    setAnnouncement('Page loaded');

    // Hide bar after completion animation
    hideTimerRef.current = setTimeout(() => {
      setIsNavigating(false);
      setShouldRender(false);
      setProgress(0);
      setAnnouncement('');
    }, 300);
  }, [clearAllTimers]);

  // Detect route changes
  useEffect(() => {
    const previousPathname = previousPathnameRef.current;

    if (pathname !== previousPathname) {
      // Route change started
      previousPathnameRef.current = pathname;
      clearAllTimers();

      // Start navigating state immediately (for tracking)
      setIsNavigating(true);
      setProgress(0);

      // Only show bar if navigation takes >100ms
      showDelayTimerRef.current = setTimeout(() => {
        setShouldRender(true);
        setAnnouncement('Loading page...');
        setProgress(30);

        // Animate to 80% over time
        progressTimerRef.current = setTimeout(() => {
          setProgress(80);
        }, 300);
      }, 100);

      // Max timeout fallback (10 seconds)
      maxTimeoutRef.current = setTimeout(() => {
        finishNavigation();
      }, 10000);

      // Navigation complete (pathname has settled)
      // Use microtask to allow React to finish rendering
      queueMicrotask(() => {
        finishNavigation();
      });
    }
  }, [pathname, clearAllTimers, finishNavigation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  if (!shouldRender) {
    return (
      // Hidden live region for screen reader announcements
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    );
  }

  return (
    <>
      {/* Screen reader announcement */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>

      <AnimatePresence>
        {isNavigating && (
          <motion.div
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page loading progress"
            tabIndex={-1}
            className="fixed left-0 top-0 z-[100] h-1 bg-blue-60 shadow-[0_0_10px_rgba(0,82,255,0.5)] forced-colors:bg-[Highlight]"
            initial={{ width: '0%', opacity: 0 }}
            animate={{
              width: prefersReducedMotion ? '100%' : `${progress}%`,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              width: prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.3, ease: 'easeOut' },
              opacity: { duration: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

