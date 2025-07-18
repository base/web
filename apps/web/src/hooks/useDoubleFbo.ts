import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import type { WebGLRenderTargetOptions } from 'three';

// TODO create vanilla versions

// export type DoubleFBO<TTexture extends THREE.Texture | THREE.Texture[] = THREE.Texture> = {
//   read: THREE.WebGLRenderTarget<TTexture>
//   write: THREE.WebGLRenderTarget<TTexture>
//   swap: () => void
//   dispose: () => void
//   resize: (width: number, height: number) => void
// }

export class DoubleFBO {
  public read: THREE.WebGLRenderTarget;

  public write: THREE.WebGLRenderTarget;

  constructor(width: number, height: number, options: WebGLRenderTargetOptions) {
    this.read = new THREE.WebGLRenderTarget(width, height, options);
    this.write = new THREE.WebGLRenderTarget(width, height, options);
  }

  get texture(): THREE.Texture {
    return this.read.texture;
  }

  get textures(): THREE.Texture[] {
    return [this.read.texture];
  }

  swap() {
    const temp = this.read;
    this.read = this.write;
    this.write = temp;
  }

  dispose() {
    this.read.dispose();
    this.write.dispose();
  }

  setSize(width: number, height: number) {
    this.read.setSize(width, height);
    this.write.setSize(width, height);
  }
}

export function useDoubleFBO(
  width: number,
  height: number,
  options: WebGLRenderTargetOptions,
): DoubleFBO {
  const fbo = useMemo(() => new DoubleFBO(width, height, options), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fbo.setSize(width, height);
  }, [width, height, fbo]);

  return fbo;
}
