import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import TheSquareColorPng from './color.png';

const png = TheSquareColorPng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'The Square Color',
    width: png.width,
    height: png.height,
  },
];

export function TheSquareColor() {
  return (
    <ImageComponent
      id="the-square-color"
      prefix="The Square"
      title="Color"
      description={
        <>
          <span className="mb-4 block">
            The Square lives in only three shades: Base Blue, white, or black. Blue signals
            ownership, white signals canvas, black supports high-contrast environments such as OLED
            UIs and print.
          </span>
          <span className="mb-4 block">
            Never apply secondary palette fills, gradients, or transparency to the Square—bring
            color in through background or supporting graphics instead.
          </span>
          <span className="mb-4 block">
            When the icon sits on photography, add a four-pixel white key-line to guard clarity. All
            values reference the master palette in section 02 to ensure absolute consistency across
            screens and substrates.
          </span>
        </>
      }
      images={images}
    />
  );
}
