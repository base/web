'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

export interface ParallaxScaleWrapperProps {
  children: React.ReactNode;
  /**
   * Parallax multiplier for scroll speed effect
   * - 0.5: slower than normal scroll (appears to lag behind)
   * - 1.0: normal scroll speed (no parallax effect)
   * - 1.2: faster than normal scroll (appears to move ahead)
   */
  parallaxMultiplier?: number;
  /**
   * Starting scale factor for the scale effect
   * - 1.0: starts at normal size
   * - 0.8: starts at 80% size
   * - 1.2: starts at 120% size
   * Scale starts at startingScale and grows to maxScale based on scroll progress
   */
  startingScale?: number;
  /**
   * Maximum scale factor for the scale effect
   * - 1.0: no scale effect
   * - 1.2: scales up to 120% at maximum
   * Scale starts at startingScale and grows to maxScale based on scroll progress
   */
  maxScale?: number;
  /**
   * Additional CSS classes for the wrapper
   */
  className?: string;
  /**
   * Disable parallax effect while keeping scale effect
   */
  disableParallax?: boolean;
  /**
   * Disable scale effect while keeping parallax effect
   */
  disableScale?: boolean;
  /**
   * Viewport threshold for intersection observer (0-1)
   * Default: 0.1 (triggers when 10% visible)
   */
  threshold?: number;
  /**
   * Custom scroll calculation range
   * Default uses element bounds for calculation
   */
  scrollRange?: {
    start: number; // 0-1, when effect starts (0 = top of viewport, 1 = bottom)
    end: number;   // 0-1, when effect reaches maximum
  };
}

export function ParallaxScaleWrapper({
  children,
  parallaxMultiplier = 1,
  startingScale = 1,
  maxScale = 1,
  className = '',
  disableParallax = false,
  disableScale = false,
  threshold = 0.1,
  scrollRange,
}: ParallaxScaleWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const animationFrameId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const updateTransform = useCallback(() => {
    if (!elementRef.current || (!isInView && disableParallax && disableScale)) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    let transforms: string[] = [];

    // Calculate scroll progress for scale effect
    if (!disableScale && maxScale !== 1) {
      let progress = 0;
      
      if (scrollRange) {
        // Custom scroll range calculation
        const startPoint = viewportHeight * scrollRange.start;
        const endPoint = viewportHeight * scrollRange.end;
        
        if (rect.top <= startPoint && rect.top >= endPoint) {
          progress = 1 - (rect.top - endPoint) / (startPoint - endPoint);
        } else if (rect.top < endPoint) {
          progress = 1;
        }
      } else {
        // Default calculation based on element visibility
        const elementHeight = rect.height;
        const elementCenter = rect.top + elementHeight / 2;
        const viewportCenter = viewportHeight / 2;
        
        // Calculate how close the element center is to viewport center
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        const maxDistance = viewportHeight / 2 + elementHeight / 2;
        progress = Math.max(0, 1 - distanceFromCenter / maxDistance);
      }

      // Apply easing for smoother scale transition
      const easedProgress = progress * progress * (3 - 2 * progress); // smoothstep
      const currentScale = startingScale + (maxScale - startingScale) * easedProgress;
      transforms.push(`scale(${currentScale})`);
    }

    // Calculate parallax offset
    if (!disableParallax && parallaxMultiplier !== 1) {
      const scrollY = window.scrollY;
      const parallaxOffset = scrollY * (1 - parallaxMultiplier);
      transforms.push(`translateY(${parallaxOffset}px)`);
    }

    // Apply transforms
    element.style.transform = transforms.length > 0 ? transforms.join(' ') : '';
    element.style.willChange = transforms.length > 0 ? 'transform' : 'auto';
  }, [isInView, disableParallax, disableScale, maxScale, parallaxMultiplier, scrollRange, startingScale]);

  // Intersection Observer for performance optimization
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold,
        // Add some margin to start calculations before element is fully visible
        rootMargin: '20% 0px 20% 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold]);

  // Scroll event handler with RAF optimization
  useEffect(() => {
    if (!isInView && disableParallax && disableScale) return;

    const onScroll = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (window.scrollY !== lastScrollY.current) {
        lastScrollY.current = window.scrollY;
        animationFrameId.current = requestAnimationFrame(updateTransform);
      }
    };

    // Initial calculation
    updateTransform();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTransform, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTransform);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isInView, updateTransform, disableParallax, disableScale]);

  return (
    <div
      ref={elementRef}
      className={`transform-gpu ${className}`}
      style={{
        // Ensure proper stacking context and GPU acceleration
        isolation: 'isolate',
      }}
    >
      {children}
    </div>
  );
}

export default ParallaxScaleWrapper;
