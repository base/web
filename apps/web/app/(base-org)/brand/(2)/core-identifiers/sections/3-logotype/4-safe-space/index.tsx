import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import LogotypeSafeSpacePng from './safe-space.png';

const png = LogotypeSafeSpacePng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'Logotype Safe Space',
    width: png.width,
    height: png.height,
  },
];

export function LogotypeSafeSpace() {
  return (
    <ImageComponent
      id="logotype-safe-space"
      prefix="Logotype"
      title="Safe Space"
      description="The logo should maintain a clear space equal to that of the square on all sides, except in sub-brand or partnership scenarios. (see §5 and §10)"
      images={images}
    />
  );
}
