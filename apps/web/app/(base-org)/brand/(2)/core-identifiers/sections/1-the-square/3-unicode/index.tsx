import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import TheSquareUnicodePng from './unicode.png';

const png = TheSquareUnicodePng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'The Square Unicode',
    width: png.width,
    height: png.height,
  },
];

export function TheSquareUnicode() {
  return (
    <ImageComponent
      id="the-square-unicode"
      prefix="The Square"
      title="Unicode"
      description="For text based environments we reserve 🟦. Use it in copy sparingly as a wink, not a crutch. Never replace the drawn icon with a system glyph in product UI."
      images={images}
    />
  );
}
