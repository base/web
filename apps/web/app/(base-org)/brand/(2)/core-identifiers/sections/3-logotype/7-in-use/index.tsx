import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import LogotypeInUse1Png from './in-use-1.png';
import LogotypeInUse2Png from './in-use-2.png';
import LogotypeInUse3Png from './in-use-3.png';
import LogotypeInUse4Png from './in-use-4.png';

const png1 = LogotypeInUse1Png as SvgImport;
const png2 = LogotypeInUse2Png as SvgImport;
const png3 = LogotypeInUse3Png as SvgImport;
const png4 = LogotypeInUse4Png as SvgImport;

const images = [
  {
    src: png1.src,
    alt: 'Logotype In Use 1',
    width: png1.width,
    height: png1.height,
  },
  {
    src: png2.src,
    alt: 'Logotype In Use 2',
    width: png2.width,
    height: png2.height,
  },
  {
    src: png3.src,
    alt: 'Logotype In Use 3',
    width: png3.width,
    height: png3.height,
  },
  {
    src: png4.src,
    alt: 'Logotype In Use 4',
    width: png4.width,
    height: png4.height,
  },
];

export function LogotypeInUse() {
  return <ImageComponent id="logotype-in-use" prefix="Logotype" title="In Use" images={images} />;
}
