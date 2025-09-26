'use client';
import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';
import { useImageTexture } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseJoin/InteractiveCard';
import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { useWebGLInteraction } from 'apps/web/src/hooks/useWebGLInteraction';
import notFoundImg from 'apps/web/public/images/backgrounds/ecosystem-no-results.webp';
import { customFragmentShader } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/VisionPreFooter';

export function NotFoundScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { imageTexture, imageDimensions } = useImageTexture(notFoundImg.src);
  const [patternAtlas, setPatternAtlas] = useState<THREE.Texture | null>(null);

  const interactionUniforms = useWebGLInteraction(containerRef.current, { smoothHover: true });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/patterns/pat-colorful.png', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.anisotropy = 1;
      setPatternAtlas(texture);
    });
  }, []);

  const customUniforms = useMemo(() => {
    if (!imageTexture) return undefined;

    const uniforms: Record<string, THREE.Uniform> = {
      uImage: new THREE.Uniform(imageTexture),
      uBaseTileSize: new THREE.Uniform(8),
      uPatternAtlasColumns: new THREE.Uniform(6),
      u_imageDimensions: new THREE.Uniform(
        new THREE.Vector2(imageDimensions.width, imageDimensions.height),
      ),
      uUseOriginalSvgColors: new THREE.Uniform(1.0),
      uAltPatternOpacity: new THREE.Uniform(1.0),
      ...interactionUniforms,
      u_isHovered: new THREE.Uniform(1.0),
    };

    if (patternAtlas) {
      uniforms.uPatternAtlas = new THREE.Uniform(patternAtlas);
    }

    return uniforms;
  }, [imageTexture, patternAtlas, imageDimensions, interactionUniforms]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-0 top-0 z-10 h-full w-full"
    >
      <div className="h-full w-full">
        <WebGLView fragmentShader={customFragmentShader} customUniforms={customUniforms} />
      </div>
    </div>
  );
}
