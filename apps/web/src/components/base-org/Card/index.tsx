'use client';

import { useCards } from 'apps/web/src/components/base-org/Card/context';
import React, { CSSProperties, useEffect, useId, useRef } from 'react';

type HoverShimmerProps = {
  children: React.ReactNode;
  wrapperClassName?: string;
  innerClassName?: string;
  radius?: number;
};

export default function Card({
  children,
  wrapperClassName,
  innerClassName,
  radius = 16,
}: HoverShimmerProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const fakeBlobRef = useRef<HTMLDivElement>(null);

  const { registerCard, unregisterCard } = useCards();
  const id = useId();

  useEffect(() => {
    registerCard(id, { blobRef, fakeBlobRef });
    return () => unregisterCard(id);
  }, [registerCard, unregisterCard, id]);

  /*
    Shimmer / Tailwind integration notes:
    - Converted from https://codepen.io/yxshv/pen/JjaRZmb
    - The card "border" is controlled via the padding, p-[1px], and the background color, bg-white/20
  */
  const cardClasses = `card overflow-hidden p-[1px] m-0 bg-white/20 relative ${wrapperClassName} w-full`;

  const cardStyles: CSSProperties = {
    borderRadius: `${radius}px`,
  };

  const blobClasses =
    'blob blur-[40px] z-10 absolute opacity-0 w-[30rem] h-[30rem] rounded-full bg-[rgb(255,255,255,0.2)]';

  const fakeBlobClasses = 'fake-blob absolute w-[30rem] h-[30rem] rounded-full opacity-0';

  const innerClasses = `inner relative bg-black z-20 h-full ${innerClassName}`;
  const innerStyles: CSSProperties = {
    borderRadius: `${radius - 1}px`,
  };

  return (
    <div className={cardClasses} ref={cardRef} style={cardStyles}>
      <div className={innerClasses} style={innerStyles}>
        {children}
      </div>
      <div className={blobClasses} ref={blobRef} />
      <div className={fakeBlobClasses} ref={fakeBlobRef} />
    </div>
  );
}
