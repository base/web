import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import ColorOurPaletteSvg from './our-palette.svg';

const svg = ColorOurPaletteSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Color Our Palette',
    width: svg.width,
    height: svg.height,
  },
];

export function ColorOurPalette() {
  return (
    <ImageComponent
      id="our-palette"
      title="Our Palette"
      description="Core palette: Base Blue, Black, White, Gray ramp. Secondary palette: A rich spectrum of Cerulean, Tan, Red, Yellow, Pink, Green and Lime."
      fullWidth
      images={images}
    />
  );
}
