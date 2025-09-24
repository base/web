import { createPortal, type RootState, useFrame, useThree } from '@react-three/fiber';
import type { DomEvent } from '@react-three/fiber/dist/declarations/src/core/events';
import { saveGlState } from 'apps/web/src/hooks/useSaveGlState';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';

const noop = () => null;

type R3FObject = {
  __r3f: {
    parent: R3FObject | THREE.Object3D;
  };
};

export type PaintCanvasProps = {
  /** Whether the render target is active */
  isPlaying?: boolean;
  /** The width of the render target */
  width?: number;
  /** The height of the render target */
  height?: number;
  /** Attach the texture to a THREE.Object3D */
  attach?: string | null;
  /** Callback called when a new mapTexture is used */
  onMapTexture?: (texture: THREE.Texture) => void;
  /** Callback called when a new depthTexture is used */
  onDepthTexture?: (texture: THREE.DepthTexture) => void;
  /** Use a custom render target */
  fbo: THREE.WebGLRenderTarget;
  /** A scene to use as a container */
  containerScene?: THREE.Scene;
  /** Use global mouse coordinate to calculate raycast */
  useGlobalPointer?: boolean;
  /** Priority of the render frame */
  renderPriority?: number;
  /* mesh to use for raycasting */
  raycasterMesh?: THREE.Mesh;
  /** Custom camera to use for rendering */
  camera?: THREE.Camera;
  /** Whether to automatically resize the render target */
  autoResize?: boolean;
};

export const renderTextureContext = createContext<{
  isInsideRenderTexture: boolean;
  width: number;
  height: number;
  aspect: number;
  isPlaying: boolean;
}>({
  isInsideRenderTexture: false,
  width: 1024,
  height: 1024,
  aspect: 1,
  isPlaying: true,
});

export function RenderTexture({
  isPlaying: _playing = true,
  width = 1024,
  height = 1024,
  attach,
  fbo,
  onMapTexture,
  onDepthTexture,
  containerScene,
  children,
  useGlobalPointer,
  renderPriority,
  raycasterMesh,
  autoResize = true,
  camera,
}: PropsWithChildren<PaintCanvasProps>) {
  // once the canvas is loaded, force render

  useEffect(() => {
    if (onMapTexture) {
      onMapTexture(fbo.texture);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbo.texture]);

  useEffect(() => {
    if (onDepthTexture && fbo.depthTexture) {
      onDepthTexture(fbo.depthTexture);
    }
  }, [fbo.depthTexture, onDepthTexture]);

  const portalScene = useMemo(() => {
    return containerScene ?? new THREE.Scene();
  }, [containerScene]);

  const isPlayingRef = useRef(_playing);
  const [isPlaying, setIsPlaying] = useState(_playing);

  const viewportSize = useThree((state) => state.size);
  const viewportSizeRef = useRef(viewportSize);
  viewportSizeRef.current = viewportSize;

  useEffect(() => {
    if (autoResize) {
      fbo.setSize(width, height);
    }
    const abortController = new AbortController();
    const signal = abortController.signal;

    setIsPlaying(true);
    isPlayingRef.current = true;
    if (_playing) return;
    setTimeout(() => {
      if (signal.aborted) return;
      setIsPlaying(false);
      isPlayingRef.current = false;
    }, 100);

    return () => {
      abortController.abort();
    };
  }, [fbo, _playing, width, height, setIsPlaying, autoResize]);

  /** UV compute function relative to the viewport */
  const viewportUvCompute = useCallback(
    (event: DomEvent, state: RootState) => {
      if (!isPlayingRef.current) return;
      if (!viewportSizeRef.current) return;
      const { width: viewportWidth, height: viewportHeight, left, top } = viewportSizeRef.current;
      const x = event.clientX - left;
      const y = event.clientY - top;
      state.pointer.set((x / viewportWidth) * 2 - 1, -(y / viewportHeight) * 2 + 1);
      state.raycaster.setFromCamera(state.pointer, state.camera);
    },
    [viewportSizeRef, isPlayingRef],
  );

  /** UV compute relative to the parent mesh UV */
  const uvCompute = useCallback(
    (event: DomEvent, state: RootState, previous?: RootState) => {
      if (!isPlayingRef.current || !previous) return false;

      // eslint-disable-next-line no-underscore-dangle
      let parent = raycasterMesh ?? (fbo.texture as unknown as R3FObject)?.__r3f?.parent;
      while (parent && !(parent instanceof THREE.Object3D)) {
        // eslint-disable-next-line no-underscore-dangle
        parent = parent.__r3f?.parent;
      }
      if (!parent) return false;
      // First we call the previous state-onion-layers compute, this is what makes it possible to nest portals
      if (!previous.raycaster.camera) {
        previous.events.compute?.(event, previous, previous.previousRoot?.getState());
      }
      // We run a quick check against the parent, if it isn't hit there's no need to raycast at all
      const [intersection] = previous.raycaster.intersectObject(parent);

      if (!intersection) return false;
      // We take that hits uv coords, set up this layers raycaster, et voilà, we have raycasting on arbitrary surfaces
      const uv = intersection.uv;
      if (!uv) return false;
      state.raycaster.setFromCamera(state.pointer.set(uv.x * 2 - 1, uv.y * 2 - 1), state.camera);
    },
    [fbo.texture, raycasterMesh],
  );

  const contextValue = useMemo(
    () => ({
      isInsideRenderTexture: true,
      width,
      height,
      aspect: width / height,
      isPlaying,
    }),
    [width, height, isPlaying],
  );

  return (
    <>
      <renderTextureContext.Provider value={contextValue}>
        {createPortal(
          <SceneContainer fbo={fbo} renderPriority={renderPriority} camera={camera}>
            {children}
            {/* Without an element that receives pointer events state.pointer will always be 0/0 */}
            <group onPointerOver={noop} />
          </SceneContainer>,
          portalScene,
          {
            events: {
              compute: useGlobalPointer ? viewportUvCompute : uvCompute,
              priority: 0,
            },
          },
        )}
      </renderTextureContext.Provider>
      {/* eslint-disable-next-line react/no-unknown-property*/}
      <primitive object={fbo.texture} attach={attach} />
    </>
  );
}

export const useRenderTexture = () => {
  return useContext(renderTextureContext);
};

export type TextureRenderCallback = (params: {
  elapsedTime: number;
  state: RootState;
  delta: number;
  frame?: XRFrame;
}) => void;

export const useTextureFrame = (callback: TextureRenderCallback, priority?: number) => {
  const { isPlaying } = useRenderTexture();

  const elapsedTimeRef = useRef(0);
  useFrame((state, delta, frame) => {
    if (!isPlaying) return;
    elapsedTimeRef.current += delta;
    callback({
      elapsedTime: elapsedTimeRef.current,
      state,
      delta,
      frame,
    });
  }, priority);
};

type SceneContainerProps = {
  fbo: THREE.WebGLRenderTarget;
  renderPriority?: number;
  camera?: THREE.Camera;
};

function SceneContainer({
  fbo,
  renderPriority,
  camera,
  children,
}: PropsWithChildren<SceneContainerProps>) {
  useTextureFrame(({ state }) => {
    const restoreGlState = saveGlState(state);

    state.gl.setRenderTarget(fbo);
    state.gl.render(state.scene, camera ?? state.camera);

    restoreGlState();
  }, renderPriority);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
