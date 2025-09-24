import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import LogotypeLockupCorrectionPng from './lockup-correction.svg';

const img = LogotypeLockupCorrectionPng as SvgImport;

const images = [
  {
    src: img.src,
    alt: 'Logotype Lockup Correction',
    width: img.width,
    height: img.height,
  },
];

export function LogotypeLockupCorrection() {
  return (
    <ImageComponent
      id="logotype-lockup-correction"
      prefix="Logotype"
      title="Lockup Correction"
      description={
        <>
          The square is scaled to fit the optical x-height of the logotype, taking into account the
          letters slight top and bottom overshoot. The space between the square and the logotype
          equals to 3 times the width of the b&apos;s stem.
        </>
      }
      images={images}
    />
  );
}
