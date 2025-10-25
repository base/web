'use client';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Redesign/Button';
import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';
import { useImageTexture } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseJoin/InteractiveCard';
import { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { useWebGLInteraction } from 'apps/web/src/hooks/useWebGLInteraction';
import prefooterImg from 'apps/web/public/images/backgrounds/prefooter.webp';
import Link from 'apps/web/src/components/Link';

export const customFragmentShader = /* glsl */ `
precision mediump float;

uniform sampler2D uImage;
uniform sampler2D uPatternAtlas;
uniform float uBaseTileSize;
uniform vec2 u_imageResolution;
uniform vec2 u_imageDimensions;
uniform float u_time;
uniform int uPatternAtlasColumns;
uniform float u_isHovered;
uniform float uUseOriginalSvgColors;
uniform float uAltPatternOpacity;

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
   
   // Move texture up by adjusting the Y offset
   offset.y += 0.05; // Adjust this value to move more/less

   vec2 adjustedUV = (uv * containerAspect - offset) / scaledSize;

   return adjustedUV;
 }

 vec3 getColorForIntensity(int patternIndex, float patternAlpha, bool useOriginalColors, vec3 originalColor, vec4 patternColor) {
   // Use RGBA(250, 250, 250, 1) as background color
   vec3 backgroundColor = vec3(0.9804, 0.9804, 0.9804); // 250/255 = 0.9804
   
   if (useOriginalColors) {
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
     if (patternAlpha < 0.001) {
       return backgroundColor;
     } else {
       return vec3(0.925, 0.925, 0.925);
     }
   }
 }

void main() {
  vec2 adjustedUV = getCoveredUV(v_uv, u_imageResolution, u_imageDimensions);

     if (adjustedUV.x < 0.0 || adjustedUV.x > 1.0 || adjustedUV.y < 0.0 || adjustedUV.y > 1.0) {
     // render background color for out-of-bounds areas
     gl_FragColor = vec4(0.9804, 0.9804, 0.9804, 1.0);
     return;
   }

  vec4 originalColor = texture2D(uImage, adjustedUV);

  if (u_isHovered < 0.001) {
         gl_FragColor = originalColor;
     // replace black artifacts with background color
     if (gl_FragColor.r < 0.01 && gl_FragColor.g < 0.01 && gl_FragColor.b < 0.01) {
       gl_FragColor = vec4(0.9804, 0.9804, 0.9804, gl_FragColor.a);
     }
    return;
  }

  vec2 pix = v_uv * u_imageResolution;
  vec2 tilePos = floor(pix / uBaseTileSize) * uBaseTileSize;
  vec2 tileCenterUV = (tilePos + uBaseTileSize * 0.5) / u_imageResolution;
  vec2 adjustedTileCenter = getCoveredUV(tileCenterUV, u_imageResolution, u_imageDimensions);

  vec3 tileColor = texture2D(uImage, adjustedTileCenter).rgb;

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
    patternIndex = 4;
  } else if (smoothedLum < 0.4) {
    patternIndex = 3;
  } else if (smoothedLum < 0.6) {
    patternIndex = 2;
  } else if (smoothedLum < 0.8) {
    patternIndex = 1;
     } else if (smoothedLum < 0.9) {
     patternIndex = 0;
   } else {
     // Render background color instead of black
     gl_FragColor = vec4(0.9804, 0.9804, 0.9804, originalColor.a);
     return;
   }

  vec2 pixelInTile = mod(pix, uBaseTileSize);
  vec2 patternUV = pixelInTile / uBaseTileSize;

  vec4 patternSample = samplePatternAtlas(uPatternAtlas, uPatternAtlasColumns, patternIndex, patternUV);

  vec3 finalColor = getColorForIntensity(patternIndex, patternSample.a, true, tileColor, patternSample);

  vec3 result = mix(originalColor.rgb, finalColor, u_isHovered);

     gl_FragColor = vec4(result, originalColor.a);
   
   // Final safety check - replace any black pixels with background color
   if (gl_FragColor.r < 0.01 && gl_FragColor.g < 0.01 && gl_FragColor.b < 0.01) {
     gl_FragColor = vec4(0.9804, 0.9804, 0.9804, gl_FragColor.a);
   }
}
`;

export default function ResourcesBuildWithUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { imageTexture, imageDimensions } = useImageTexture(prefooterImg.src);
  const [patternAtlas, setPatternAtlas] = useState<THREE.Texture | null>(null);

  const interactionUniforms = useWebGLInteraction(containerRef.current, { smoothHover: true });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/patterns/pat-colorful.png', (texture) => {
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
      uBaseTileSize: new THREE.Uniform(8),
      uPatternAtlasColumns: new THREE.Uniform(6),
      u_imageDimensions: new THREE.Uniform(
        new THREE.Vector2(imageDimensions.width, imageDimensions.height),
      ),
      uUseOriginalSvgColors: new THREE.Uniform(1.0),
      uAltPatternOpacity: new THREE.Uniform(1.0),
      ...interactionUniforms,
      u_isHovered: new THREE.Uniform(1.0),
    };

    if (patternAtlas) {
      uniforms.uPatternAtlas = new THREE.Uniform(patternAtlas);
    }

    return uniforms;
  }, [imageTexture, patternAtlas, imageDimensions, interactionUniforms]);

  return (
    <section className="relative grid grid-cols-9 gap-8 rounded-lg bg-base-gray-25 p-6 lg:h-[690px] lg:rounded-none lg:bg-transparent lg:p-0">
      <div
        ref={containerRef}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-full lg:block"
      >
        <div className="h-full w-full">
          <WebGLView
            fragmentShader={customFragmentShader}
            customUniforms={customUniforms}
            borderRadiusCorners={[8, 8, 8, 8]}
          />
        </div>
      </div>
      <div className="z-20 col-span-full flex flex-col gap-10 lg:col-span-4 lg:col-start-5 lg:justify-center">
        <Title level={TitleLevel.H4Regular} as="h2">
          Start building with us.
        </Title>
        <Title level={TitleLevel.H6Regular} as="h3">
          There&apos;s a place for you on Base.
          <br />
          Let&apos;s build a better internet, together.
        </Title>
        <div className="pointer-events-auto col-span-full flex w-full items-center gap-2">
          <Button variant={ButtonVariants.Secondary} className="w-full lg:max-w-60" asChild>
            <Link
              target="_blank"
              href="https://lu.ma/base-virtualevents/?utm_source=dotorg&medium=builderkit" rel="noopener"
            >
              Virtual events
            </Link>
          </Button>
          <Button className="w-full lg:max-w-52">
            <Link
              target="_blank"
              href="https://docs.base.org/docs/?utm_source=dotorg&utm_medium=builderkit" rel="noopener"
            >
              View our docs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
