'use client';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const MISSION_GOALS = [
  'create a global economy',
  'drive innovation',
  'unleash creativity',
  'increase economic freedom',
];

export default function MissionSection() {
  const typedTextRef = useRef<HTMLParagraphElement>(null);
  const typedInstance = useRef<Typed>();

  useEffect(() => {
    if (typedTextRef.current && !typedInstance.current) {
      typedInstance.current = new Typed(typedTextRef.current, {
        strings: MISSION_GOALS,
        typeSpeed: 50,
        backDelay: 3000,
        backSpeed: 25,
        loop: true,
        showCursor: false,
        autoInsertCss: false,
      });
    }
  }, []);
  return (
    <section className="min-h-[32rem] sm:min-h-[19rem] md:min-h-[16rem] lg:min-h-[18rem] xl:min-h-[12rem]">
      <Title level={TitleLevel.Display1}>
        We are bringing the world onchain to <p className="inline text-blue" ref={typedTextRef} />.
      </Title>
    </section>
  );
}
