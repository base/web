'use client';
import Title from 'apps/web/src/components/base-org/typography/Title';

import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import classNames from 'classnames';
import { CSSProperties, useRef } from 'react';

export default function SlidingTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const text =
    ' Base is for everyone - بایس للجمیع - Base es para todos - 基地适合所有人 - La Base è per tutti - Base est pour tout le monde - Base ni ya kila mtu - Base yɛ ma obiara - Base nye amesiame tɔ - Base ji he ni mɔ fɛɛ mɔ yɔɔ - Base är för alla - Base สำหรับทุกคน - Бейз для каждого - Бейз для кожного - Base ist für alle - Base herkes içindir - బేస్ అందరి కోసం - बेस सबके लिए है - Base é para todos - Base bụ maka onye ọ bụla - Base jẹ fun gbogbo eniyan - Base na kowa - Base ist für alle - Base jest dla każdego - Base is voor iedereen - ';

  const containerClasses = classNames(
    'relative w-full overflow-hidden rounded-2xl bg-blue p-8',
    "after:absolute after:z-10 after:bottom-0 after:left-0 after:top-0 after:w-[4rem] after:content-['']",
    'after:bg-gradient-to-r after:from-blue after:to-transparent',
    "before:absolute before:z-10 before:bottom-0 before:right-0 before:w-[4rem] before:top-0 before:content-['']",
    'before:bg-gradient-to-r before:from-transparent before:to-blue',
  );

  const animationStyles = { '--animation-duration': '20s' } as CSSProperties;

  return (
    <section>
      <div className={containerClasses} ref={containerRef}>
        <div className="inline-block animate-slide-left whitespace-nowrap" style={animationStyles}>
          <Title level={TitleLevel.Display4} className="inline-block whitespace-nowrap text-white">
            {text}
          </Title>{' '}
          <Title level={TitleLevel.Display4} className="inline-block whitespace-nowrap text-white">
            {text}
          </Title>
        </div>
      </div>
    </section>
  );
}
