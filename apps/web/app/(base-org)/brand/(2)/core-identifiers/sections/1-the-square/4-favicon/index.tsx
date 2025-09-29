import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import TheSquareFavicon1Png from './favicon-1.png';
import TheSquareFavicon2Png from './favicon-2.png';

const png1 = TheSquareFavicon1Png as SvgImport;
const png2 = TheSquareFavicon2Png as SvgImport;

const images = [
  {
    src: png1.src,
    alt: 'The Square Favicon Dark Mode',
    width: png1.width,
    height: png1.height,
  },
  {
    src: png2.src,
    alt: 'The Square Favicon Light Mode',
    width: png2.width,
    height: png2.height,
  },
];

export function TheSquareFavicon() {
  return (
    <ImageComponent
      id="the-square-favicon"
      prefix="The Square"
      title="Favicon"
      description="Use the blue in-product icon for consistent visibility in both light and dark modes."
      images={images}
    />
  );
}
