'use client';

import React, { forwardRef, useRef } from 'react';
import minikit2 from 'apps/web/src/components/Builders/MiniKit/minikit2.svg';
import walletLogo from 'apps/web/src/components/Builders/MiniKit/walletLogo.svg';
import farcaster from 'apps/web/src/components/Builders/MiniKit/farcaster.svg';
import plus from 'apps/web/src/components/Builders/MiniKit/plus.svg';
import { AnimatedBeam } from 'apps/web/src/components/Builders/Shared/AnimatedBeam';
import Image, { StaticImageData } from 'next/image';

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#D058C1] bg-black p-3"
      >
        {children}
      </div>
    );
  },
);

Circle.displayName = 'Circle';

export function HeaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full max-w-lg items-center justify-center overflow-hidden rounded-lg"
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-16">
            <Image src={minikit2 as StaticImageData} alt="minikit2" width={32} height={32} />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-20">
          <Circle ref={div1Ref}>
            <Image src={walletLogo as StaticImageData} alt="walletLogo" width={32} height={32} />
          </Circle>
          <Circle ref={div2Ref}>
            <Image src={farcaster as StaticImageData} alt="farcaster" width={32} height={32} />
          </Circle>
          <Circle ref={div3Ref}>
            <Image src={plus as StaticImageData} alt="plus" width={32} height={32} />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
        curvature={-95}
      />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div6Ref} duration={3} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
        curvature={95}
      />
    </div>
  );
}
