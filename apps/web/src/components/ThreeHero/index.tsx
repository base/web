/* eslint-disable react/no-unknown-property */
'use client';

// Libraries
import classNames from 'classnames';
import { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Components
import Image, { StaticImageData } from 'next/image';
import Link from 'apps/web/src/components/Link';

// 3D libraries - types
import type { Vector3 } from '@react-three/fiber';
import type { Vector3Tuple } from '@react-three/rapier';
import type {
  ColorRepresentation,
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
} from 'three';

import { Bloom, SMAA, EffectComposer } from '@react-three/postprocessing';

// Assets
import {
  BaseLogo,
  Boxes,
  Lightning,
  Balls,
  Controller,
  Eth,
  Globe,
  Phone,
  Headphones,
  Spikey,
  Play,
  Blobby,
  Cursor,
  Pointer,
} from './models';

import baseLogo from './assets/base-logo.svg';
import environmentLight from './assets/environmentLight.jpg';

// 3D libraries - dynamic imports

// Dynamic - react-three/fiber
const Canvas = dynamic(async () => import('@react-three/fiber').then((mod) => mod.Canvas), {
  ssr: false,
});

// Dynamic - react-three/drei
const Html = dynamic(async () => import('@react-three/drei').then((mod) => mod.Html), {
  ssr: false,
});

const Lightformer = dynamic(
  async () => import('@react-three/drei').then((mod) => mod.Lightformer),
  {
    ssr: false,
  },
);

const Environment = dynamic(
  async () => import('@react-three/drei').then((mod) => mod.Environment),
  {
    ssr: false,
  },
);

// Dynamic - react-three/rapier
const Physics = dynamic(async () => import('@react-three/rapier').then((mod) => mod.Physics), {
  ssr: false,
});

/*
  The Main Scene
  - Keeps track of window focus, intersection observer
  - Listen to pointer event for rotation context
  - Global setup such as gravity, dpr & Physics
*/

const mintLink =
  'https://wallet.coinbase.com/nft/mint/eip155:8453:erc721:0x803Fc79D31AB30a39B3BD2A90171470cC82Ba44a';

const gravity: Vector3Tuple = [0, 0, 0];

const sceneFogArguments: [color: ColorRepresentation, near: number, far: number] = ['#111', 2.5, 7];

const sceneCamera = { position: [0, 0, 5] as Vector3 };
const sceneSphereArguments: [radius: number, widthSegments: number, heightSegments: number] = [
  7, 64, 64,
];

type MouseXY = {
  x: number;
  y: number;
};

export function Scene(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<MouseXY>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(true);
  const containerRef = useRef(null);

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsVisible(true);
    setPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleClick = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    const updateIsActive = () => {
      const isFocused = !document.hidden && document.hasFocus();
      setIsActive(isFocused);
    };

    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        setIsActive(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -100% 0px',
      },
    );

    if (container) {
      observer.observe(container);
    }

    // Initial check
    updateIsActive();

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  const canvaClasses = classNames(
    'fixed h-screen w-full transition-all',
    isActive ? 'opacity-100' : 'opacity-0',
  );

  return (
    <div ref={containerRef} className="absolute h-full w-full" onContextMenu={handleContextMenu}>
      <Canvas
        shadows
        frameloop={isActive ? 'always' : 'never'}
        camera={sceneCamera}
        className={canvaClasses}
      >
        <fog attach="fog" args={sceneFogArguments} />

        <mesh>
          <sphereGeometry args={sceneSphereArguments} />
          <meshPhysicalMaterial color="#666" side={1} depthTest={false} />
        </mesh>
        <Effects />
        <EnvironmentSetup />
        <Suspense fallback={<Loader />}>
          <Physics gravity={gravity} timeStep="vary" paused={!isActive}>
            <Pointer />
            <Everything />
          </Physics>
        </Suspense>
      </Canvas>

      {isVisible && (
        <div
          className="absolute rounded border border-white/20 bg-black px-4 py-2 shadow-md"
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
        >
          <Link
            href={mintLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue"
          >
            Mint This
          </Link>
        </div>
      )}
    </div>
  );
}

function Effects() {
  return (
    <EffectComposer multisampling={0} stencilBuffer={false}>
      <Bloom mipmapBlur luminanceThreshold={0.5} intensity={1} />
      <SMAA />
    </EffectComposer>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="h-[50px] w-[50px] animate-pulse">
        <Image src={baseLogo as StaticImageData} alt="Loading..." className="w-[50px]" />
      </div>
    </Html>
  );
}

/*
  The Environment
  - Loads the JPEG / HDR gainmap file
  - Set as global texture
*/
const light1: Vector3 = [5, 5, -3];
const light2: Vector3 = [0, -15, -9];
const light3: Vector3 = [10, 1, 0];
const light4: Vector3 = [10, 10, 0];
function EnvironmentSetup() {
  const onLightUpdated = useCallback(
    (self: Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[]>) =>
      self.lookAt(0, 0, 0),
    [],
  );
  return (
    <Environment files={environmentLight.src}>
      <Lightformer
        form="ring"
        intensity={6}
        rotation-x={Math.PI / 2}
        position={light1}
        scale={4}
        color="white"
      />
      <Lightformer
        form="circle"
        intensity={20}
        rotation-x={Math.PI / 2}
        position={light2}
        scale={2}
      />
      <Lightformer
        form="circle"
        intensity={2}
        rotation-y={-Math.PI / 2}
        position={light3}
        scale={8}
      />
      <Lightformer
        form="ring"
        color="white"
        intensity={5}
        onUpdate={onLightUpdated}
        position={light4}
        scale={4}
      />
    </Environment>
  );
}

/*
  The GLTF Scene
  - Loads the GLTF file / 3D scene
*/
export function Everything() {
  return (
    <group dispose={null}>
      <BaseLogo />
      <Lightning />
      <Balls />
      <Boxes />
      <Controller />
      <Eth />
      <Globe />
      <Phone />
      <Headphones />
      <Spikey />
      <Play />
      <Blobby />
      <Cursor />
    </group>
  );
}
