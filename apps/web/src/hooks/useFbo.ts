import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import type { WebGLRenderTargetOptions } from 'three';

export function useFBO(
  width: number,
  height: number,
  options: WebGLRenderTargetOptions,
): THREE.WebGLRenderTarget {
  const target = useMemo(() => {
    const fbo = new THREE.WebGLRenderTarget(width, height, options);
    return fbo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    target.setSize(width, height);
  }, [width, height, target]);

  useEffect(() => {
    // dispose on unmount
    return () => {
      target.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return target;
}
