import {
  interactiveCardFragmentShader,
  useImageTexture,
} from 'apps/web/src/components/base-org/root/Redesign/Section/BaseJoin/InteractiveCard';
import { useWebGLInteraction } from 'apps/web/src/hooks/useWebGLInteraction';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { WebGLView } from 'apps/web/src/components/WebGL/WebGLView';
import { motion, Variants } from 'framer-motion';
import { blogCardTransition } from 'apps/web/src/components/base-org/root/Redesign/Section/Blog';
import { useUniforms } from 'apps/web/src/hooks/useUniforms';
import NextImage from 'next/image';

const glassVariants: Variants = {
  enter: {
    opacity: 1,
    backdropFilter: 'blur(20px)',
  },
  center: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  exit: {
    opacity: 1,
    backdropFilter: 'blur(20px)',
  },
};

export function BlogCardImage({
  backgroundImage,
  brightness,
  contrast,
  shader = true,
}: {
  backgroundImage: string;
  title: string;
  brightness: number;
  contrast: number;
  shader?: boolean;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { imageTexture, imageDimensions } = useImageTexture(backgroundImage);
  const tileSize = 8;

  const interactionUniforms = useWebGLInteraction(imageRef.current, { smoothHover: true });

  const customUniforms = useUniforms({
    uImage: new THREE.Uniform(imageTexture),
    uBaseTileSize: new THREE.Uniform(tileSize),
    uPatternAtlasColumns: new THREE.Uniform(6),
    uPatternAtlas: new THREE.Uniform<THREE.Texture | null>(null),
    u_brightness: new THREE.Uniform(brightness),
    u_contrast: new THREE.Uniform(contrast),
    u_imageDimensions: new THREE.Uniform(
      new THREE.Vector2(imageDimensions.width, imageDimensions.height),
    ),
    ...interactionUniforms,
  });

  customUniforms.uImage.value = imageTexture;
  customUniforms.uBaseTileSize.value = tileSize;
  customUniforms.u_brightness.value = brightness;
  customUniforms.u_contrast.value = contrast;
  customUniforms.u_imageDimensions.value.set(imageDimensions.width, imageDimensions.height);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/patterns/pat-candles.svg', (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.anisotropy = 1;
      customUniforms.uPatternAtlas.value = texture;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={imageRef} className="relative w-full flex-[4] overflow-hidden rounded-xl md:flex-[2]">
      <div className="overflow-hidden relative w-full h-full">
        {shader ? (
          <WebGLView
            fragmentShader={interactiveCardFragmentShader}
            customUniforms={customUniforms}
            borderRadiusCorners={[8, 8, 0, 0] as const}
          />
        ) : (
          <NextImage
            src={backgroundImage}
            alt={backgroundImage}
            width={imageDimensions.width}
            height={imageDimensions.height}
            className="aspect-[2/1] h-full w-full object-cover"
            quality={90}
          />
        )}
      </div>

      {/* glassmorphism-like overlay */}
      <motion.div
        className="absolute inset-0 border border-white/20 bg-white/10"
        variants={glassVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={blogCardTransition}
      />
    </div>
  );
}
