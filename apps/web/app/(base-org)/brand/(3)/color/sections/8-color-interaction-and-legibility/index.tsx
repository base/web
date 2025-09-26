import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import ColorInteractionAndLegibilitySvg from './color-interaction-and-legibility.svg';

const svg = ColorInteractionAndLegibilitySvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Color Interaction and Legibility',
    width: svg.width,
    height: svg.height,
  },
];

export function ColorInteractionAndLegibility() {
  return (
    <ImageComponent
      id="color-interaction-and-legibility"
      title="Color Interaction and Legibility"
      description={
        <span className="flex flex-col gap-4">
          <span>
            Consider aesthetics and legibility when combining foreground and background colors. Aim
            to use a limited and logical color palette, and avoid jarring combinations or overly low
            contrast.
          </span>
          <span>
            When using color on websites or digital screens, aim to meet WCAG AA Large accessibility
            standard. This ensures sufficient contrast and legibility for a wide range of users,
            maintaining both clarity and inclusivity in our visual communication.
          </span>
        </span>
      }
      images={images}
    />
  );
}
