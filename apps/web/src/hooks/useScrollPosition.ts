'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const useScrollPosition = () => {
  const scrollPositionRef = useRef({
    scrollTop: 0,
    scrollX: 0,
  });

  const [isInitialized, setIsInitialized] = useState(false);

  const getScrollPosition = useCallback(() => {
    return scrollPositionRef.current;
  }, []);

  useEffect(() => {
    const initializePosition = () => {
      scrollPositionRef.current = {
        scrollTop: window.scrollY,
        scrollX: window.scrollX,
      };
      setIsInitialized(true);
    };

    if (typeof window !== 'undefined') {
      requestAnimationFrame(initializePosition);
    }

    const updatePosition = () => {
      scrollPositionRef.current = {
        scrollTop: window.scrollY,
        scrollX: window.scrollX,
      };
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return {
    ...scrollPositionRef.current,
    getScrollPosition,
    isInitialized,
  };
};
