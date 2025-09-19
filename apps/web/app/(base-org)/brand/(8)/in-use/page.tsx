import { Hero } from 'apps/web/src/components/Brand/Hero';
import inUseImg from 'apps/web/public/images/backgrounds/in-use.webp';
import BrandIndex from 'apps/web/src/components/Brand/Index';
import { BRAND_PAGES_INDEX } from 'apps/web/app/(base-org)/brand/(main)/page';
import Image from 'next/image';

/* img imports */
import img01 from './1.png';
import img02 from './2.png';
import img03 from './3.jpg';
import img04 from './4.jpg';
import img05 from './5.png';
import img06 from './6.png';
import img07 from './7.png';
import img08 from './8.png';
import img09 from './9.png';
import img10 from './10.png';
import classNames from 'classnames';

export default function Page() {
  return (
    <>
      <Hero title="In-use" imageUrl={inUseImg.src} />

      <div className="col-span-full mb-[88px] grid gap-4 border-t border-[#0A0B0D] pt-4 md:col-start-4 md:grid-cols-2 md:gap-8 md:pt-6">
        {imgs.map((img, index) => (
          <Image
            src={img.src}
            alt={img.alt}
            key={img.alt}
            quality={99}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 70vw, 1380px"
            className={classNames(
              'h-auto w-full rounded-lg md:rounded-xl',
              index > 3 ? 'md:col-span-1' : 'md:col-span-2',
            )}
          />
        ))}
      </div>

      <BrandIndex index={FINAL_INDEX} hasHeading />

      {/* No content, just a set of images. */}
    </>
  );
}

const FINAL_INDEX = [BRAND_PAGES_INDEX[5], BRAND_PAGES_INDEX[6]];

const imgs = [
  { src: img01, alt: 'Bringing the world onchain' },
  { src: img02, alt: 'Subway Posters' },
  { src: img03, alt: 'Base ad sign' },
  { src: img04, alt: 'Metro ad sign' },
  { src: img05, alt: 'Tote bag' },
  { src: img06, alt: 'Base shirt' },
  { src: img07, alt: 'Base socks' },
  { src: img08, alt: 'Base socks 2' },
  { src: img09, alt: 'Base t-shirt' },
  { src: img10, alt: 'Base cap' },
];
