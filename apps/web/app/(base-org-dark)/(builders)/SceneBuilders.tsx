import { useAsciiPatternBuilders } from './useAsciiPatternBuilders';
import { useFluid } from 'apps/web/src/components/Brand/Hero/Background/shaders/useFluid';
import { RootState, useFrame, useThree, createPortal } from '@react-three/fiber';
import { useCallback, useMemo } from 'react';
import { DebugTextures } from 'apps/web/src/components/Brand/Hero/Background/shaders/debugTextures';
import { hitConfig } from 'apps/web/src/components/Brand/Hero/Background/shaders/eventManager';
import * as THREE from 'three';
import { useFBO } from 'apps/web/src/hooks/useFbo';
import { DoubleFBO } from 'apps/web/src/hooks/useDoubleFbo';
import { saveGlState } from 'apps/web/src/hooks/useSaveGlState';

type AltPatternAtlas = {
  url: string;
  columns: number;
};

type InteractionUniforms = {
  u_mouseUV: THREE.Uniform<THREE.Vector2>;
  u_isHovered: THREE.Uniform<number>;
  u_isPressed: THREE.Uniform<number>;
  u_isGrabbing: THREE.Uniform<number>;
};

type SceneProps = {
  imageUrl: string;
  enableInteractivity?: boolean;
  altPattern?: AltPatternAtlas;
  greyscale?: boolean;
  useImageColors?: boolean;
  radius?: number;
  velocityDissipation?: number;
  densityDissipation?: number;
  externalFBO?: THREE.WebGLRenderTarget | null;
  containerWidth?: number;
  containerHeight?: number;
  interactionUniforms?: InteractionUniforms;
  darkMode?: boolean;
};

const DEBUG_TEXTURES = false;

// Simple fullscreen renderer for displaying the pattern texture
function FullscreenRenderer({ texture }: { texture: THREE.Texture }) {
  const size = useThree((state) => state.size);

  const camera = useMemo(() => new THREE.OrthographicCamera(), []);
  const scene = useMemo(() => new THREE.Scene(), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uMap;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(uMap, vUv);
        }
      `,
      uniforms: {
        uMap: { value: texture },
      },
    });
  }, [texture]);

  useFrame((state) => {
    const { gl } = state;

    const restoreGlState = saveGlState(state);

    material.uniforms.uMap.value = texture;

    gl.autoClear = false;
    gl.setRenderTarget(null);
    gl.setViewport(0, 0, size.width, size.height);
    gl.setScissor(0, 0, size.width, size.height);

    gl.render(scene, camera);

    restoreGlState();
  }, 1);

  return (
    <>
      {createPortal(
        <mesh>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <planeGeometry args={[2, 2] as const} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <primitive object={material} />
        </mesh>,
        scene,
      )}
    </>
  );
}

export function SceneBuilders({
  imageUrl,
  enableInteractivity = true,
  altPattern,
  greyscale = false,
  useImageColors = false,
  radius,
  velocityDissipation,
  densityDissipation,
  externalFBO = null,
  containerWidth,
  containerHeight,
  interactionUniforms,
  darkMode,
}: SceneProps) {
  const threeWidth = useThree((state) => Math.round(state.size.width));
  const threeHeight = useThree((state) => Math.round(state.size.height));

  const width = containerWidth ?? threeWidth;
  const height = containerHeight ?? threeHeight;

  const simRes = 128;
  const dyeRes = 512;

  const [, renderFluid, fluidResult] = useFluid({
    radius,
    velocityDissipation,
    densityDissipation,
    simRes,
    dyeRes,
    interactionUniforms,
  });

  const saturation = greyscale ? 0 : 1.0;
  const altPatternOpacity = greyscale ? 0.25 : 1.0;
  const useOriginalSvgColors = useImageColors ? false : greyscale ? false : true;

  const pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  const internalPatternRenderTarget = useFBO(width * pixelRatio, height * pixelRatio, {
    format: THREE.RGBAFormat,
    stencilBuffer: false,
  });

  const patternRenderTarget = externalFBO ?? internalPatternRenderTarget;

  const [, renderAscii, asciiResult] = useAsciiPatternBuilders({
    imageUrl,
    deformTexture: fluidResult as DoubleFBO,
    deformStrength: 0.05,
    saturation,
    altPatternOpacity,
    darkMode,
    useOriginalSvgColors,
    altPattern,
    patternRenderTarget,
    containerWidth: width,
    containerHeight: height,
    useWhiteBackground: externalFBO ? true : false,
  });

  const renderFrame = useCallback(
    (state: RootState, delta: number) => {
      if (enableInteractivity) {
        renderFluid(state);
      }
      renderAscii(state, delta);
    },
    [renderFluid, renderAscii, enableInteractivity],
  );

  const textures = useMemo(
    () => ({
      fluid: fluidResult.texture ?? undefined,
      ascii: asciiResult?.texture ?? undefined,
    }),
    [fluidResult.texture, asciiResult?.texture],
  );

  useFrame(renderFrame);

  if (DEBUG_TEXTURES) {
    return (
      <DebugTextures
        defaultTexture="screen"
        textures={textures}
        hitConfig={enableInteractivity ? hitConfig : undefined}
      />
    );
  }

  if (!externalFBO) {
    return <FullscreenRenderer texture={internalPatternRenderTarget.texture} />;
  }

  return null;
}
