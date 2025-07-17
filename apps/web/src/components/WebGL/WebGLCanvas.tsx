'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { memo, useCallback, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { useScrollPosition } from 'apps/web/src/hooks/useScrollPosition';
import { useWebGLStore, WebGLElement, WebGLStore } from 'apps/web/src/components/WebGL/webGlStore';
import { WebGlTunnelOut } from 'apps/web/src/components/WebGL/Tunnel';
import { WebGLShader } from 'apps/web/src/components/WebGL/WebGLShader';

type SharedUniforms = {
  resolution: THREE.Vector2;
  scrollOffset: THREE.Vector2;
};

type SceneProps = {
  updateScroll: () => void;
} & SharedUniforms;

const PADDING = 0.25;

const Scene = memo(({ resolution, scrollOffset }: Omit<SceneProps, 'updateScroll'>) => {
  const elements = useWebGLStore((state: WebGLStore) => state.elements);

  return elements.map(
    ({ element, fragmentShader, customUniforms }: WebGLElement, index: number) => (
      <WebGLShader
        // eslint-disable-next-line react/no-array-index-key
        key={`${element.id}-${index}`}
        domElement={element}
        resolution={resolution}
        scrollOffset={scrollOffset}
        fragmentShader={fragmentShader}
        customUniforms={customUniforms}
      />
    ),
  );
});

Scene.displayName = 'Scene';

function SceneWrapper({ updateScroll, resolution, scrollOffset }: SceneProps) {
  useFrame(({ scene, camera, gl }) => {
    updateScroll();
    gl.setRenderTarget(null);
    gl.render(scene, camera);
  }, 1);

  return <Scene resolution={resolution} scrollOffset={scrollOffset} />;
}

export function WebGLCanvas() {
  const { getScrollPosition } = useScrollPosition();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const resolution = useRef(new THREE.Vector2(1, 1));
  const scrollOffset = useRef(new THREE.Vector2(0, 0));

  const updateScroll = useCallback(() => {
    if (!wrapperRef.current) return;

    const { scrollTop, scrollX } = getScrollPosition();

    scrollOffset.current.set(scrollX, scrollTop - window.innerHeight * PADDING);

    wrapperRef.current.style.transform = `translate3d(${scrollOffset.current.x}px, ${scrollOffset.current.y}px, 0)`;
  }, [getScrollPosition]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;
      const vw = window.innerWidth;
      const canvasHeight = window.innerHeight * (1 + PADDING * 2);
      resolution.current.set(vw, canvasHeight);
      wrapperRef.current.style.width = `${vw}px`;
      wrapperRef.current.style.height = `${canvasHeight}px`;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute left-0 top-0 h-full w-full will-change-transform"
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <WebGlTunnelOut />
        <SceneWrapper
          scrollOffset={scrollOffset.current}
          resolution={resolution.current}
          updateScroll={updateScroll}
        />
      </Canvas>
    </div>
  );
}
