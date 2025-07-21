import {
  quadCamera,
  quadGeometry,
} from 'apps/web/src/components/Brand/Hero/Background/shaders/quads';

import { RenderCallback, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Scene, Vector2 } from 'three';
import { useMotionValue, animate } from 'framer-motion';

import { DoubleFBO } from 'apps/web/src/hooks/useDoubleFbo';
import { useShader } from 'apps/web/src/hooks/useShader';
import { useUniforms } from 'apps/web/src/hooks/useUniforms';
import { saveGlState } from 'apps/web/src/hooks/useSaveGlState';

type AltPatternAtlas = {
  url: string;
  columns: number; // Number of figures in the atlas
};

type AsciiPatternUniforms = {
  uImage: { value: THREE.Texture | null };
  uImageDimensions: { value: THREE.Vector2 };
  uResolution: { value: THREE.Vector2 };
  uPatternCount: { value: number };
  uBaseTileSize: { value: number };
  uTime: { value: number };
  uDeformTexture: { value: THREE.Texture | null };
  uDeformStrength: { value: number };
  uRandomSpeed: { value: number };
  uRandomSpread: { value: number };
  uRandomThreshold: { value: number };
  uUseWhiteBackground: { value: boolean };
  uSaturation: { value: number };
  uBrightness: { value: number };
  uContrast: { value: number };
  uExposure: { value: number };
  uAltPatternOpacity: { value: number };
  uEnableFadeTransition: { value: boolean };
  uFadeThreshold: { value: number };
  uFadeWidth: { value: number };
  uUseOriginalSvgColors: { value: boolean };
  uPatternAtlas: { value: THREE.Texture | null };
  uAltPatternAtlas: { value: THREE.Texture | null };
  uPatternAtlasColumns: { value: number };
  uAltPatternAtlasColumns: { value: number };
  uDarkMode: { value: boolean };
  uBottomFade: { value: boolean };
} & Record<string, THREE.IUniform>;

type UseAsciiPatternOptions = {
  imageUrl: string;
  deformTexture?: DoubleFBO;
  deformStrength?: number;
  randomSpeed?: number;
  randomSpread?: number;
  randomThreshold?: number;
  useWhiteBackground?: boolean;
  saturation?: number;
  altPatternOpacity?: number;
  enableFadeTransition?: boolean;
  fadeThreshold?: number;
  fadeWidth?: number;
  useOriginalSvgColors?: boolean;
  altPattern?: AltPatternAtlas;
  patternRenderTarget?: THREE.WebGLRenderTarget | null;
  containerWidth?: number;
  containerHeight?: number;
  darkMode?: boolean;
  bottomFade?: boolean;
};

export function useAsciiPattern({
  imageUrl,
  deformTexture,
  deformStrength = 0.1,
  randomSpeed = 0.1,
  randomSpread = 0.5,
  randomThreshold = 0.3,
  useWhiteBackground = true,
  saturation = 1.0,
  altPatternOpacity = 1.0,
  enableFadeTransition = false,
  fadeThreshold = 0.1,
  fadeWidth = 0.05,
  useOriginalSvgColors = true,
  altPattern,
  patternRenderTarget = null,
  containerWidth,
  containerHeight,
  darkMode = false,
  bottomFade = false,
}: UseAsciiPatternOptions) {
  const threeWidth = useThree((state) => Math.round(state.size.width));
  const threeHeight = useThree((state) => Math.round(state.size.height));

  const width = containerWidth ?? threeWidth;
  const height = containerHeight ?? threeHeight;

  const [imageTexture, setImageTexture] = useState<THREE.Texture | null>(null);
  const timeRef = useRef(0);
  const lastRenderTime = useRef(0);

  const FADE_IN_DURATION = 1.6;
  const brightnessMotion = useMotionValue(-1.0);
  const contrastMotion = useMotionValue(4.0);
  const exposureMotion = useMotionValue(-4.5);

  const postScene = useMemo(() => new Scene(), []);

  const uniforms = useUniforms<AsciiPatternUniforms>({
    uImage: { value: null },
    uImageDimensions: { value: new Vector2(1, 1) },
    uResolution: {
      value: new Vector2(1, 1),
    },
    uPatternCount: { value: 6 },
    uBaseTileSize: { value: 8 },
    uTime: { value: 0 },
    uDeformTexture: { value: deformTexture?.read.texture ?? null },
    uDeformStrength: { value: deformStrength },
    uRandomSpeed: { value: randomSpeed },
    uRandomSpread: { value: randomSpread },
    uRandomThreshold: { value: randomThreshold },
    uUseWhiteBackground: { value: useWhiteBackground },
    uSaturation: { value: saturation },
    uBrightness: { value: brightnessMotion.get() },
    uContrast: { value: contrastMotion.get() },
    uExposure: { value: exposureMotion.get() },
    uAltPatternOpacity: { value: altPatternOpacity },
    uEnableFadeTransition: { value: enableFadeTransition },
    uFadeThreshold: { value: fadeThreshold },
    uFadeWidth: { value: fadeWidth },
    uUseOriginalSvgColors: { value: useOriginalSvgColors },
    uPatternAtlas: { value: null },
    uAltPatternAtlas: { value: null },
    uPatternAtlasColumns: { value: 0 },
    uAltPatternAtlasColumns: { value: 0 },
    uDarkMode: { value: false },
    uBottomFade: { value: true },
  });

  useEffect(() => {
    const easeFn = [0.23, 1, 0.32, 1] as const;
    const duration = FADE_IN_DURATION;

    const animations = [
      animate(brightnessMotion, 0.0, { duration, ease: easeFn }),
      animate(contrastMotion, 1.0, { duration, ease: easeFn }),
      animate(exposureMotion, 0.0, { duration, ease: easeFn }),
    ];

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [brightnessMotion, contrastMotion, exposureMotion]);

  // react to changes in uniforms
  uniforms.uDeformTexture.value = deformTexture?.read.texture ?? null;
  uniforms.uDeformStrength.value = deformStrength;
  uniforms.uRandomSpeed.value = randomSpeed;
  uniforms.uRandomSpread.value = randomSpread;
  uniforms.uRandomThreshold.value = randomThreshold;
  uniforms.uResolution.value.set(width, height);
  uniforms.uUseWhiteBackground.value = useWhiteBackground;
  uniforms.uSaturation.value = saturation;
  uniforms.uBrightness.value = brightnessMotion.get();
  uniforms.uContrast.value = contrastMotion.get();
  uniforms.uExposure.value = exposureMotion.get();
  uniforms.uAltPatternOpacity.value = altPatternOpacity;
  uniforms.uEnableFadeTransition.value = enableFadeTransition;
  uniforms.uFadeThreshold.value = fadeThreshold;
  uniforms.uFadeWidth.value = fadeWidth;
  uniforms.uUseOriginalSvgColors.value = useOriginalSvgColors;
  uniforms.uDarkMode.value = darkMode;
  uniforms.uBottomFade.value = bottomFade;

  const shaderMaterial = useShader(
    {
      vertexShader: /*glsl*/ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /*glsl*/ `
        uniform sampler2D uImage;
        uniform vec2 uImageDimensions;
        uniform sampler2D uDeformTexture;
        uniform vec2 uResolution;
        uniform int uPatternCount;
        uniform float uBaseTileSize;
        uniform float uTime;
        uniform float uDeformStrength;
        uniform float uRandomSpeed;
        uniform float uRandomSpread;
        uniform float uRandomThreshold;
        uniform float uUseWhiteBackground;
        uniform float uSaturation;
        uniform float uBrightness;
        uniform float uContrast;
        uniform float uExposure;
        uniform float uAltPatternOpacity;
        uniform float uEnableFadeTransition;
        uniform float uFadeThreshold;
        uniform float uFadeWidth;
        uniform float uUseOriginalSvgColors;
        uniform sampler2D uPatternAtlas;
        uniform sampler2D uAltPatternAtlas;
        uniform int uPatternAtlasColumns;
        uniform int uAltPatternAtlasColumns;
        uniform float uDarkMode;
        uniform float uBottomFade;
        varying vec2 vUv;

        const float TIME_SPEED = 0.5;
        const float SPATIAL_FREQ = 0.008;
        const float TIME_AMPLITUDE = 0.1;

        float calculateLuminance(vec3 color) {
          return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
        }

        vec3 adjustSaturation(vec3 color, float saturation) {
          float luminance = calculateLuminance(color);
          return mix(vec3(luminance), color, saturation);
        }

        vec3 adjustBrightness(vec3 color, float brightness) {
          return clamp(color + brightness, 0.0, 1.0);
        }

        vec3 adjustContrast(vec3 color, float contrast) {
          return clamp((color - 0.5) * contrast + 0.5, 0.0, 1.0);
        }

        vec3 adjustExposure(vec3 color, float exposure) {
          return clamp(color * pow(2.0, exposure), 0.0, 1.0);
        }

        vec3 processImageColor(vec3 color) {
          color = adjustExposure(color, uExposure);
          color = adjustBrightness(color, uBrightness);
          color = adjustContrast(color, uContrast);
          color = adjustSaturation(color, uSaturation);

          return color;
        }

        vec4 samplePatternAtlas(sampler2D atlas, int atlasColumns, int patternIndex, vec2 uv) {
          float colIndex = float(patternIndex);
          vec2 atlasOffset = vec2(colIndex / float(atlasColumns), 0.0);
          vec2 atlasUV = (uv / vec2(float(atlasColumns), 1.0)) + atlasOffset;
          return texture2D(atlas, atlasUV);
        }

        vec2 getCoveredUV(vec2 uv, vec2 containerSize, vec2 imageSize) {
          vec2 containerAspect = containerSize / max(containerSize.x, containerSize.y);
          vec2 imageAspect = imageSize / max(imageSize.x, imageSize.y);

          vec2 scale = containerAspect / imageAspect;
          float scaleToFit = max(scale.x, scale.y);

          vec2 scaledSize = imageAspect * scaleToFit;
          vec2 offset = (containerAspect - scaledSize) * 0.5;

          vec2 adjustedUV = (uv * containerAspect - offset) / scaledSize;

          return adjustedUV;
        }

        vec3 getColorForIntensity(int patternIndex, float patternAlpha, bool useOriginalColors, vec3 originalColor, vec4 patternColor) {
          if (useOriginalColors) {
            vec3 backgroundColor = vec3(1.0, 1.0, 1.0);
            // apply color on svg content only
            if (patternAlpha < 0.001) {
              return backgroundColor;
            }

            if (uUseOriginalSvgColors > 0.5) {
              return mix(backgroundColor, patternColor.rgb, patternAlpha);
            } else {
              vec3 blendedColor = mix(backgroundColor, originalColor, patternAlpha);
              return mix(backgroundColor, blendedColor, uAltPatternOpacity);
            }
          } else {
            vec3 backgroundColor = vec3(1.0, 1.0, 1.0); // #fff
            vec3 svgColor = vec3(0.851, 0.851, 0.851); // #D9D9D9
            vec3 color1 = vec3(1.949, 1.949, 1.949);
            vec3 color2 = vec3(0.91, 0.91, 0.91);
            vec3 color2b = vec3(0.925, 0.925, 0.925);
            vec3 color3 = vec3(0.98, 0.98, 0.98);
            vec3 color4 = vec3(0.99, 0.99, 0.99);

            if (uDarkMode > 0.5) {
              backgroundColor = vec3(0.0, 0.0, 0.0);

              color1 = vec3(0.33, 0.33, 0.33);
              color2 = vec3(0.33, 0.33, 0.33);
              color2b = vec3(0.33, 0.33, 0.33);
              color3 = vec3(0.33, 0.33, 0.33);
              color4 = vec3(0.33, 0.33, 0.33);
            }

            if (patternAlpha < 0.001) {
              return backgroundColor;
            } else {
              vec3 baseColor;
              if (patternIndex <= 1) baseColor = color1;
              else if (patternIndex == 2) baseColor = color2;
              else if (patternIndex == 3) baseColor = color2b;
              else if (patternIndex <= 4) baseColor = color3;
              else baseColor = color4;
              return baseColor;
            }
          }
        }

        void main() {
          vec2 pix = gl_FragCoord.xy;
          vec2 tilePos = floor(pix / uBaseTileSize) * uBaseTileSize;
          vec2 tileCenterUV = (tilePos + uBaseTileSize * 0.5) / uResolution;
          vec2 adjustedTileCenter = getCoveredUV(tileCenterUV, uResolution, uImageDimensions);

          if (adjustedTileCenter.x < 0.0 || adjustedTileCenter.x > 1.0 || adjustedTileCenter.y < 0.0 || adjustedTileCenter.y > 1.0) {
            if (uDarkMode > 0.5) {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            } else {
              gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            }
            return;
          }

          vec3 originalCol = texture2D(uImage, adjustedTileCenter).rgb;
          originalCol = processImageColor(originalCol);

          if (length(originalCol) < 0.04) {
            if (uUseWhiteBackground > 0.5) {
              if (uDarkMode > 0.5) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
              } else {
                gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
              }
              return;
            } else {
              vec2 pixelInTile = mod(pix, uBaseTileSize);
              vec2 patternUV = pixelInTile / uBaseTileSize;
              vec4 patternColor = samplePatternAtlas(uPatternAtlas, uPatternAtlasColumns, 0, patternUV);

              vec3 backgroundColor = vec3(1.0, 1.0, 1.0);
              if (uDarkMode > 0.5) {
                backgroundColor = vec3(0.0, 0.0, 0.0);
              }

              // thin lines on black background
              if (patternColor.a < 0.001) {
                gl_FragColor = vec4(backgroundColor, 1.0);
              } else {
                gl_FragColor = vec4(vec3(0.98, 0.98, 0.98), 1.0);
              }
              return;
            }
          }

          float lum = calculateLuminance(originalCol);

          vec2 tileIndex = floor(pix / uBaseTileSize);
          float timeOffset = sin(uTime * TIME_SPEED + dot(tileIndex, vec2(SPATIAL_FREQ))) * TIME_AMPLITUDE;
          lum = clamp(lum + timeOffset, 0.0, 1.0);

          lum = 0.85 - lum;

          float scaledIntensity = lum * 5.0;

          int patternIndex;
          if (scaledIntensity < 0.5) patternIndex = 0;
          else if (scaledIntensity < 3.5) patternIndex = int(floor(scaledIntensity * 0.8)) + 1;
          else if (scaledIntensity < 5.0) patternIndex = 4;
          else patternIndex = 5;

          patternIndex = clamp(patternIndex, 0, 5);

          vec2 pixelInTile = mod(pix, uBaseTileSize);
          vec2 patternUV = pixelInTile / uBaseTileSize;

          vec3 deformColor = texture2D(uDeformTexture, adjustedTileCenter).rgb;
          float paintStrength = (deformColor.r + deformColor.g + deformColor.b) / 3.0;

          float transitionFactor = 0.0;
          bool useAltPatterns = false;

          if (uEnableFadeTransition > 0.5) {
            // Use smooth transition with fade
            float fadeStart = uFadeThreshold;
            float fadeEnd = uFadeThreshold + uFadeWidth;
            transitionFactor = smoothstep(fadeStart, fadeEnd, paintStrength);
            useAltPatterns = paintStrength > uFadeThreshold;
          } else {

            useAltPatterns = paintStrength > uFadeThreshold;
            transitionFactor = useAltPatterns ? 1.0 : 0.0;
          }

          vec4 altPatternColor;
          vec4 regularPatternColor;

          // Map pattern index to atlas index (reverse order for regular patterns)
          int regularAtlasIndex;
          if (patternIndex == 0) regularAtlasIndex = max(0, uPatternAtlasColumns - 1);
          else if (patternIndex == 1) regularAtlasIndex = max(0, uPatternAtlasColumns - 2);
          else if (patternIndex == 2) regularAtlasIndex = max(0, uPatternAtlasColumns - 3);
          else if (patternIndex == 3) regularAtlasIndex = max(0, uPatternAtlasColumns - 4);
          else if (patternIndex == 4) regularAtlasIndex = max(0, uPatternAtlasColumns - 5);
          else regularAtlasIndex = 0;

          // Alt patterns use forward order
          int altAtlasIndex = min(patternIndex, uAltPatternAtlasColumns - 1);

          altPatternColor = samplePatternAtlas(uAltPatternAtlas, uAltPatternAtlasColumns, altAtlasIndex, patternUV);
          regularPatternColor = samplePatternAtlas(uPatternAtlas, uPatternAtlasColumns, regularAtlasIndex, patternUV);

          vec4 patternColor = mix(regularPatternColor, altPatternColor, transitionFactor);

          vec3 altColor = getColorForIntensity(patternIndex, altPatternColor.a, true, originalCol, altPatternColor);
          vec3 regularColor = getColorForIntensity(patternIndex, regularPatternColor.a, false, originalCol, regularPatternColor);

          vec3 finalColor = mix(regularColor, altColor, transitionFactor);

          if (finalColor.r >= 0.999 && finalColor.g >= 0.999 && finalColor.b >= 0.999) {
            // Fallback patterns
            vec4 altFallbackPattern = samplePatternAtlas(uAltPatternAtlas, uAltPatternAtlasColumns, 1, patternUV);
            vec4 regularFallbackPattern;
            if (patternIndex <= 2) {
              regularFallbackPattern = samplePatternAtlas(uPatternAtlas, uPatternAtlasColumns, uPatternAtlasColumns - 2, patternUV);
            } else {
              regularFallbackPattern = samplePatternAtlas(uPatternAtlas, uPatternAtlasColumns, uPatternAtlasColumns - 3, patternUV);
            }

            vec3 altFallbackColor;
            vec3 backgroundColor = vec3(1.0, 1.0, 1.0);
            if (uDarkMode > 0.5) {
              backgroundColor = vec3(0.0, 0.0, 0.0);
            }

            if (altFallbackPattern.a < 0.001) {
              altFallbackColor = backgroundColor;
            } else {
              if (uUseOriginalSvgColors > 0.5) {
                altFallbackColor = mix(backgroundColor, altFallbackPattern.rgb, altFallbackPattern.a);
              } else {
                vec3 blendedColor = mix(backgroundColor, originalCol, altFallbackPattern.a);
                altFallbackColor = mix(backgroundColor, blendedColor, uAltPatternOpacity);
              }
            }

            vec3 regularFallbackColor;

            if (regularFallbackPattern.a < 0.001) {
              regularFallbackColor = backgroundColor;
            } else {
              regularFallbackColor = vec3(0.925, 0.925, 0.925);
            }

            finalColor = mix(regularFallbackColor, altFallbackColor, transitionFactor);
          }

          // Apply bottom fade to final output
          if (uBottomFade > 0.5) {
            float fadeStart = 0.3;
            float fadeStrength = smoothstep(0.0, fadeStart, vUv.y);
            fadeStrength = fadeStrength * fadeStrength * (3.0 - 2.0 * fadeStrength);
            finalColor = mix(uDarkMode > 0.5 ? vec3(0.0) : vec3(1.0), finalColor, fadeStrength);
          }

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    },
    uniforms,
  );

  useEffect(() => {
    const mesh = new THREE.Mesh(quadGeometry, shaderMaterial);
    postScene.add(mesh);

    return () => {
      postScene.remove(mesh);
    };
  }, [shaderMaterial, postScene]);

  useEffect(() => {
    const controller = new AbortController();
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      if (controller.signal.aborted) return;
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.anisotropy = 1;
      setImageTexture(texture);
    });

    return () => {
      controller.abort();
    };
  }, [imageUrl]);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load('/patterns/pat3.png', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.anisotropy = 1;
      uniforms.uPatternAtlas.value = texture;
      uniforms.uPatternAtlasColumns.value = 4;
    });

    const altPatternUrl = altPattern?.url ?? '/patterns/pat7-colored.png';
    const altPatternColumns = altPattern?.columns ?? 6;
    textureLoader.load(altPatternUrl, (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.anisotropy = 1;
      uniforms.uAltPatternAtlas.value = texture;
      uniforms.uAltPatternAtlasColumns.value = altPatternColumns;
    });
  }, [uniforms, altPattern]);

  const render = useCallback<RenderCallback>(
    (state) => {
      const { gl } = state;

      const now = performance.now();
      if (now - lastRenderTime.current < 33) {
        return;
      }
      lastRenderTime.current = now;
      timeRef.current += 0.05;

      // Save WebGL state before our renders
      const restoreGlState = saveGlState(state);

      uniforms.uTime.value = timeRef.current;
      uniforms.uImage.value = imageTexture;
      uniforms.uImageDimensions.value = imageTexture?.image
        ? new THREE.Vector2(imageTexture.image.width as number, imageTexture.image.height as number)
        : new THREE.Vector2(1, 1);
      uniforms.uDeformTexture.value = deformTexture?.read.texture ?? null;
      uniforms.uBrightness.value = brightnessMotion.get();
      uniforms.uContrast.value = contrastMotion.get();
      uniforms.uExposure.value = exposureMotion.get();

      gl.setRenderTarget(patternRenderTarget);
      gl.render(postScene, quadCamera);

      // Restore WebGL state
      restoreGlState();
    },
    [
      imageTexture,
      uniforms,
      deformTexture,
      patternRenderTarget,
      postScene,
      brightnessMotion,
      contrastMotion,
      exposureMotion,
    ],
  );

  return [uniforms, render, patternRenderTarget] as const;
}
