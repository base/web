import { saveGlState } from 'apps/web/src/hooks/useSaveGlState';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { GLSL3, Group, OrthographicCamera, RawShaderMaterial, Texture } from 'three';

const fragmentShader = /* glsl */ `
precision highp float;

in vec2 vUv;

uniform sampler2D uMap;

out vec4 fragColor;

void main() {
  fragColor = texture(uMap, vUv);
}
`;

const vertexShader = /* glsl */ `
precision highp float;

in vec3 position;
in vec2 uv;

out vec2 vUv;

void main() {
  vUv = uv;

  gl_Position = vec4(position, 1.0);
}
`;

export type DebugTexturesProps = {
  hitConfig?: {
    scale: number;
  };
  textures: Record<string, Texture | undefined>;
  defaultTexture?: string;
};

export function DebugTextures({
  hitConfig,
  textures,
  defaultTexture = 'screen',
}: DebugTexturesProps) {
  const camera = useMemo(() => new OrthographicCamera(), []);
  const planeGeometryArgs = useMemo(() => [2, 2] as const, []);
  const numTextures = Object.keys(textures).length;

  const debugConfig = {
    debugTarget: defaultTexture,
  };

  const debugTextureProgram = useMemo(
    () =>
      new RawShaderMaterial({
        vertexShader,
        fragmentShader,
        glslVersion: GLSL3,
        uniforms: {
          uMap: { value: null },
        },
      }),
    [],
  );

  const grid = useMemo(() => {
    const sqrt = Math.sqrt(numTextures);
    const columns = Math.ceil(sqrt);
    const rows = Math.ceil(sqrt);
    const total = columns * rows;

    return {
      columns,
      rows,
      total,
    };
  }, [numTextures]);

  const debugScene = useMemo(() => new Group(), []);

  const size = useThree((state) => state.size);

  const DEFAULT_SCISSOR = {
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
  };

  useFrame((state) => {
    const { gl } = state;

    const resetGl = saveGlState(state);

    gl.autoClear = false;
    gl.setRenderTarget(null);

    gl.setViewport(
      DEFAULT_SCISSOR.x,
      DEFAULT_SCISSOR.y,
      DEFAULT_SCISSOR.width,
      DEFAULT_SCISSOR.height,
    );

    gl.setScissor(
      DEFAULT_SCISSOR.x,
      DEFAULT_SCISSOR.y,
      DEFAULT_SCISSOR.width,
      DEFAULT_SCISSOR.height,
    );

    const width = size.width;
    const height = size.height;

    const { columns, rows } = grid;

    if (debugConfig.debugTarget !== 'all' && debugConfig.debugTarget in textures) {
      if (hitConfig) {
        hitConfig.scale = 1;
      }
      debugTextureProgram.uniforms.uMap.value = textures[debugConfig.debugTarget];
      gl.render(debugScene, camera);
      resetGl();
      return;
    }

    if (hitConfig) {
      hitConfig.scale = columns;
    }

    for (let i = 0; i < numTextures; i++) {
      const col = i % columns;
      const row = rows - Math.floor(i / columns) - 1;

      const w = width / columns;
      const h = height / rows;
      const x = col * w;
      const y = row * h;

      gl.setViewport(x, y, w, h);

      debugTextureProgram.uniforms.uMap.value = textures[Object.keys(textures)[i]];

      gl.render(debugScene, camera);
    }

    gl.setViewport(
      DEFAULT_SCISSOR.x,
      DEFAULT_SCISSOR.y,
      DEFAULT_SCISSOR.width,
      DEFAULT_SCISSOR.height,
    );

    gl.setScissor(
      DEFAULT_SCISSOR.x,
      DEFAULT_SCISSOR.y,
      DEFAULT_SCISSOR.width,
      DEFAULT_SCISSOR.height,
    );
    resetGl();
  }, 1);

  return (
    <>
      {createPortal(
        <mesh>
          {/* eslint-disable-next-line react/no-unknown-property*/}
          <planeGeometry args={planeGeometryArgs} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <primitive object={debugTextureProgram} />
        </mesh>,
        debugScene,
      )}
    </>
  );
}
