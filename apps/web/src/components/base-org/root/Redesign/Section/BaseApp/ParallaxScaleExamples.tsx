'use client';

import ParallaxScaleWrapper from './ParallaxScaleWrapper';

/**
 * Example component demonstrating various usage patterns for ParallaxScaleWrapper
 * This file can be used as a reference and can be deleted if not needed
 */
export function ParallaxScaleExamples() {
  return (
    <div className="py-32 space-y-32">
      {/* Example 1: Slow parallax with subtle scale */}
      <ParallaxScaleWrapper
        parallaxMultiplier={0.5}
        maxScale={1.1}
        className="p-8 bg-blue-100 rounded-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Slow Parallax + Subtle Scale</h2>
        <p>This element moves slower than the scroll (0.5x) and scales up to 110%</p>
      </ParallaxScaleWrapper>
      {/* Example 2: Fast parallax with no scale */}
      <ParallaxScaleWrapper
        parallaxMultiplier={1.3}
        disableScale
        className="p-8 bg-green-100 rounded-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Fast Parallax Only</h2>
        <p>This element moves faster than the scroll (1.3x) with no scaling</p>
      </ParallaxScaleWrapper>
      {/* Example 3: Scale only, no parallax */}
      <ParallaxScaleWrapper maxScale={1.4} disableParallax className="p-8 bg-purple-100 rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">Scale Effect Only</h2>
        <p>This element scales up to 140% based on scroll position with no parallax</p>
      </ParallaxScaleWrapper>
      {/* Example 4: Combined effects with custom scroll range */}
      <ParallaxScaleWrapper
        parallaxMultiplier={0.7}
        maxScale={1.25}
        scrollRange={{ start: 0.8, end: 0.2 }}
        className="p-8 bg-red-100 rounded-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Custom Scroll Range</h2>
        <p>Custom scroll range: starts at 80% viewport, max effect at 20% viewport</p>
      </ParallaxScaleWrapper>
      {/* Example 5: Extreme effects */}
      <ParallaxScaleWrapper
        parallaxMultiplier={0.2}
        maxScale={1.6}
        className="p-8 bg-yellow-100 rounded-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Extreme Effects</h2>
        <p>Very slow parallax (0.2x) with significant scaling (160%)</p>
      </ParallaxScaleWrapper>
      {/* Example 6: Reverse parallax */}
      <ParallaxScaleWrapper
        parallaxMultiplier={1.8}
        maxScale={1.15}
        className="p-8 bg-indigo-100 rounded-lg"
      >
        <h2 className="mb-4 text-2xl font-bold">Fast Forward Parallax</h2>
        <p>Element appears to move ahead of the scroll (1.8x multiplier)</p>
      </ParallaxScaleWrapper>
      {/* Example 7: Image with effects */}
      <ParallaxScaleWrapper
        parallaxMultiplier={0.6}
        maxScale={1.3}
        className="overflow-hidden rounded-lg"
      >
        <div className="flex justify-center items-center h-64 bg-gradient-to-r from-blue-400 to-purple-500">
          <h2 className="text-3xl font-bold text-white">Image/Media Example</h2>
        </div>
      </ParallaxScaleWrapper>
      <div className="h-screen" /> {/* Spacer for more scrolling */}
    </div>
  );
}

export default ParallaxScaleExamples;
