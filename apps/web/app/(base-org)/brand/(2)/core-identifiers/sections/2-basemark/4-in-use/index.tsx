import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import BasemarkInUse1Png from './in-use-1.png';
import BasemarkInUse2Png from './in-use-2.png';
import BasemarkInUse3Png from './in-use-3.png';
import BasemarkInUse4Png from './in-use-4.png';

const png1 = BasemarkInUse1Png as SvgImport;
const png2 = BasemarkInUse2Png as SvgImport;
const png3 = BasemarkInUse3Png as SvgImport;
const png4 = BasemarkInUse4Png as SvgImport;

const images = [
  {
    src: png1.src,
    alt: 'Basemark In-use 1',
    width: png1.width,
    height: png1.height,
  },
  {
    src: png2.src,
    alt: 'Basemark In-use 2',
    width: png2.width,
    height: png2.height,
  },
  {
    src: png3.src,
    alt: 'Basemark In-use 3',
    width: png3.width,
    height: png3.height,
  },
  {
    src: png4.src,
    alt: 'Basemark In-use 4',
    width: png4.width,
    height: png4.height,
  },
];

export function BasemarkInUse() {
  return <ImageComponent id="basemark-in-use" prefix="Basemark" title="In-use" images={images} />;
}
