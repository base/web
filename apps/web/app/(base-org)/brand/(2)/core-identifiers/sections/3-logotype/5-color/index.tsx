import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import LogotypeColorPng from './color.png';

const png = LogotypeColorPng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'Logotype Color',
    width: png.width,
    height: png.height,
  },
];

export function LogotypeColor() {
  return (
    <ImageComponent
      id="logotype-color"
      prefix="Logotype"
      title="Color"
      description={
        <>
          In most cases, the locked up logotype should remain in it&apos;s original color palette
          when used over white. In monochrome scenarios, the square and type can get the same color
          - usually white or black.
        </>
      }
      images={images}
    />
  );
}
