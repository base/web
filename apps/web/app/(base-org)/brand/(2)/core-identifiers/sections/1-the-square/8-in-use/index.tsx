import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import TheSquareInUse1Png from './in-use-1.png';
import TheSquareInUse2Png from './in-use-2.png';
import TheSquareInUse3Png from './in-use-3.png';
import TheSquareInUse4Png from './in-use-4.png';

const png1 = TheSquareInUse1Png as SvgImport;
const png2 = TheSquareInUse2Png as SvgImport;
const png3 = TheSquareInUse3Png as SvgImport;
const png4 = TheSquareInUse4Png as SvgImport;

const images = [
  {
    src: png1.src,
    alt: 'The Square In-use 1',
    width: png1.width,
    height: png1.height,
  },
  {
    src: png2.src,
    alt: 'The Square In-use 2',
    width: png2.width,
    height: png2.height,
  },
  {
    src: png3.src,
    alt: 'The Square In-use 3',
    width: png3.width,
    height: png3.height,
  },
  {
    src: png4.src,
    alt: 'The Square In-use 4',
    width: png4.width,
    height: png4.height,
  },
];

export function TheSquareInUse() {
  return (
    <ImageComponent id="the-square-in-use" prefix="The Square" title="In-use" images={images} />
  );
}
