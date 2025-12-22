'use client';

import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';
import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { useWebGLInteraction } from 'apps/web/src/hooks/useWebGLInteraction';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import NextImage from 'next/image';

type CardProps = {
  title: string;
  description: string;
  image: string;
  index: number;
  tileSize?: number;
  brightness?: number;
  contrast?: number;
  shader?: boolean;
};

type ImageDimensions = {
  width: number;
  height: number;
};

const articleStyle = {
  transformStyle: 'preserve-3d' as const,
};

const spanStyle = {
  transformStyle: 'preserve-3d' as const,
};

export const interactiveCardFragmentShader = /* glsl */ `
precision mediump float;

uniform sampler2D uImage;
uniform sampler2D uPatternAtlas;
uniform float uBaseTileSize;
uniform vec2 u_imageResolution;
uniform vec2 u_imageDimensions;
uniform float u_time;
uniform int uPatternAtlasColumns;
uniform float u_isHovered;
uniform float u_brightness;
uniform float u_contrast;

varying vec2 v_uv;

const float TIME_SPEED = 0.5;
const float SPATIAL_FREQ = 0.008;
const float TIME_AMPLITUDE = 0.1;

float calculateLuminance(vec3 color) {
  return 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
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

void main() {
  vec2 adjustedUV = getCoveredUV(v_uv, u_imageResolution, u_imageDimensions);

  if (adjustedUV.x < 0.0 || adjustedUV.x > 1.0 || adjustedUV.y < 0.0 || adjustedUV.y > 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec4 originalColor = texture2D(uImage, adjustedUV);

  float isHovered = u_isHovered;

  if (isHovered < 0.001) {
    gl_FragColor = originalColor;
    return;
  }

  vec2 pix = v_uv * u_imageResolution;
  vec2 tilePos = floor(pix / uBaseTileSize) * uBaseTileSize;
  vec2 tileCenterUV = (tilePos + uBaseTileSize * 0.5) / u_imageResolution;
  vec2 adjustedTileCenter = getCoveredUV(tileCenterUV, u_imageResolution, u_imageDimensions);

  vec3 tileColor = texture2D(uImage, adjustedTileCenter).rgb;

  tileColor = vec3(u_brightness) * tileColor;
  tileColor = vec3(u_contrast) * (tileColor - 0.5) + 0.5;

  float lum = calculateLuminance(tileColor);

  vec2 tileIndex = floor(pix / uBaseTileSize);
  float spatialOffset = dot(tileIndex, vec2(SPATIAL_FREQ));
  float timeOffset = sin(u_time * TIME_SPEED + spatialOffset) * TIME_AMPLITUDE;

  float secondaryOffset = cos(u_time * TIME_SPEED * 0.7 + spatialOffset * 1.3) * TIME_AMPLITUDE * 0.6;

  lum = clamp(lum + timeOffset + secondaryOffset, 0.0, 1.0);

  lum = 1.0 - lum;

  float smoothedLum = smoothstep(0.0, 1.0, lum);

  int patternIndex;

  if (smoothedLum < 0.2) {
    patternIndex = 5;
  } else if (smoothedLum < 0.4) {
    patternIndex = 4;
  } else if (smoothedLum < 0.6) {
    patternIndex = 3;
  } else if (smoothedLum < 0.8) {
    patternIndex = 2;
  } else {
    patternIndex = 0;
  }

  vec2 pixelInTile = mod(pix, uBaseTileSize);
  vec2 patternUV = pixelInTile / uBaseTileSize;

  vec4 patternSample = samplePatternAtlas(uPatternAtlas, uPatternAtlasColumns, patternIndex, patternUV);

  vec3 darkColor = tileColor * 0.2;
  vec3 patternColor = mix(darkColor, tileColor, patternSample.a);

  vec3 finalColor = mix(originalColor.rgb, patternColor, isHovered);

  gl_FragColor = vec4(finalColor, originalColor.a);
}
`;

export const useImageTexture = (imagePath: string) => {
  const [imageTexture, setImageTexture] = useState<THREE.Texture | null>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({
    width: 1,
    height: 1,
  });

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    let texture: THREE.Texture | null = null;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });

      texture = textureLoader.load(
        imagePath,
        (loadedTexture) => {
          loadedTexture.wrapS = loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
          loadedTexture.magFilter = THREE.LinearFilter;
          loadedTexture.minFilter = THREE.LinearFilter;
          setImageTexture(loadedTexture);
        },
        (progress) => {
          console.log('Image texture loading progress:', progress);
        },
        (error) => {
          console.error('Failed to load image texture:', error);
        },
      );
    };

    img.onerror = (error) => {
      console.error('Failed to load image for dimensions:', error);
      setImageDimensions({ width: 1, height: 1 });
    };

    img.src = imagePath;

    return () => {
      if (texture) {
        texture.dispose();
      }
    };
  }, [imagePath]);

  return { imageTexture, imageDimensions };
};

export function InteractiveCard({
  shader = true,
  title,
  description,
  image,
  tileSize = 8,
  brightness = 1,
  contrast = 1,
}: CardProps) {
  const imagePath = image;
  const cardRef = useRef<HTMLElement>(null);

  const { imageTexture, imageDimensions } = useImageTexture(imagePath);
  const [patternAtlas, setPatternAtlas] = useState<THREE.Texture | null>(null);

  const interactionUniforms = useWebGLInteraction(cardRef.current, { smoothHover: true });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/patterns/pat-candles.svg', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.anisotropy = 1;
      setPatternAtlas(texture);
    });
  }, []);

  const customUniforms = useMemo(() => {
    if (!imageTexture) return undefined;

    const uniforms: Record<string, THREE.Uniform> = {
      uImage: new THREE.Uniform(imageTexture),
      uBaseTileSize: new THREE.Uniform(tileSize),
      uPatternAtlasColumns: new THREE.Uniform(6),
      u_brightness: new THREE.Uniform(brightness),
      u_contrast: new THREE.Uniform(contrast),
      u_imageDimensions: new THREE.Uniform(
        new THREE.Vector2(imageDimensions.width, imageDimensions.height),
      ),
      ...interactionUniforms,
    };

    if (patternAtlas) {
      uniforms.uPatternAtlas = new THREE.Uniform(patternAtlas);
    }

    return uniforms;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageTexture, patternAtlas, tileSize, brightness, contrast]);

  return (
    <article
      ref={cardRef}
      className="hover:bg-base-grey-10 group relative flex h-full w-full transform-gpu cursor-pointer flex-col !rounded-[8px] transition-colors duration-200 will-change-transform"
      style={articleStyle}
    >
      <span
        className="relative block aspect-square w-full flex-shrink-0 transform-gpu overflow-hidden rounded-[8px]"
        style={spanStyle}
      >
        <div className="w-full h-full">
          <div className="overflow-hidden relative w-full h-full">
            {shader ? (
              <WebGLView
                fragmentShader={interactiveCardFragmentShader}
                customUniforms={customUniforms}
                borderRadiusCorners={[8, 8, 0, 0] as const}
              />
            ) : (
              <NextImage
                src={imagePath}
                width={imageDimensions.width}
                height={imageDimensions.height}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
              />
            )}
          </div>
        </div>
      </span>
      <div className="flex min-h-[140px] w-full flex-1 flex-col justify-start gap-2 py-6">
        <Title level={TitleLevel.H2Regular}>{title}</Title>
        <Text
          variant={TextVariant.Body}
          className="block min-h-[3.75em] overflow-hidden !text-base-gray-200"
        >
          {description}
        </Text>
      </div>
    </article>
  );
}
