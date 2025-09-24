/* eslint-disable react/no-unknown-property */
'use client';

import { RenderTexture } from 'apps/web/src/components/WebGL/RenderTexture';
import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';
import { useFBO } from 'apps/web/src/hooks/useFbo';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { WebGlTunnelIn } from 'apps/web/src/components/WebGL/Tunnel';
import { useWebGLInteraction } from 'apps/web/src/hooks/useWebGLInteraction';
import { Float } from '@react-three/drei';

const DEBUG = false;
const CAM_SIZE = 1.6;

const debugFragmentShader = /* glsl */ `
    precision mediump float;

    uniform sampler2D uMap;
    uniform sampler2D uPattern;
    uniform vec2 u_imageResolution;
    uniform float uCellSize;

    varying vec2 v_uv;

    void main() {
        vec4 color = texture2D(uMap, v_uv);
        gl_FragColor = color;
    }
`;

const fragmentShader = /* glsl */ `
    precision mediump float;

    uniform sampler2D uMap;
    uniform sampler2D uPattern;
    uniform vec2 u_imageResolution;
    uniform float uCellSize;
    
    varying vec2 v_uv;

    void main() {
        vec2 cellCoord = floor(v_uv * u_imageResolution / uCellSize);
        vec2 cellUV = (cellCoord * uCellSize) / u_imageResolution;
        vec2 cellSize = uCellSize / u_imageResolution;
        
        vec2 sampleUV = cellUV + cellSize * 0.5;
        vec4 originalColor = texture2D(uMap, sampleUV);
        
        vec3 backgroundColor = vec3(0.980, 0.980, 0.980);
        
        float contentStrength = length(originalColor.rgb);
        float hasContent = step(0.1, contentStrength);
        
        if (hasContent > 0.5) {
            vec2 pixelCoord = floor(v_uv * u_imageResolution);
            vec2 cellPixelCoord = mod(pixelCoord, uCellSize);
            vec2 localUV = cellPixelCoord / uCellSize;
            
            vec3 color = originalColor.rgb;
            float colorThreshold = 0.1;
            
            float patternIndex;
            
            // if it's white
            if (color.r > 0.8 && color.g > 0.8 && color.b > 0.8) {
                patternIndex = 5.;
            }
            // if it's red 
            else if (color.r > color.g + colorThreshold && color.r > color.b + colorThreshold) {
                patternIndex = 2.;
            }
            // if it's green 
            else if (color.g > color.r + colorThreshold && color.g > color.b + colorThreshold) {
                patternIndex = 3.;
            }
            // if it's blue 
            else if (color.b > color.r + colorThreshold && color.b > color.g + colorThreshold) {
                patternIndex = 4.;
            }
            // All other colors
            else {
                patternIndex = 5.;
            }
            
            vec2 patternUV = vec2(
                (patternIndex * 64.0 + localUV.x * 64.0) / 384.0,
                localUV.y
            );
            
            vec4 patternColor = texture2D(uPattern, patternUV);
            vec3 finalColor = mix(backgroundColor, patternColor.rgb, patternColor.a);
            gl_FragColor = vec4(finalColor, 1.0);
        } else {
            gl_FragColor = vec4(backgroundColor, 1.0);
        }
    }
`;

export function CardScene({
  gltfSrc,
  useRgbTexture = false,
  className,
  stretchZ,
  modelRotation = [-0.6, -0.6, 0] as const,
  patternTexture = '/models/upd/pat-cards.png',
}: {
  gltfSrc?: string;
  useRgbTexture?: boolean;
  className?: string;
  stretchZ?: number;
  modelRotation?: [number, number, number];
  patternTexture?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const interactionUniforms = useWebGLInteraction(containerRef);

  const boxRef = useRef<THREE.Mesh>(null);
  const gltfRef = useRef<THREE.Group>(null);

  const [pattern, setPattern] = useState<THREE.Texture | null>(null);

  const boxGeometry = useMemo(() => {
    return new THREE.BoxGeometry(2, 2, 2);
  }, []);

  const boxMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xff0000,
      roughness: 1.0,
      metalness: 0.0,
    });
  }, []);

  const [renderResult, setRenderResult] = useState<THREE.Texture | null>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const [gltfModel, setGltfModel] = useState<THREE.Group | null>(null);
  const [externalTexture, setExternalTexture] = useState<THREE.Texture | null>(null);

  const camera = useMemo(() => {
    const aspect = containerSize.width / containerSize.height || 1;
    const cam = new THREE.OrthographicCamera(
      -aspect * CAM_SIZE,
      aspect * CAM_SIZE,
      1 * CAM_SIZE,
      -1 * CAM_SIZE,
      0.1,
      20,
    );
    cam.position.set(0, 2, 1.5);
    cam.lookAt(0, 0, 0);
    return cam;
  }, [containerSize.width, containerSize.height]);

  const customUniforms = useMemo(() => {
    if (!pattern) return undefined;

    return {
      uMap: new THREE.Uniform(renderResult),
      uPattern: new THREE.Uniform(pattern),
      uCellSize: new THREE.Uniform(6.0),
      ...interactionUniforms,
    };
  }, [renderResult, pattern, interactionUniforms]);

  const fbo = useFBO(containerSize.width, containerSize.height, {
    type: THREE.HalfFloatType,
  });

  const handleResize = useCallback((width: number, height: number) => {
    const roundedWidth = Math.round(width);
    const roundedHeight = Math.round(height);
    setContainerSize((prev) => {
      if (Math.abs(prev.width - roundedWidth) < 1 && Math.abs(prev.height - roundedHeight) < 1) {
        return prev;
      }
      return { width: roundedWidth, height: roundedHeight };
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loader = new THREE.TextureLoader();
    const patternTex = loader.load(patternTexture);
    patternTex.wrapS = THREE.RepeatWrapping;
    patternTex.wrapT = THREE.RepeatWrapping;
    patternTex.minFilter = THREE.NearestFilter;
    patternTex.magFilter = THREE.NearestFilter;
    setPattern(patternTex);

    if (useRgbTexture) {
      const rgbTexturePath = '/textures/rgb-tex.jpg';
      loader.load(
        rgbTexturePath,
        (loadedTexture) => {
          loadedTexture.flipY = false;
          setExternalTexture(loadedTexture);
        },
        undefined,
        (error) => {
          console.error('Failed to load RGB texture:', rgbTexturePath, error);
        },
      );
    } else {
      setExternalTexture(null);
    }
  }, [useRgbTexture, patternTexture]);

  useEffect(() => {
    if (!gltfSrc) return;

    const loader = new GLTFLoader();
    loader.load(
      gltfSrc,
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxSize;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        setGltfModel(model);
      },
      undefined,
      (error: unknown) => {
        console.error('Error loading GLTF model:', gltfSrc, error);
      },
    );
  }, [gltfSrc]);

  useEffect(() => {
    if (!gltfModel || !externalTexture) return;

    gltfModel.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.map = externalTexture;
              mat.needsUpdate = true;
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.map = externalTexture;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [gltfModel, externalTexture]);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (gltfRef.current) {
        const mouseUV = interactionUniforms.u_mouseUV.value;
        const isHovered = interactionUniforms.u_isHovered.value;

        if (isHovered > 0 && mouseUV.x >= 0 && mouseUV.y >= 0) {
          const targetRotationY = (mouseUV.x - 0.5) * Math.PI * 0.33;
          const targetRotationX = -(mouseUV.y - 0.5) * Math.PI * 0.33;

          gltfRef.current.rotation.y = THREE.MathUtils.lerp(
            gltfRef.current.rotation.y,
            targetRotationY,
            0.08,
          );
          gltfRef.current.rotation.x = THREE.MathUtils.lerp(
            gltfRef.current.rotation.x,
            targetRotationX,
            0.08,
          );
        } else {
          gltfRef.current.rotation.y = THREE.MathUtils.lerp(gltfRef.current.rotation.y, 0, 0.05);
          gltfRef.current.rotation.x = THREE.MathUtils.lerp(gltfRef.current.rotation.x, 0, 0.05);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [interactionUniforms]);

  const width = containerSize.width > 0 ? containerSize.width : 1;
  const height = containerSize.height > 0 ? containerSize.height : 1;

  return (
    <div ref={containerRef} className={`overflow-hidden w-full h-full ${className}`}>
      <WebGLView
        fragmentShader={DEBUG ? debugFragmentShader : fragmentShader}
        customUniforms={customUniforms}
        onResize={handleResize}
        borderRadiusCorners={[8, 8, 8, 8] as const}
      />

      <WebGlTunnelIn>
        <RenderTexture
          fbo={fbo}
          width={width}
          height={height}
          onMapTexture={setRenderResult}
          camera={camera}
        >
          <ambientLight intensity={8} />

          {gltfModel ? (
            <Float speed={1.5} rotationIntensity={0.25} floatIntensity={1.25}>
              <group ref={gltfRef}>
                <group rotation={modelRotation} scale-z={stretchZ}>
                  <primitive object={gltfModel} />
                </group>
              </group>
            </Float>
          ) : (
            <mesh ref={boxRef} geometry={boxGeometry} material={boxMaterial} />
          )}
        </RenderTexture>
      </WebGlTunnelIn>
    </div>
  );
}
