import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import TheSquareMisuse1Png from './misuse-1.png';
import TheSquareMisuse2Png from './misuse-2.png';
import TheSquareMisuse3Png from './misuse-3.png';
import TheSquareMisuse4Png from './misuse-4.png';

const png1 = TheSquareMisuse1Png as SvgImport;
const png2 = TheSquareMisuse2Png as SvgImport;
const png3 = TheSquareMisuse3Png as SvgImport;
const png4 = TheSquareMisuse4Png as SvgImport;

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
    alt: 'The Square Misuse 1',
    width: png1.width,
    height: png1.height,
    tag: (
      <span className="flex items-center gap-2">
        <CrossSvg />
        <span>Do not use any colors other than black, white, and blue</span>
      </span>
    ),
  },
  {
    src: png2.src,
    alt: 'The Square Misuse 2',
    width: png2.width,
    height: png2.height,
    tag: (
      <span className="flex items-center gap-2">
        <CrossSvg />
        <span>Do not distort</span>
      </span>
    ),
  },
  {
    src: png3.src,
    alt: 'The Square Misuse 3',
    width: png3.width,
    height: png3.height,
    tag: (
      <span className="flex items-center gap-2">
        <CrossSvg />
        <span>Do not create your own square</span>
      </span>
    ),
  },
  {
    src: png4.src,
    alt: 'The Square Misuse 4',
    width: png4.width,
    height: png4.height,
    tag: (
      <span className="flex items-center gap-2">
        <CrossSvg />
        <span>Do not add special effects</span>
      </span>
    ),
  },
];

export function TheSquareMisuse() {
  return (
    <ImageComponent
      id="the-square-misuse"
      prefix="The Square"
      title="Misuse"
      description="In order to maintain brand consistency and integrity, please adhere to all usage guidelines outlined in this document, and avoid any distortions of any kind. "
      images={images}
    />
  );
}
