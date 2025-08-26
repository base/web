'use client';
import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';
import { useFBO } from 'apps/web/src/hooks/useFbo';
import { useCallback, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { WebGlTunnelIn } from 'apps/web/src/components/WebGL/Tunnel';
import { useWebGLInteraction } from 'apps/web/src/hooks/useWebGLInteraction';
import { Scene } from 'apps/web/src/components/Brand/Hero/Background/scene';
import defaultImg from 'apps/web/public/images/backgrounds/default.webp';

const patternAtlas = {
  url: '/patterns/pat7-colored.png',
  columns: 6,
};

const fragmentShader = /* glsl */ `
  precision mediump float;
  
  uniform sampler2D uMap;
  varying vec2 v_uv;

  void main() {
    gl_FragColor = texture2D(uMap, v_uv);
  }
`;

type AsciiFluidSceneProps = {
  className?: string;
  imageUrl?: string;
  enableInteractivity?: boolean;
  greyscale?: boolean;
  useImageColors?: boolean;
  radius?: number;
  velocityDissipation?: number;
  altPattern?: {
    url: string;
    columns: number;
  };
};

export default function AsciiFluidScene({
  className = '',
  imageUrl = defaultImg.src,
  enableInteractivity = true,
  greyscale = false,
  useImageColors = false,
  radius = 0.35,
  velocityDissipation = 0.9,
  altPattern,
}: AsciiFluidSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactionUniforms = useWebGLInteraction(containerRef);

  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const containerWidth = containerSize.width > 0 ? containerSize.width : 1;
  const containerHeight = containerSize.height > 0 ? containerSize.height : 1;

  const resolutionScale = 2.0;
  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const highResWidth = Math.round(containerWidth * resolutionScale * pixelRatio);
  const highResHeight = Math.round(containerHeight * resolutionScale * pixelRatio);

  const fbo = useFBO(highResWidth, highResHeight, {
    type: THREE.HalfFloatType,
    magFilter: THREE.LinearFilter,
    minFilter: THREE.LinearFilter,
  });

  const customUniforms = useMemo(() => {
    return {
      ...interactionUniforms,
      uMap: new THREE.Uniform(fbo.texture),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactionUniforms]);

  const handleResize = useCallback(
    (width: number, height: number) => {
      const roundedWidth = Math.round(width);
      const roundedHeight = Math.round(height);

      setContainerSize((prev) => {
        if (Math.abs(prev.width - roundedWidth) < 1 && Math.abs(prev.height - roundedHeight) < 1) {
          return prev;
        }
        return { width: roundedWidth, height: roundedHeight };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerSize],
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <WebGLView
        ref={containerRef}
        fragmentShader={fragmentShader}
        customUniforms={customUniforms}
        onResize={handleResize}
      />
      <WebGlTunnelIn>
        <Scene
          imageUrl={imageUrl}
          enableInteractivity={enableInteractivity}
          greyscale={greyscale}
          useImageColors={useImageColors}
          radius={radius}
          velocityDissipation={velocityDissipation}
          altPattern={altPattern ?? patternAtlas}
          externalFBO={fbo}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          interactionUniforms={interactionUniforms}
        />
      </WebGlTunnelIn>
    </div>
  );
}
