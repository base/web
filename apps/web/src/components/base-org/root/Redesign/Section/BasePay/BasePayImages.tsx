'use client';

import { useRef, useState } from 'react';
import { useInView } from 'motion/react';
import './BasePayStyle.css';
import classNames from 'classnames';

import BallImage from './images/ball.webp';
import BikeImage from './images/bike.webp';
import ChairImage from './images/chair.webp';
import DeskImage from './images/desk.webp';
import GuitarImage from './images/guitar.webp';
import HammerImage from './images/hammer.webp';
import HeadphonesImage from './images/headphones.webp';
import LampImage from './images/lamp.webp';
import PerfumeImage from './images/perfume.webp';
import ShoeImage from './images/shoe-l.webp';
import SoapImage from './images/soap.webp';
import SpeakerImage from './images/speaker.webp';
import TvImage from './images/tv.webp';
import WatchImage from './images/watch.webp';
import { SlideSVG } from './SlideSVG';
import { BasePayDialog } from './BasePayDialog';

// const stickers = [
//   { image: BallImage.src, alt: 'Ball', clip: false },
//   { image: BikeImage.src, alt: 'Bike', clip: true },
//   { image: ChairImage.src, alt: 'Chair', clip: false },
//   { image: DeskImage.src, alt: 'Desk', clip: true },
//   { image: GuitarImage.src, alt: 'Guitar', clip: false },
//   { image: HammerImage.src, alt: 'Hammer', clip: false },
//   { image: HeadphonesImage.src, alt: 'Headphones', clip: false },
//   { image: LampImage.src, alt: 'Lamp', clip: false },
//   { image: PerfumeImage.src, alt: 'Perfume', clip: false },
//   { image: ShoeImage.src, alt: 'Shoe', clip: false },
//   { image: SoapImage.src, alt: 'Soap', clip: true },
//   { image: SpeakerImage.src, alt: 'Speaker', clip: true },
//   { image: TvImage.src, alt: 'TV', clip: true },
//   { image: WatchImage.src, alt: 'Watch', clip: false },
// ];

const stickers = [
  { image: BallImage.src, alt: 'Ball', clip: false },
  { image: BikeImage.src, alt: 'Bike', clip: false },
  { image: ChairImage.src, alt: 'Chair', clip: false },
  { image: DeskImage.src, alt: 'Desk', clip: false },
  { image: GuitarImage.src, alt: 'Guitar', clip: false },
  { image: HammerImage.src, alt: 'Hammer', clip: false },
  { image: HeadphonesImage.src, alt: 'Headphones', clip: false },
  { image: LampImage.src, alt: 'Lamp', clip: false },
  { image: PerfumeImage.src, alt: 'Perfume', clip: false },
  { image: ShoeImage.src, alt: 'Shoe', clip: false },
  { image: SoapImage.src, alt: 'Soap', clip: false },
  { image: SpeakerImage.src, alt: 'Speaker', clip: false },
  { image: TvImage.src, alt: 'TV', clip: false },
  { image: WatchImage.src, alt: 'Watch', clip: false },
];

export function BasePayImages() {
  const [hoverActive, setHoverActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.25, once: false });
  const stickersActive = isInView;

  return (
    <div
      ref={ref}
      className={classNames(
        'group relative h-full w-full rounded-2xl  p-6 transition-all duration-300',
        stickersActive ? 'bg-base-gray-25/0' : 'bg-base-gray-25',
      )}
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
      role="presentation"
    >
      <div className="flex h-full items-center justify-center">
        <div className="bg-neutral-200/0 absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-2xl p-6">
          {stickers.map((sticker, i) =>
            sticker.clip ? (
              <div key={i} className="sticker-clip-wrapper">
                <div
                  data-sticker-index={i}
                  style={
                    {
                      '--delay': `${i * 5}ms`,
                    } as React.CSSProperties
                  }
                  className={`sticker spring-bounce-20 spring-duration-300 ${
                    stickersActive ? 'active' : ''
                  }`}
                >
                  <img
                    style={
                      {
                        '--animation-delay': `${i * 100}ms`,
                      } as React.CSSProperties
                    }
                    src={sticker.image}
                    alt={sticker.alt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            ) : (
              <div
                key={i}
                data-sticker-index={i}
                style={{ ['--delay' as string]: `${i * 5}ms` }}
                className={`sticker spring-bounce-20 spring-duration-300 ${
                  stickersActive ? 'active' : ''
                }`}
              >
                <img
                  src={sticker.image}
                  alt={sticker.alt}
                  className="h-full w-full object-contain"
                />
              </div>
            ),
          )}
        </div>
        <div
          className={classNames(
            'relative z-20 spring-bounce-20 spring-duration-300',
            stickersActive ? 'scale-100' : 'scale-95',
          )}
        >
          <div className="w-[350px] scale-[0.8] md:scale-100">
            {/* Replace with your card SVG — viewBox="0 0 377 358" */}
            {/* <SlideSVG /> */}
            <BasePayDialog />
          </div>
        </div>
      </div>
    </div>
  );
}
