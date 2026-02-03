import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import SubBrandsLockupSvg from './inverted-partner-lockup.svg';

const svg = SubBrandsLockupSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Inverted Partner Lockup',
    width: svg.width,
    height: svg.height,
  },
];

export function InvertedPartnerLockup() {
  return (
    <ImageComponent
      id="partner-lockup"
      title="Inverted Partner Lockup"
      description={
        <>
          For partner-led launches, place your logo first, Base second. In this lockup, Base should
          scale slightly smaller than your logo to signal a supporting role. Match by optical
          weight, not literal size. This shows that Base is supporting your launch, while keeping
          both brands visible. <br /> <br />
          <b>Reference:</b>{' '}
          <a
            href="https://www.figma.com/buzz/wU1gI2PuzAmTPytB5aYjnw/Partnering-with-Base-lockup?node-id=7-409&t=QOxoreu1xk9epx4p-1"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Figma
          </a>
        </>
      }
      images={images}
    />
  );
}
