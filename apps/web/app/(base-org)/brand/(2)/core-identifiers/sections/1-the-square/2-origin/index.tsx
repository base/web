import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import TheSquareOriginPng from './origin.png';

const png = TheSquareOriginPng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'The Square Origin',
    width: png.width,
    height: png.height,
  },
];

export function TheSquareOrigin() {
  return (
    <ImageComponent
      id="the-square-origin"
      prefix="The Square"
      title="Origin"
      description="The Square is born from the Coinbase Wallet logo, a pragmatic evolution that signals our shared DNA while staking out new territory. By isolating the interior pixel and letting it breathe, we found the purest symbol of being onchain: one block, endlessly composable."
      images={images}
    />
  );
}
