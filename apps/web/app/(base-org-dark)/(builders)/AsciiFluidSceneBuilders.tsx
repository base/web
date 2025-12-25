'use client';
import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';
import { useFBO } from 'apps/web/src/hooks/useFbo';
import { useCallback, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { WebGlTunnelIn } from 'apps/web/src/components/WebGL/Tunnel';
import { useWebGLInteraction } from 'apps/web/src/hooks/useWebGLInteraction';
import { SceneBuilders } from './SceneBuilders';
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

type AsciiFluidSceneBuildersProps = {
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
  darkMode?: boolean;
};

export default function AsciiFluidSceneBuilders({
  className = '',
  imageUrl = defaultImg.src,
  enableInteractivity = true,
  greyscale = false,
  useImageColors = false,
  radius = 0.35,
  velocityDissipation = 0.9,
  altPattern,
  darkMode = false,
}: AsciiFluidSceneBuildersProps) {
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

  const fbo = useFBO(containerWidth, containerHeight, {
    type: THREE.HalfFloatType,
    magFilter: THREE.NearestFilter,
    minFilter: THREE.NearestFilter,
  });

  const customUniforms = useMemo(() => {
    return {
      ...interactionUniforms,
      uMap: new THREE.Uniform(fbo.texture),
      uDarkMode: new THREE.Uniform(darkMode),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactionUniforms, fbo.texture, darkMode]);

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
        <SceneBuilders
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
          darkMode={darkMode}
        />
      </WebGlTunnelIn>
    </div>
  );
}
