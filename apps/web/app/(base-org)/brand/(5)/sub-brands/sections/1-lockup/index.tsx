import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import SubBrandsLockupSvg from './structure.svg';

const svg = SubBrandsLockupSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Sub Brands Lockup',
    width: svg.width,
    height: svg.height,
  },
];

export function SubBrandsLockup() {
  return (
    <ImageComponent
      id="sub-brands-lockup"
      title="Lockup"
      description={
        <>
          <span className="mb-4 block">
            Sub-brands organize our expanding product suite into clear pillars while keeping
            everything unmistakably Base. Each surface — Base App for everyday users, Base Builders
            for developers, Base Pay for commerce, and future services — borrows the Square, Base
            Sans, and color core, then adds a functional descriptor.
          </span>
          <span className="mb-4 block">
            Naming pattern: &quot;base&quot; space descriptor. Visual lockup: descriptor in
            lowercase followed by the Square. Maintain palette parity and type pairing;
            differentiation comes from content tone and motion, not from new logos. Retire or merge
            sub-brands that lose strategic value.
          </span>
        </>
      }
      fullWidth
      images={images}
    />
  );
}
