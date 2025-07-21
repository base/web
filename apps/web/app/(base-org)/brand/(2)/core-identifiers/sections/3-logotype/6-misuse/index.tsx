import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import LogotypeMisuse1Png from './misuse-1.png';
import LogotypeMisuse2Png from './misuse-2.png';
import LogotypeMisuse3Png from './misuse-3.png';
import LogotypeMisuse4Png from './misuse-4.png';

const png1 = LogotypeMisuse1Png as SvgImport;
const png2 = LogotypeMisuse2Png as SvgImport;
const png3 = LogotypeMisuse3Png as SvgImport;
const png4 = LogotypeMisuse4Png as SvgImport;

function CrossSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" fill="#FC401F" />
      <path
        d="M9.20018 7.99971L11 9.79953L9.80012 10.9994L8.00029 9.19959L6.19988 11L5 9.80012L6.80041 7.99971L5.00059 6.19988L6.20047 5L8.00029 6.79982L9.79953 5.00059L10.9994 6.20047L9.20018 7.99971Z"
        fill="white"
      />
    </svg>
  );
}

const images = [
  {
    src: png1.src,
    alt: 'Logotype Misuse 1',
    width: png1.width,
    height: png1.height,
    tag: (
      <span className="flex items-center gap-2">
        <CrossSvg />
        <span>Do not adjust the spacing</span>
      </span>
    ),
  },
  {
    src: png2.src,
    alt: 'Logotype Misuse 2',
    width: png2.width,
    height: png2.height,
    tag: (
      <span className="flex items-center gap-2">
        <CrossSvg />
        <span>Do not alter the sizes of each element</span>
      </span>
    ),
  },
  {
    src: png3.src,
    alt: 'Logotype Misuse 3',
    width: png3.width,
    height: png3.height,
    tag: (
      <span className="flex items-center gap-2">
        <CrossSvg />
        <span>Do not type out your own wordmark</span>
      </span>
    ),
  },
  {
    src: png4.src,
    alt: 'Logotype Misuse 4',
    width: png4.width,
    height: png4.height,
    tag: (
      <span className="flex items-center gap-2">
        <CrossSvg />
        <span>Do not alter the colors</span>
      </span>
    ),
  },
];

export function LogotypeMisuse() {
  return (
    <ImageComponent
      id="logotype-misuse"
      prefix="Logotype"
      title="Misuse"
      description="In order to maintain brand consistency and integrity, please adhere to all usage guidelines outlined in this document, and avoid any distortions of any kind."
      images={images}
    />
  );
}
