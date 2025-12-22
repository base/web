/* eslint-disable react/no-unknown-property */
'use client';

import { RenderTexture } from 'apps/web/src/components/WebGL/RenderTexture';
import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';
import { useFBO } from 'apps/web/src/hooks/useFbo';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { WebGlTunnelIn } from 'apps/web/src/components/WebGL/Tunnel';
import { useWebGLInteraction } from 'apps/web/src/hooks/useWebGLInteraction';
import { useShader } from 'apps/web/src/hooks/useShader';
import { cn } from 'apps/web/src/utils/cn';

const patternTexture = '/patterns/pat3.png';

const CELL_SIZE = 8.0;

const particleColorA = new THREE.Color('#0000FF');
const particleColorB = new THREE.Color('#FFD12F');
const particleColorC = new THREE.Color('#B6F569');

const getParticleColor = () => {
  const particleColor = new THREE.Color(1, 1, Math.random());
  return particleColor;
};

// Particle configuration interface
type ParticleConfig = {
  theta: number; // Horizontal angle in radians (0 to 2π)
  phi: number; // Vertical angle in radians (0 to π)
};

// Sample particle configuration
const PARTICLE_CONFIG: ParticleConfig[] = [
  {
    theta: Math.PI * 0.4,
    phi: Math.PI * 0.2,
  },
  {
    theta: Math.PI * -0.1,
    phi: Math.PI * 0.23,
  },
  {
    theta: Math.PI * -0.02,
    phi: Math.PI * 0.24,
  },
  {
    theta: Math.PI * 0.05,
    phi: Math.PI * 0.4,
  },
  {
    theta: Math.PI * -0.1,
    phi: Math.PI * 0.35,
  },
  {
    theta: Math.PI * -0.2,
    phi: Math.PI * 0.41,
  },
  {
    theta: Math.PI * 0.51,
    phi: Math.PI * 0.4,
  },
  {
    theta: Math.PI * 0.4,
    phi: Math.PI * 0.2,
  },
  {
    theta: Math.PI * 0.57,
    phi: Math.PI * 0.28,
  },
  {
    theta: Math.PI * 0.6,
    phi: Math.PI * 0.32,
  },
  {
    theta: Math.PI * -0.3,
    phi: Math.PI * 0.3,
  },
  {
    theta: Math.PI * -0.4,
    phi: Math.PI * 0.2,
  },
  {
    theta: Math.PI * -0.5,
    phi: Math.PI * 0.37,
  },
  {
    theta: Math.PI * -0.6,
    phi: Math.PI * 0.29,
  },
];

const fragmentShader = /* glsl */ `
    precision mediump float;

    uniform sampler2D uMap;
    uniform sampler2D uPattern;
    uniform vec2 u_imageResolution;
    uniform float uCellSize;
    
    varying vec2 v_uv;

    float getLuminance(vec3 color) {
        return dot(color, vec3(0.299, 0.587, 0.114));
    }

    const vec3 particleColorA = vec3(${particleColorA.toArray().join(', ')});
    const vec3 particleColorB = vec3(${particleColorB.toArray().join(', ')});
    const vec3 particleColorC = vec3(${particleColorC.toArray().join(', ')});

    vec3 getParticleColor(float colorIndex) {
        if (colorIndex < 0.333333) {
            return particleColorA;
        } else if (colorIndex < 0.666666) {
            return particleColorB;
        } else {
            return particleColorC;
        }
    }

    void main() {
        vec2 cellCoord = floor(v_uv * u_imageResolution / uCellSize);
        vec2 cellUV = (cellCoord * uCellSize) / u_imageResolution;
        vec2 cellSize = uCellSize / u_imageResolution;
        
        vec2 sampleUV = cellUV + cellSize * 0.5;
        vec4 originalColor = texture2D(uMap, sampleUV);
        float luminance = originalColor.r;

        bool isParticle = originalColor.g > 0.5;

        // debug map
        // gl_FragColor = vec4(originalColor);
        // return;
        
        vec2 localUV = mod(v_uv * u_imageResolution, uCellSize) / uCellSize;
        
        float patternIndex;
        bool isLowestLuminance = false;
        if (luminance < 0.1) {
            patternIndex = 0.;
            isLowestLuminance = true;
        }
        else if (luminance < 0.3) {
            patternIndex = 1.;
            isLowestLuminance = true;
        } else if (luminance < 0.5) {
            patternIndex = 2.;
        } else if (luminance < 0.7) {
            patternIndex = 3.;
        } else {
            patternIndex = 1.;
        }

        vec2 patternUV = vec2(
            (patternIndex * 64.0 + localUV.x * 64.0) / 256.0,
            localUV.y
        );
        
        vec4 patternColor = texture2D(uPattern, patternUV);
        
        vec3 backgroundColor = vec3(0.980, 0.980, 0.980);
        
        // bg lines color
        vec3 lowLuminanceColor = vec3(0.949, 0.949, 0.949);
        
        vec3 finalColor;
        if (isLowestLuminance) {
          finalColor = mix(backgroundColor, lowLuminanceColor, patternColor.a);
        } else {
          finalColor = mix(backgroundColor, patternColor.rgb, patternColor.a);
        }

        if (isParticle) {
          finalColor = getParticleColor(originalColor.b);
        }
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

function GlobeScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactionUniforms = useWebGLInteraction(containerRef);

  const isDragging = useRef(false);
  const previousMouseX = useRef(0);
  const velocity = useRef(0);
  const targetRotation = useRef(0);
  const damping = 0.95;
  const autoRotationSpeed = 0.0002;
  // const autoRotationSpeed = 0.0;
  const lerpStrength = 0.07;
  const maxRotationSpeed = 0.2;

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load('/textures/earth-texture.webp');
  }, []);

  const pattern = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const patternTex = loader.load(patternTexture);
    patternTex.wrapS = THREE.RepeatWrapping;
    patternTex.wrapT = THREE.RepeatWrapping;
    patternTex.minFilter = THREE.NearestFilter;
    patternTex.magFilter = THREE.NearestFilter;
    return patternTex;
  }, []);

  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(2, 32, 32);
  }, []);

  // Convert spherical coordinates to cartesian position on globe surface
  const sphericalToCartesian = useCallback((theta: number, phi: number, radius = 2) => {
    return {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta),
    };
  }, []);

  // Create particle system using Three.js Points
  const particleSystem = useMemo(() => {
    const particleCount = PARTICLE_CONFIG.length;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    PARTICLE_CONFIG.forEach((config, index) => {
      const position = sphericalToCartesian(config.theta, config.phi);
      const color = getParticleColor();

      // Set position
      positions[index * 3] = position.x * 1.01;
      positions[index * 3 + 1] = position.y * 1.01;
      positions[index * 3 + 2] = position.z * 1.01;

      // Set color
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;

      // Set size
      sizes[index] = 1.0;
    });

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      depthTest: true,
      depthWrite: true,
      sizeAttenuation: false,
    });

    const points = new THREE.Points(particleGeometry, material);

    points.renderOrder = 2;

    return points;
  }, [sphericalToCartesian]);

  const earthMaterial = useShader(
    {
      fragmentShader: /* glsl */ `
      precision mediump float;

      uniform sampler2D uMap;

      varying vec2 v_uv;

      void main() {
        vec4 color = texture2D(uMap, v_uv);
        float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));

        gl_FragColor = vec4(luminance, 0., 0., 1.0);
      }`,
      vertexShader: /* glsl */ `
        varying vec2 v_uv;

        void main() {
          v_uv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
    },
    {
      uMap: { value: texture },
    },
  );

  const [renderResult, setRenderResult] = useState<THREE.Texture | null>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Track if component is ready to be displayed (has stable dimensions)
  const [isReady, setIsReady] = useState(false);
  const [sizeStabilityTimer, setSizeStabilityTimer] = useState<NodeJS.Timeout | null>(null);

  const globeRef = useRef<THREE.Mesh>(null);

  const camera = useMemo(() => {
    const aspect = containerSize.width / containerSize.height || 1;
    const cam = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
    cam.position.set(-1, 0, 4);
    return cam;
  }, [containerSize.width, containerSize.height]);

  const customUniforms = useMemo(() => {
    return {
      uMap: new THREE.Uniform(renderResult),
      uPattern: new THREE.Uniform(pattern),
      uCellSize: new THREE.Uniform(8.0),
      ...interactionUniforms,
    };
  }, [renderResult, pattern, interactionUniforms]);

  const deviceRatio = window.devicePixelRatio || 1;

  const elementWidth =
    containerSize.width > 0 ? Math.floor((containerSize.width * deviceRatio) / CELL_SIZE) : 1;
  const elementHeight =
    containerSize.height > 0 ? Math.floor((containerSize.height * deviceRatio) / CELL_SIZE) : 1;

  const fbo = useFBO(elementWidth, elementHeight, {
    type: THREE.HalfFloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
  });

  const handleResize = useCallback(
    (width: number, height: number) => {
      const roundedWidth = Math.round(width);
      const roundedHeight = Math.round(height);

      setContainerSize((prev) => {
        if (Math.abs(prev.width - roundedWidth) < 1 && Math.abs(prev.height - roundedHeight) < 1) {
          return prev;
        }

        // Clear any existing timer
        if (sizeStabilityTimer) {
          clearTimeout(sizeStabilityTimer);
        }

        // Set new timer to mark component as ready after dimensions stabilize
        const newTimer = setTimeout(() => {
          if (roundedWidth > 0 && roundedHeight > 0) {
            setIsReady(true);
          }
        }, 100); // Wait 100ms for dimensions to stabilize

        setSizeStabilityTimer(newTimer);

        return { width: roundedWidth, height: roundedHeight };
      });
    },
    [sizeStabilityTimer],
  );

  const globePosition = useMemo(() => {
    return [0, -1, -1] as const;
  }, []);

  const globeRotation = useMemo(() => {
    return [0, 2, 0] as const;
  }, []);

  // handle scene dragging
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMouseX.current = e.clientX;
      velocity.current = 0;

      if (globeRef.current) {
        targetRotation.current = globeRef.current.rotation.y;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousMouseX.current;
      const rotationDelta = THREE.MathUtils.clamp(
        deltaX * 0.005,
        -maxRotationSpeed,
        maxRotationSpeed,
      );

      targetRotation.current += rotationDelta;

      velocity.current = rotationDelta;
      previousMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (globeRef.current) {
        if (isDragging.current) {
          globeRef.current.rotation.y = THREE.MathUtils.lerp(
            globeRef.current.rotation.y,
            targetRotation.current,
            lerpStrength,
          );
        } else {
          if (Math.abs(velocity.current) > 0.001) {
            globeRef.current.rotation.y += velocity.current;
            velocity.current *= damping;
          } else {
            globeRef.current.rotation.y += autoRotationSpeed * delta;
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [damping, autoRotationSpeed, lerpStrength]);

  // Run handleResize on mount with 100ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        handleResize(rect.width, rect.height);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [handleResize]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (sizeStabilityTimer) {
        clearTimeout(sizeStabilityTimer);
      }
    };
  }, [sizeStabilityTimer]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'h-full max-h-[100%] w-full cursor-grab overflow-hidden active:cursor-grabbing md:min-h-[100%] lg:min-h-[100%] xl:min-h-[100%]',
        className,
      )}
      style={{
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <WebGLView
        fragmentShader={fragmentShader}
        customUniforms={customUniforms}
        onResize={handleResize}
        borderRadiusCorners={[8, 8, 8, 8] as const}
      />
      {isReady && (
        <WebGlTunnelIn>
          <RenderTexture
            fbo={fbo}
            width={elementWidth}
            height={elementHeight}
            onMapTexture={setRenderResult}
            camera={camera}
            autoResize={false}
          >
            <ambientLight intensity={3.5} />
            <group
              ref={globeRef}
              dispose={null}
              scale={1}
              position={globePosition}
              rotation={globeRotation}
            >
              <mesh castShadow receiveShadow geometry={geometry} material={earthMaterial} />
              {/* Render particle system */}
              <primitive object={particleSystem} />
            </group>
          </RenderTexture>
        </WebGlTunnelIn>
      )}
    </div>
  );
}

export default GlobeScene;
