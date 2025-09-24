import { RootState, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useShader } from 'apps/web/src/hooks/useShader';
import { useUniforms } from 'apps/web/src/hooks/useUniforms';
import { DoubleFBO } from 'apps/web/src/hooks/useDoubleFbo';

const baseVertex = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = uv;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const clearShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

const splatShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const advectionShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    gl_FragColor = dissipation * texture2D(uSource, coord);
    gl_FragColor.a = 1.0;
  }
`;

const divergenceShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const curlShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

const vorticityShader = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
  }
`;

const pressureShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const gradientSubtractShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

type FluidControls = {
  enabled: boolean;
  simRes: number;
  dyeRes: number;
  iterations: number;
  densityDissipation: number;
  velocityDissipation: number;
  pressureDissipation: number;
  curlStrength: number;
  radius: number;
};

type Splat = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

type FluidSystem = {
  density: DoubleFBO;
  velocity: DoubleFBO;
  pressure: DoubleFBO;
  divergence: THREE.WebGLRenderTarget;
  curl: THREE.WebGLRenderTarget;
  materials: {
    clear: THREE.ShaderMaterial;
    splat: THREE.ShaderMaterial;
    advection: THREE.ShaderMaterial;
    divergence: THREE.ShaderMaterial;
    curl: THREE.ShaderMaterial;
    vorticity: THREE.ShaderMaterial;
    pressure: THREE.ShaderMaterial;
    gradientSubtract: THREE.ShaderMaterial;
  };
  quadMesh: THREE.Mesh;
  tempScene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  splats: Splat[];
  splat: (x: number, y: number, dx: number, dy: number) => void;
  iterations: number;
  densityDissipation: number;
  velocityDissipation: number;
  cleanup: () => void;
};

type FluidResult = {
  texture: THREE.Texture | null;
};

type InteractionUniforms = {
  u_mouseUV: THREE.Uniform<THREE.Vector2>;
  u_isHovered: THREE.Uniform<number>;
  u_isPressed: THREE.Uniform<number>;
  u_isGrabbing: THREE.Uniform<number>;
};

type FluidConfig = {
  radius?: number;
  velocityDissipation?: number;
  densityDissipation?: number;
  simRes: number;
  dyeRes: number;
  interactionUniforms?: InteractionUniforms;
};

const velocityFBO = new DoubleFBO(128, 128, {
  minFilter: THREE.NearestFilter,
  magFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat,
  type: THREE.HalfFloatType,
  stencilBuffer: false,
  depthBuffer: false,
});

const densityFBO = new DoubleFBO(512, 512, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  type: THREE.HalfFloatType,
  stencilBuffer: false,
  depthBuffer: false,
});

const pressureFBO = new DoubleFBO(128, 128, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  type: THREE.HalfFloatType,
  stencilBuffer: false,
  depthBuffer: false,
});

export function useFluid(
  config: FluidConfig,
): [FluidControls, (state: RootState) => void, FluidResult] {
  const fluidSystemRef = useRef<FluidSystem | null>(null);
  const isInitializedRef = useRef(false);

  const initialConfigRef = useRef(config);

  const simRes = config.simRes ?? 128;
  const dyeRes = config.dyeRes ?? 512;
  const texelSize = useMemo(() => new THREE.Vector2(1 / simRes, 1 / simRes), [simRes]);

  const clearUniforms = useUniforms({
    texelSize: { value: texelSize },
    uTexture: { value: null as THREE.Texture | null },
    value: { value: 0.92 },
  });

  const splatUniforms = useUniforms({
    texelSize: { value: texelSize },
    uTarget: { value: null as THREE.Texture | null },
    aspectRatio: { value: 1 },
    color: { value: new THREE.Vector3() },
    point: { value: new THREE.Vector2() },
    radius: { value: (initialConfigRef.current.radius ?? 0.45) / 100 },
  });

  const advectionUniforms = useUniforms({
    texelSize: { value: texelSize },
    uVelocity: { value: null as THREE.Texture | null },
    uSource: { value: null as THREE.Texture | null },
    dt: { value: 0.016 },
    dissipation: { value: 1 },
  });

  const divergenceUniforms = useUniforms({
    texelSize: { value: texelSize },
    uVelocity: { value: null as THREE.Texture | null },
  });

  const curlUniforms = useUniforms({
    texelSize: { value: texelSize },
    uVelocity: { value: null as THREE.Texture | null },
  });

  const vorticityUniforms = useUniforms({
    texelSize: { value: texelSize },
    uVelocity: { value: null as THREE.Texture | null },
    uCurl: { value: null as THREE.Texture | null },
    curl: { value: 48 },
    dt: { value: 0.016 },
  });

  const pressureUniforms = useUniforms({
    texelSize: { value: texelSize },
    uPressure: { value: null as THREE.Texture | null },
    uDivergence: { value: null as THREE.Texture | null },
  });

  const gradientSubtractUniforms = useUniforms({
    texelSize: { value: texelSize },
    uPressure: { value: null as THREE.Texture | null },
    uVelocity: { value: null as THREE.Texture | null },
  });

  const clearMaterial = useShader(
    {
      vertexShader: baseVertex,
      fragmentShader: clearShader,
    },
    clearUniforms,
  );

  const splatMaterial = useShader(
    {
      vertexShader: baseVertex,
      fragmentShader: splatShader,
    },
    splatUniforms,
  );

  const advectionMaterial = useShader(
    {
      vertexShader: baseVertex,
      fragmentShader: advectionShader,
    },
    advectionUniforms,
  );

  const divergenceMaterial = useShader(
    {
      vertexShader: baseVertex,
      fragmentShader: divergenceShader,
    },
    divergenceUniforms,
  );

  const curlMaterial = useShader(
    {
      vertexShader: baseVertex,
      fragmentShader: curlShader,
    },
    curlUniforms,
  );

  const vorticityMaterial = useShader(
    {
      vertexShader: baseVertex,
      fragmentShader: vorticityShader,
    },
    vorticityUniforms,
  );

  const pressureMaterial = useShader(
    {
      vertexShader: baseVertex,
      fragmentShader: pressureShader,
    },
    pressureUniforms,
  );

  const gradientSubtractMaterial = useShader(
    {
      vertexShader: baseVertex,
      fragmentShader: gradientSubtractShader,
    },
    gradientSubtractUniforms,
  );

  const controls = useMemo(
    () => ({
      enabled: true,
      simRes: simRes,
      dyeRes: dyeRes,
      iterations: 6,
      densityDissipation: initialConfigRef.current.densityDissipation ?? 0.96,
      velocityDissipation: initialConfigRef.current.velocityDissipation ?? 0.9,
      pressureDissipation: 0.92,
      curlStrength: 48,
      radius: initialConfigRef.current.radius ?? 0.45,
    }),
    [simRes, dyeRes, initialConfigRef],
  );

  const gl = useThree((state) => state.gl);

  const lastMouseRef = useRef(new THREE.Vector2(-1, -1));
  const isMouseInitRef = useRef(false);
  const splatQueueRef = useRef<Splat[]>([]);

  // Use interaction uniforms if provided, otherwise fall back to global tracking
  useEffect(() => {
    if (config.interactionUniforms) {
      // No event listeners needed - we'll read from uniforms in render loop
      return;
    }

    // Fallback to global mouse tracking if no interaction uniforms provided
    const handleMouseMove = (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (!isMouseInitRef.current) {
        isMouseInitRef.current = true;
        lastMouseRef.current.set(x, y);
        return;
      }

      const deltaX = x - lastMouseRef.current.x;
      const deltaY = y - lastMouseRef.current.y;
      lastMouseRef.current.set(x, y);

      if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
        splatQueueRef.current.push({
          x: x / rect.width,
          y: 1 - y / rect.height,
          dx: deltaX * 3,
          dy: deltaY * -3,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl, config.interactionUniforms]);

  const initializeFluidSystem = useCallback(
    (renderer: THREE.WebGLRenderer) => {
      if (isInitializedRef.current) return fluidSystemRef.current;

      const simResolution = simRes;
      const iterations = 6;
      const densityDissipation = initialConfigRef.current.densityDissipation ?? 0.96;
      const velocityDissipation = initialConfigRef.current.velocityDissipation ?? 0.9;
      const pressureDissipation = 0.92;
      const curlStrength = 48;
      const radius = initialConfigRef.current.radius ?? 0.45;

      const geometry = new THREE.PlaneGeometry(2, 2);

      const density: DoubleFBO = densityFBO;
      const velocity: DoubleFBO = velocityFBO;
      const pressure: DoubleFBO = pressureFBO;

      const divergence = new THREE.WebGLRenderTarget(simResolution, simResolution, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
        stencilBuffer: false,
        depthBuffer: false,
      });
      const curl = new THREE.WebGLRenderTarget(simResolution, simResolution, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
        stencilBuffer: false,
        depthBuffer: false,
      });

      clearUniforms.value.value = pressureDissipation;
      splatUniforms.radius.value = radius / 100;
      vorticityUniforms.curl.value = curlStrength;

      const quadMesh = new THREE.Mesh(geometry, clearMaterial);
      const tempScene = new THREE.Scene();
      tempScene.add(quadMesh);
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      function splat(x: number, y: number, dx: number, dy: number) {
        splatUniforms.uTarget.value = velocity.read.texture;
        splatUniforms.aspectRatio.value = window.innerWidth / window.innerHeight;
        splatUniforms.point.value.set(x, y);
        splatUniforms.color.value.set(dx, dy, 1);
        (quadMesh.material as unknown) = splatMaterial;

        renderer.setRenderTarget(velocity.write);
        renderer.render(tempScene, camera);

        const tempV = velocity.read;
        velocity.read = velocity.write;
        velocity.write = tempV;

        splatUniforms.uTarget.value = density.read.texture;
        splatUniforms.color.value.set(
          Math.abs(dx) * 0.1 + 0.2,
          Math.abs(dy) * 0.1 + 0.3,
          Math.abs(dx + dy) * 0.05 + 0.5,
        );

        renderer.setRenderTarget(density.write);
        renderer.render(tempScene, camera);

        const tempD = density.read;
        density.read = density.write;
        density.write = tempD;
      }

      const fluidSystem = {
        density,
        velocity,
        pressure,
        divergence,
        curl,
        materials: {
          clear: clearMaterial,
          splat: splatMaterial,
          advection: advectionMaterial,
          divergence: divergenceMaterial,
          curl: curlMaterial,
          vorticity: vorticityMaterial,
          pressure: pressureMaterial,
          gradientSubtract: gradientSubtractMaterial,
        },
        quadMesh,
        tempScene,
        camera,
        splats: splatQueueRef.current,
        splat,
        iterations,
        densityDissipation,
        velocityDissipation,
        cleanup: () => {
          Object.values(fluidSystem.materials).forEach((material) =>
            (material as THREE.Material).dispose(),
          );

          divergence.dispose();
          curl.dispose();
          geometry.dispose();
        },
      };

      fluidSystemRef.current = fluidSystem;
      isInitializedRef.current = true;

      return fluidSystem;
    },
    [
      simRes,
      clearMaterial,
      splatMaterial,
      advectionMaterial,
      divergenceMaterial,
      curlMaterial,
      vorticityMaterial,
      pressureMaterial,
      gradientSubtractMaterial,
      clearUniforms,
      splatUniforms,
      vorticityUniforms,
    ],
  );

  const render = useCallback(
    (state: RootState) => {
      const renderer = state.gl;
      const fluidSystem = initializeFluidSystem(renderer);

      if (!fluidSystem) return;

      const { density, velocity, pressure, divergence, curl, quadMesh, tempScene, camera } =
        fluidSystem;

      const iterations = 6;
      const densityDissipation = initialConfigRef.current.densityDissipation ?? 0.96;
      const velocityDissipation = initialConfigRef.current.velocityDissipation ?? 0.9;
      const pressureDissipation = 0.92;
      const curlStrength = 48;
      const radius = initialConfigRef.current.radius ?? 0.45;

      clearUniforms.value.value = pressureDissipation;
      splatUniforms.radius.value = radius / 100;
      vorticityUniforms.curl.value = curlStrength;

      // Handle interaction uniforms if provided
      if (config.interactionUniforms) {
        const mouseUV = config.interactionUniforms.u_mouseUV.value;
        const isHovered = config.interactionUniforms.u_isHovered.value > 0.5;

        if (isHovered && mouseUV.x >= 0 && mouseUV.y >= 0) {
          if (!isMouseInitRef.current) {
            isMouseInitRef.current = true;
            lastMouseRef.current.copy(mouseUV);
          } else {
            const deltaX = (mouseUV.x - lastMouseRef.current.x) * 100;
            const deltaY = (mouseUV.y - lastMouseRef.current.y) * 100;

            if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
              fluidSystem.splat(mouseUV.x, mouseUV.y, deltaX * 5, deltaY * 5);
            }
            lastMouseRef.current.copy(mouseUV);
          }
        } else if (!isHovered) {
          isMouseInitRef.current = false;
          lastMouseRef.current.set(-1, -1);
        }
      } else {
        // Use the global queue system
        for (let i = splatQueueRef.current.length - 1; i >= 0; i--) {
          const s = splatQueueRef.current.splice(i, 1)[0];
          fluidSystem.splat(s.x, s.y, s.dx, s.dy);
        }
      }

      curlUniforms.uVelocity.value = velocity.read.texture;
      quadMesh.material = curlMaterial;
      renderer.setRenderTarget(curl);
      renderer.render(tempScene, camera);

      vorticityUniforms.uVelocity.value = velocity.read.texture;
      vorticityUniforms.uCurl.value = curl.texture;
      quadMesh.material = vorticityMaterial;
      renderer.setRenderTarget(velocity.write);
      renderer.render(tempScene, camera);
      velocity.swap();

      divergenceUniforms.uVelocity.value = velocity.read.texture;
      quadMesh.material = divergenceMaterial;
      renderer.setRenderTarget(divergence);
      renderer.render(tempScene, camera);

      clearUniforms.uTexture.value = pressure.read.texture;
      quadMesh.material = clearMaterial;
      renderer.setRenderTarget(pressure.write);
      renderer.render(tempScene, camera);
      pressure.swap();

      pressureUniforms.uDivergence.value = divergence.texture;
      for (let i = 0; i < iterations; i++) {
        pressureUniforms.uPressure.value = pressure.read.texture;
        quadMesh.material = pressureMaterial;
        renderer.setRenderTarget(pressure.write);
        renderer.render(tempScene, camera);
        pressure.swap();
      }

      gradientSubtractUniforms.uPressure.value = pressure.read.texture;
      gradientSubtractUniforms.uVelocity.value = velocity.read.texture;
      quadMesh.material = gradientSubtractMaterial;
      renderer.setRenderTarget(velocity.write);
      renderer.render(tempScene, camera);
      velocity.swap();

      advectionUniforms.uVelocity.value = velocity.read.texture;
      advectionUniforms.uSource.value = velocity.read.texture;
      advectionUniforms.dissipation.value = velocityDissipation;
      quadMesh.material = advectionMaterial;
      renderer.setRenderTarget(velocity.write);
      renderer.render(tempScene, camera);
      velocity.swap();

      advectionUniforms.uVelocity.value = velocity.read.texture;
      advectionUniforms.uSource.value = density.read.texture;
      advectionUniforms.dissipation.value = densityDissipation;
      quadMesh.material = advectionMaterial;
      renderer.setRenderTarget(density.write);
      renderer.render(tempScene, camera);
      density.swap();
    },
    [initializeFluidSystem], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const fluidResult = densityFBO;

  return [controls, render, fluidResult];
}
