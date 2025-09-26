import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import TheSquareAppIconsPng from './app-icons.png';

const png = TheSquareAppIconsPng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'The Square App Icons',
    width: png.width,
    height: png.height,
  },
];

export function TheSquareAppIcons() {
  return (
    <ImageComponent
      id="the-square-app-icons"
      prefix="The Square"
      title="App Icons"
      description="When the Square becomes an app icon or social avatar, place the blue Square on a white ground: no gradients, borders, or drop shadows. In a square canvas the icon occupies sixty percent of the height; in a circular mask, reduce to fifty percent. This ratio preserves breathing room so the soft radius reads even at sixteen pixels. Avoid color inversion unless required by dark-mode OS tints. Treat the Square like a stamp: bold, centered, instantly recognizable."
      images={images}
    />
  );
}
