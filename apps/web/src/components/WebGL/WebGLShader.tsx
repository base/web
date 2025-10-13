'use client';
import { useRef, useLayoutEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useScrollPosition } from 'apps/web/src/hooks/useScrollPosition';
import { useFrame } from '@react-three/fiber';

type DOMRect = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type SharedUniforms = {
  resolution: THREE.Vector2;
  scrollOffset: THREE.Vector2;
};

type NoiseImageProps = {
  domElement: HTMLElement;
  fragmentShader: string;
  customUniforms?: Record<string, THREE.Uniform>;
} & SharedUniforms;

const commonVertex = `
 precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_scrollOffset;
uniform vec2 u_domXY;
uniform vec2 u_domWH;
uniform float u_maxContentWidth;
uniform float u_horizontalPadding;

varying vec2 v_uv;

void main() {
	vec2 pixelXY = u_domXY - u_scrollOffset + u_domWH * 0.5;

	// solves issue when the screen was larger than max content width (1920px in our fcase)
	if (u_resolution.x > u_maxContentWidth) {
		float centeringOffset = (u_resolution.x - u_maxContentWidth) * 0.5;
		pixelXY.x -= centeringOffset;
	}

	pixelXY.y = u_resolution.y - pixelXY.y;

	// Apply horizontal padding
	vec2 adjustedDomWH = u_domWH;
	adjustedDomWH.x -= u_horizontalPadding * 2.0;

	pixelXY += position.xy * adjustedDomWH;
	vec2 xy = pixelXY / u_resolution * 2. - 1.;
	v_uv = uv;
	gl_Position = vec4(xy, 0., 1.0);
}
`;

export function WebGLShader({
  domElement,
  resolution,
  scrollOffset,
  fragmentShader,
  customUniforms,
}: NoiseImageProps) {
  const { getScrollPosition } = useScrollPosition();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hasValidDimensions, setHasValidDimensions] = useState(false);
  const rect = useRef<DOMRect>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useLayoutEffect(() => {
    let validationAttempts = 0;

    const updateRect = () => {
      const domRect = domElement.getBoundingClientRect();
      const { scrollTop, scrollX } = getScrollPosition();

      if (
        domRect.width === 0 ||
        domRect.height === 0 ||
        domRect.width < 10 ||
        domRect.height < 10
      ) {
        setHasValidDimensions(false);
        validationAttempts = 0;
        return false;
      }

      rect.current = {
        width: domRect.width,
        height: domRect.height,
        x: domRect.left + scrollX,
        y: domRect.top + scrollTop,
      };

      validationAttempts++;
      if (validationAttempts < 3) {
        setHasValidDimensions(false);
        return false;
      }

      setHasValidDimensions(true);
      return true;
    };

    const scheduledUpdate = () => {
      validationAttempts = 0;
      const tryUpdate = () => {
        if (!updateRect()) {
          requestAnimationFrame(tryUpdate);
        }
      };
      requestAnimationFrame(tryUpdate);
    };

    const resizeObserver = new ResizeObserver(() => {
      scheduledUpdate();
    });

    window.addEventListener('resize', scheduledUpdate);

    resizeObserver.observe(domElement);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduledUpdate);
    };
  }, [domElement, getScrollPosition]);

  const domWH = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const domXY = useRef<THREE.Vector2>(new THREE.Vector2(1, 1));
  const time = useRef(0);

  const uniforms = useMemo(
    () => ({
      u_domXY: { value: domXY.current },
      u_domWH: { value: domWH.current },
      u_resolution: { value: resolution },
      u_scrollOffset: { value: scrollOffset },
      u_maxContentWidth: { value: 1920 },
      u_horizontalPadding: { value: 0.0 },
      u_time: { value: 0 },
      ...customUniforms,
    }),
    [resolution, scrollOffset, customUniforms],
  );

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current || !hasValidDimensions) return;

    domWH.current.set(rect.current.width, rect.current.height);
    domXY.current.set(rect.current.x, rect.current.y);
    time.current = clock.getElapsedTime();
    materialRef.current.uniforms.u_time.value = time.current;
    materialRef.current.uniformsNeedUpdate = true;
  });

  // Don't render until we have valid dimensions
  if (!hasValidDimensions) {
    return null;
  }

  return (
    // eslint-disable-next-line react/no-unknown-property
    <mesh ref={meshRef} frustumCulled={false}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <planeGeometry args={[1, 1, 1, 1] as const} />
      <shaderMaterial
        ref={materialRef}
        // eslint-disable-next-line react/no-unknown-property
        uniforms={uniforms}
        // eslint-disable-next-line react/no-unknown-property
        vertexShader={commonVertex}
        // eslint-disable-next-line react/no-unknown-property
        fragmentShader={fragmentShader}
        // eslint-disable-next-line react/no-unknown-property
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
