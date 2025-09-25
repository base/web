import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import ColorMisuse1Svg from './misuse-1.svg';
import ColorMisuse2Svg from './misuse-2.svg';
import ColorMisuse3Svg from './misuse-3.svg';
import ColorMisuse4Svg from './misuse-4.svg';

const svg1 = ColorMisuse1Svg as SvgImport;
const svg2 = ColorMisuse2Svg as SvgImport;
const svg3 = ColorMisuse3Svg as SvgImport;
const svg4 = ColorMisuse4Svg as SvgImport;

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
    src: svg1.src,
    alt: 'Color Misuse 1',
    width: svg1.width,
    height: svg1.height,
    tag: (
      <span className="flex gap-2 items-center">
        <CrossSvg />
        <span>Do not use gradients</span>
      </span>
    ),
  },
  {
    src: svg2.src,
    alt: 'Color Misuse 2',
    width: svg2.width,
    height: svg2.height,
    tag: (
      <span className="flex gap-2 items-center">
        <CrossSvg />
        <span>Do not lead with secondary color</span>
      </span>
    ),
  },
  {
    src: svg3.src,
    alt: 'Color Misuse 3',
    width: svg3.width,
    height: svg3.height,
    tag: (
      <span className="flex gap-2 items-center">
        <CrossSvg />
        <span>Do not make the brand feel too elementary</span>
      </span>
    ),
  },
  {
    src: svg4.src,
    alt: 'Color Misuse 4',
    width: svg4.width,
    height: svg4.height,
    tag: (
      <span className="flex gap-2 items-center">
        <CrossSvg />
        <span>Do not over use Base Blue on product or web</span>
      </span>
    ),
  },
];

export function ColorMisuse() {
  return (
    <ImageComponent
      id="color-misuse"
      title="Misuse"
      description="Do not lead with gradients in core comms. Avoid opacity, layering and other visual effects. Never hero a color other than Blue, Black, White, or Gray."
      images={images}
    />
  );
}
