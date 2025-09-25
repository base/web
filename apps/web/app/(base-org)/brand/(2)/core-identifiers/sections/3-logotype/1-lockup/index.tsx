import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import LogotypeLockupPng from './lockup.png';

const png = LogotypeLockupPng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'Logotype Lockup',
    width: png.width,
    height: png.height,
  },
];

export function LogotypeLockup() {
  return (
    <ImageComponent
      id="logotype-lockup"
      prefix="Logotype"
      title="Lockup"
      description="Our logotype spells base in lowercase to feel approachable, modern, and code native. It is engineered to sit flush with the Square or stand on its own."
      images={images}
    />
  );
}
