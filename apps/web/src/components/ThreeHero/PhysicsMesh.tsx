'use client';

// Libraries
import { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';

// Components
import DynamicRigidBody from 'apps/web/src/components/ThreeHero/DynamicRigidBody';

// 3D libraries - types
import type { BallArgs, RapierRigidBody } from '@react-three/rapier';

// 3D Libraries - static - These cannot be dynamically imported
import { Vector3 } from 'three';
import { randFloatSpread } from 'three/src/math/MathUtils.js';
import { useFrame, useThree } from '@react-three/fiber';

// Dynamic - react-three/rapier
const BallCollider = dynamic(
  async () => import('@react-three/rapier').then((mod) => mod.BallCollider),
  { ssr: false },
);

const ballArguments: BallArgs = [1];

export function PhysicsMesh({
  r = randFloatSpread,
  scale = 1,
  gravityEffect = 0.2,
  children,
}: {
  r?: (a: number) => number;
  scale?: number;
  gravityEffect?: number;
  children: React.ReactNode;
}) {
  const rigidBodyApiRef = useRef<RapierRigidBody>(null);
  const { viewport } = useThree();
  const vec = new Vector3();

  const randomNumberBetween = (min: number, max: number) => {
    const posOrNeg = Math.random() > 0.5 ? 1 : -1;
    const num = Math.min(Math.random() * (max - min) + min, 14);
    return posOrNeg * num;
  };

  const pos = useMemo(
    () =>
      new Vector3(
        randomNumberBetween(viewport.width * 0.5, viewport.width * 2),
        randomNumberBetween(viewport.height * 0.5, viewport.height * 2),
        randomNumberBetween(viewport.width * 0.5, viewport.width * 2),
      ),
    [viewport.height, viewport.width],
  );
  const rot = useMemo(() => new Vector3(r(Math.PI), r(Math.PI), r(Math.PI)), [r]);

  useFrame(() => {
    if (!rigidBodyApiRef.current) return;
    const vector = rigidBodyApiRef.current.translation();
    const vector3 = new Vector3(vector.x, vector.y, vector.z);
    rigidBodyApiRef.current.applyImpulse(
      vec.copy(vector3).negate().multiplyScalar(gravityEffect),
      true,
    );
  });

  return (
    <DynamicRigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos.toArray()}
      rotation={rot.toArray()}
      ref={rigidBodyApiRef}
      colliders={false}
      scale={scale}
    >
      <BallCollider args={ballArguments} />
      {children}
    </DynamicRigidBody>
  );
}
