'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';

type AsciiSceneProps = {
  imagePath?: string;
  verticalAlign?: 'top' | 'center' | 'bottom';
  className?: string;
  tileSize?: number;
  useWhiteBackground?: boolean;
  saturation?: number;
  maxWidth?: number;
  maxHeight?: number;
};

export default function AsciiScene({
  imagePath = '/images/backgrounds/clouds.webp',
  className = '',
  tileSize = 8,
  useWhiteBackground = false,
  saturation = 1.0,
  maxWidth,
  maxHeight,
}: AsciiSceneProps) {
  const [imageTexture, setImageTexture] = useState<THREE.Texture | null>(null);
  const [patternAtlas, setPatternAtlas] = useState<THREE.Texture | null>(null);
  const [altPatternAtlas, setAltPatternAtlas] = useState<THREE.Texture | null>(null);
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(1);
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});

  const calculateResponsiveSize = useCallback(
    (aspectRatio: number, maxW?: number, maxH?: number) => {
      const baseStyle: React.CSSProperties = {
        aspectRatio: aspectRatio.toString(),
        width: '100%',
        height: 'auto',
      };

      if (!maxW && !maxH) {
        return {
          ...baseStyle,
          maxWidth: '100%',
          maxHeight: '100%',
        };
      }

      if (maxW && maxH) {
        const constraintAspect = maxW / maxH;
        if (aspectRatio > constraintAspect) {
          return {
            ...baseStyle,
            maxWidth: `${maxW}px`,
          };
        } else {
          return {
            ...baseStyle,
            maxHeight: `${maxH}px`,
            width: 'auto',
            height: '100%',
          };
        }
      } else if (maxW) {
        return {
          ...baseStyle,
          maxWidth: `${maxW}px`,
        };
      } else if (maxH) {
        return {
          ...baseStyle,
          maxHeight: `${maxH}px`,
          width: 'auto',
          height: '100%',
        };
      }

      return baseStyle;
    },
    [],
  );

  const handleResize = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_width: number, _height: number) => {
      if (imageAspectRatio) {
        const newStyle = calculateResponsiveSize(imageAspectRatio, maxWidth, maxHeight);
        setContainerStyle(newStyle);
      }
    },
    [imageAspectRatio, maxWidth, maxHeight, calculateResponsiveSize],
  );

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imagePath,
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;

        const image = texture.image as HTMLImageElement;
        if (image?.width && image.height) {
          const aspectRatio = image.width / image.height;
          setImageAspectRatio(aspectRatio);
        }

        setImageTexture(texture);
      },
      undefined,
      (error) => {
        console.error('Failed to load image texture:', error);
      },
    );
  }, [imagePath]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    loader.load('/patterns/pat3.png', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.anisotropy = 1;
      setPatternAtlas(texture);
    });

    loader.load('/patterns/pat7-colored.png', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.anisotropy = 1;
      setAltPatternAtlas(texture);
    });
  }, []);

  const fragmentShader = `
    precision mediump float;
    
    uniform vec2 u_imageResolution;
    uniform float u_time;
    uniform sampler2D u_imageTexture;
    uniform sampler2D u_patternAtlas;
    uniform sampler2D u_altPatternAtlas;
    uniform float u_tileSize;
    uniform float u_useWhiteBackground;
    uniform float u_saturation;
    uniform int u_patternAtlasColumns;
    uniform int u_altPatternAtlasColumns;
    
    varying vec2 v_uv;

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

    vec4 samplePatternAtlas(sampler2D atlas, int atlasColumns, int patternIndex, vec2 uv) {
      float colIndex = float(patternIndex);
      vec2 atlasOffset = vec2(colIndex / float(atlasColumns), 0.0);
      vec2 atlasUV = (uv / vec2(float(atlasColumns), 1.0)) + atlasOffset;
      return texture2D(atlas, atlasUV);
    }

    vec3 getColorForIntensity(int patternIndex, float patternAlpha) {
      vec3 backgroundColor = vec3(1.0, 1.0, 1.0);
      
      if (patternAlpha < 0.001) {
        return backgroundColor;
      }

      vec3 color1 = vec3(0.949, 0.949, 0.949);
      vec3 color2 = vec3(0.91, 0.91, 0.91);
      vec3 color2b = vec3(0.925, 0.925, 0.925);
      vec3 color3 = vec3(0.98, 0.98, 0.98);
      vec3 color4 = vec3(0.99, 0.99, 0.99);
      
      vec3 baseColor;
      if (patternIndex <= 1) baseColor = color1;
      else if (patternIndex == 2) baseColor = color2;
      else if (patternIndex == 3) baseColor = color2b;
      else if (patternIndex <= 4) baseColor = color3;
      else baseColor = color4;
      
      return baseColor;
    }

    void main() {
      vec2 imageUV = v_uv;
      
      // Convert UV to pixel coordinates using image resolution
      vec2 pix = imageUV * u_imageResolution;
      
      // Calculate tile position and center
      vec2 tilePos = floor(pix / u_tileSize) * u_tileSize;
      vec2 tileCenter = (tilePos + u_tileSize * 0.5) / u_imageResolution;
      
      // Sample original image color at tile center
      vec3 originalCol = texture2D(u_imageTexture, tileCenter).rgb;
      originalCol = adjustSaturation(originalCol, u_saturation);
      
      // Handle very dark areas
      if (length(originalCol) < 0.04) {
        if (u_useWhiteBackground > 0.5) {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
          return;
        } else {
          vec2 pixelInTile = mod(pix, u_tileSize);
          vec2 patternUV = pixelInTile / u_tileSize;
          vec4 patternColor = samplePatternAtlas(u_patternAtlas, u_patternAtlasColumns, 0, patternUV);
          
          vec3 backgroundColor = vec3(1.0, 1.0, 1.0);
          
          if (patternColor.a < 0.001) {
            gl_FragColor = vec4(backgroundColor, 1.0);
          } else {
            gl_FragColor = vec4(vec3(0.98, 0.98, 0.98), 1.0); 
          }
          return;
        }
      }
      
      // Calculate luminance and add time-based animation
      float lum = calculateLuminance(originalCol);
      
      vec2 tileIndex = floor(pix / u_tileSize);
      float timeOffset = sin(u_time * TIME_SPEED + dot(tileIndex, vec2(SPATIAL_FREQ))) * TIME_AMPLITUDE;
      lum = clamp(lum + timeOffset, 0.0, 1.0);
      
      lum = 0.85 - lum;
      
      // Map luminance to pattern index
      float scaledIntensity = lum * 5.0;
      
      int patternIndex;
      if (scaledIntensity < 0.5) patternIndex = 0;
      else if (scaledIntensity < 3.5) patternIndex = int(floor(scaledIntensity * 0.8)) + 1;
      else if (scaledIntensity < 5.0) patternIndex = 4;
      else patternIndex = 5;
      
      patternIndex = clamp(patternIndex, 0, 5);
      
      // Calculate UV within the tile
      vec2 pixelInTile = mod(pix, u_tileSize);
      vec2 patternUV = pixelInTile / u_tileSize;
      
      // Map pattern index to atlas index (reverse order for regular patterns)
      int regularAtlasIndex;
      if (patternIndex == 0) regularAtlasIndex = max(0, u_patternAtlasColumns - 1);
      else if (patternIndex == 1) regularAtlasIndex = max(0, u_patternAtlasColumns - 2);
      else if (patternIndex == 2) regularAtlasIndex = max(0, u_patternAtlasColumns - 3);
      else if (patternIndex == 3) regularAtlasIndex = max(0, u_patternAtlasColumns - 4);
      else if (patternIndex == 4) regularAtlasIndex = max(0, u_patternAtlasColumns - 5);
      else regularAtlasIndex = 0;
      
      vec4 regularPatternColor = samplePatternAtlas(u_patternAtlas, u_patternAtlasColumns, regularAtlasIndex, patternUV);
      
      vec3 finalColor = getColorForIntensity(patternIndex, regularPatternColor.a);
      
      // Fallback for pure white areas
      if (finalColor.r >= 0.999 && finalColor.g >= 0.999 && finalColor.b >= 0.999) {
        vec4 fallbackPattern;
        if (patternIndex <= 2) {
          fallbackPattern = samplePatternAtlas(u_patternAtlas, u_patternAtlasColumns, u_patternAtlasColumns - 2, patternUV);
        } else {
          fallbackPattern = samplePatternAtlas(u_patternAtlas, u_patternAtlasColumns, u_patternAtlasColumns - 3, patternUV);
        }
        
        vec3 backgroundColor = vec3(1.0, 1.0, 1.0);
        if (fallbackPattern.a < 0.001) {
          finalColor = backgroundColor;
        } else {
          finalColor = vec3(0.925, 0.925, 0.925); 
        }
      }
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  const customUniforms = useMemo(() => {
    if (!imageTexture || !patternAtlas || !altPatternAtlas) return undefined;

    return {
      u_imageTexture: new THREE.Uniform(imageTexture),
      u_patternAtlas: new THREE.Uniform(patternAtlas),
      u_altPatternAtlas: new THREE.Uniform(altPatternAtlas),
      u_tileSize: new THREE.Uniform(tileSize),
      u_useWhiteBackground: new THREE.Uniform(useWhiteBackground ? 1.0 : 0.0),
      u_saturation: new THREE.Uniform(saturation),
      u_patternAtlasColumns: new THREE.Uniform(4),
      u_altPatternAtlasColumns: new THREE.Uniform(6),
    };
  }, [imageTexture, patternAtlas, altPatternAtlas, tileSize, useWhiteBackground, saturation]);

  if (!customUniforms) {
    return null;
  }

  return (
    <div className={`h-full w-full ${className}`}>
      <div style={containerStyle} className="relative">
        <WebGLView
          fragmentShader={fragmentShader}
          customUniforms={customUniforms}
          onResize={handleResize}
        />
      </div>
    </div>
  );
}
