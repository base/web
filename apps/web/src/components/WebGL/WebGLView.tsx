'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useWebGLStore } from 'apps/web/src/components/WebGL/webGlStore';
import { useScrollPosition } from 'apps/web/src/hooks/useScrollPosition';

/**
 * WebGLView Component Props
 *
 * @param fragmentShader - The GLSL fragment shader code that defines the visual appearance
 * @param customUniforms - Optional THREE.js uniforms to pass to the shader (e.g., textures, values)
 * @param borderRadiusCorners - Optional array of 4 numbers for rounded corner radii [top-left, top-right, bottom-right, bottom-left]
 *
 * Hover Behavior:
 * - When you hover over this component, it triggers the `u_isHovered` uniform in the shader
 * - The shader uses this uniform to animate the image with a pattern overlay effect
 * - The hover state is smoothly interpolated using the `useWebGLInteraction` hook
 * - The pattern effect creates animated tiles that respond to the image's luminance values
 * - Each tile cycles through different pattern textures from the pattern atlas based on brightness
 */

// Simple mergeRefs utility
function mergeRefs<T>(
  ...refs: (React.MutableRefObject<T | null> | React.LegacyRef<T> | null | undefined)[]
): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

// Rounded corner shader utilities
const ROUNDED_CORNER_SHADER_FUNCTIONS = /* glsl */ `
// Rounded rectangle SDF
float roundedRectSDF(vec2 p, vec2 size, vec4 radii) {
  vec2 corner = abs(p) - size + radii.xy;
  float d = min(max(corner.x, corner.y), 0.0) + length(max(corner, 0.0)) - radii.x;
  return d;
}

// Check if pixel is inside rounded rectangle
float isInsideRoundedRect(vec2 uv, vec2 resolution, vec4 radii) {
  vec2 pos = (uv - 0.5) * resolution;
  vec2 halfSize = resolution * 0.5;
  
  // supports different radius for each corner
  vec4 r = radii;
  if (pos.x > 0.0 && pos.y > 0.0) r = vec4(radii.y, radii.y, radii.y, radii.y); // top-right
  else if (pos.x < 0.0 && pos.y > 0.0) r = vec4(radii.x, radii.x, radii.x, radii.x); // top-left
  else if (pos.x < 0.0 && pos.y < 0.0) r = vec4(radii.w, radii.w, radii.w, radii.w); // bottom-left
  else r = vec4(radii.z, radii.z, radii.z, radii.z); // bottom-right
  
  float d = roundedRectSDF(pos, halfSize, r);
  return smoothstep(1.0, 0.0, d);
}
`;

const ROUNDED_CORNER_MAIN_INJECTION = /* glsl */ `
  // Rounded corner clipping
  vec4 radii = u_borderRadiusCorners;
  float inside = isInsideRoundedRect(v_uv, u_imageResolution, radii);
  
  if (inside < 0.5) {
    discard;
  }
`;

function injectRoundedCornerUniforms(fragmentShader: string): string {
  const precisionMatch = fragmentShader.match(/(precision\s+\w+\s+float;\s*)/);
  if (precisionMatch) {
    const afterPrecision = fragmentShader.indexOf(precisionMatch[0]) + precisionMatch[0].length;
    return (
      fragmentShader.slice(0, afterPrecision) +
      '\n' +
      'uniform float u_borderRadius;\n' +
      'uniform vec4 u_borderRadiusCorners;\n' +
      fragmentShader.slice(afterPrecision)
    );
  }

  // fallback, add at the beginning
  return `uniform float u_borderRadius;\nuniform vec4 u_borderRadiusCorners;\n${fragmentShader}`;
}

function injectRoundedCornerFunctions(fragmentShader: string): string {
  const mainMatch = fragmentShader.match(/void\s+main\s*\(\s*\)\s*{/);
  if (mainMatch) {
    const mainIndex = fragmentShader.indexOf(mainMatch[0]);
    return (
      fragmentShader.slice(0, mainIndex) +
      ROUNDED_CORNER_SHADER_FUNCTIONS +
      '\n' +
      fragmentShader.slice(mainIndex)
    );
  }

  // fallback, add before the end
  return fragmentShader + '\n' + ROUNDED_CORNER_SHADER_FUNCTIONS;
}

function injectRoundedCornerMainCode(fragmentShader: string): string {
  // inject code after main function opening
  const mainMatch = fragmentShader.match(/(void\s+main\s*\(\s*\)\s*{)/);
  if (mainMatch) {
    const afterMainBrace = fragmentShader.indexOf(mainMatch[0]) + mainMatch[0].length;
    return (
      fragmentShader.slice(0, afterMainBrace) +
      '\n' +
      ROUNDED_CORNER_MAIN_INJECTION +
      '\n' +
      fragmentShader.slice(afterMainBrace)
    );
  }

  return fragmentShader;
}

function preprocessShaderForRoundedCorners(fragmentShader: string): string {
  let processedShader = fragmentShader;

  // uniforms
  processedShader = injectRoundedCornerUniforms(processedShader);

  // utility functions
  processedShader = injectRoundedCornerFunctions(processedShader);

  // main function code
  processedShader = injectRoundedCornerMainCode(processedShader);

  return processedShader;
}

type WebGLElement = {
  element: HTMLDivElement;
  fragmentShader: string;
  customUniforms?: Record<string, THREE.Uniform>;
};

type WebGLViewProps = {
  fragmentShader: string;
  customUniforms?: Record<string, THREE.Uniform>;
  onResize?: (width: number, height: number) => void;
  // [top-left, top-right, bottom-right, bottom-left]
  borderRadiusCorners?: [number, number, number, number];
};

export const WebGLView = React.forwardRef<HTMLDivElement, WebGLViewProps>(
  ({ fragmentShader, customUniforms, onResize, borderRadiusCorners }, forwardedRef) => {
    const setElements = useWebGLStore(
      (state: { setElements: (fn: (prev: WebGLElement[]) => WebGLElement[]) => void }) =>
        state.setElements,
    );
    const elementRef = useRef<HTMLDivElement>(null);
    const { isInitialized } = useScrollPosition();

    const memoResolution = useMemo(() => {
      return new THREE.Vector2(0, 0);
    }, []);

    // Process shader and uniforms when borderRadiusCorners is provided
    const processedShader = useMemo(() => {
      if (!borderRadiusCorners) return fragmentShader;
      return preprocessShaderForRoundedCorners(fragmentShader);
    }, [fragmentShader, borderRadiusCorners]);

    const processedUniforms = useMemo(() => {
      if (!borderRadiusCorners) return customUniforms;

      const maxRadius = Math.max(...borderRadiusCorners);
      const borderRadiusUniforms = {
        u_borderRadius: new THREE.Uniform(maxRadius),
        u_borderRadiusCorners: new THREE.Uniform(
          new THREE.Vector4(
            borderRadiusCorners[0],
            borderRadiusCorners[1],
            borderRadiusCorners[2],
            borderRadiusCorners[3],
          ),
        ),
      };

      return {
        ...customUniforms,
        ...borderRadiusUniforms,
      };
    }, [customUniforms, borderRadiusCorners]);

    const registerElement = useCallback(
      (element: HTMLDivElement | null) => {
        // Wait for scroll position to be initialized to prevent timing issues
        if (element && isInitialized) {
          // Wait for element to have actual dimensions before registering
          const checkDimensions = () => {
            const rect = element.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              memoResolution.set(rect.width, rect.height);
              setElements((prevElements: WebGLElement[]) => {
                const newElements = [
                  ...prevElements,
                  {
                    element,
                    fragmentShader: processedShader,
                    customUniforms: {
                      ...processedUniforms,
                      u_time: new THREE.Uniform(0),
                      u_imageResolution: {
                        value: memoResolution,
                      } as THREE.Uniform<THREE.Vector2>,
                    },
                  },
                ];
                return newElements;
              });
            } else {
              requestAnimationFrame(checkDimensions);
            }
          };

          requestAnimationFrame(checkDimensions);
        }
      },
      [setElements, processedShader, processedUniforms, memoResolution, isInitialized],
    );

    // Enhanced resize observer to handle aspect ratio properly
    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      const observer = new ResizeObserver((entries) => {
        entries.forEach(() => {
          if (!elementRef.current) return;

          const { width, height } = elementRef.current.getBoundingClientRect();
          memoResolution.set(width, height);
          onResize?.(width, height);
        });
      });

      // Window resize handler to trigger rect evaluation
      const handleWindowResize = () => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          memoResolution.set(rect.width, rect.height);
          onResize?.(rect.width, rect.height);
        }
      };

      setTimeout(() => {
        if (signal.aborted) return;
        handleWindowResize();
      }, 300);

      if (elementRef.current) {
        observer.observe(elementRef.current);

        // Initialize with current dimensions
        const rect = elementRef.current.getBoundingClientRect();
        memoResolution.set(rect.width, rect.height);
        onResize?.(rect.width, rect.height);
      }

      if (typeof window !== 'undefined') {
        observer.observe(window.document.body);
      }

      // Listen for window resize events
      window.addEventListener('resize', handleWindowResize);

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleWindowResize);
      };
    }, [memoResolution, onResize]);

    return (
      <div
        ref={mergeRefs(registerElement, elementRef, forwardedRef)}
        className="relative z-10 w-full min-w-full h-full min-h-full"
      />
    );
  },
);

WebGLView.displayName = 'WebGLView';
