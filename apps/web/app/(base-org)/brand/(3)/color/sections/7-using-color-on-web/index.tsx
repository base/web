import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import ColorUsingColorOnWeb1Svg from './using-color-on-web-1.svg';
import ColorUsingColorOnWeb2Svg from './using-color-on-web-2.svg';
import ColorUsingColorOnWeb3Svg from './using-color-on-web-3.svg';
import ColorUsingColorOnWeb4Svg from './using-color-on-web-4.svg';

const svg1 = ColorUsingColorOnWeb1Svg as SvgImport;
const svg2 = ColorUsingColorOnWeb2Svg as SvgImport;
const svg3 = ColorUsingColorOnWeb3Svg as SvgImport;
const svg4 = ColorUsingColorOnWeb4Svg as SvgImport;

const images = [
  {
    src: svg1.src,
    alt: 'Using Color on Web 1',
    width: svg1.width,
    height: svg1.height,
    tag: 'Always reserve the use of Base Blue to the most effective element and avoid over using it.',
  },
  {
    src: svg2.src,
    alt: 'Using Color on Web 2',
    width: svg2.width,
    height: svg2.height,
    tag: 'Our grayscale and negative space should outweigh Base Blue in terms of color hierarchy.',
  },
  {
    src: svg3.src,
    alt: 'Using Color on Web 3',
    width: svg3.width,
    height: svg3.height,
    tag: 'We love surprising with color and expression in unexpected moments.',
  },
  {
    src: svg4.src,
    alt: 'Using Color on Web 4',
    width: svg4.width,
    height: svg4.height,
    tag: 'The design stays mostly grayscale, but uses bursts of vibrant color in key interactions to add expression and impact.',
  },
];

export function ColorUsingColorOnWeb() {
  return (
    <ImageComponent
      id="using-color-on-web"
      title="Using Color on Web"
      description="Without careful execution, our palette can feel very saturated and too poppy. To avoid it, we want to be thoughtful about selecting colors in application."
      images={images}
    />
  );
}
