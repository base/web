import { ImageGrid } from 'apps/web/src/components/Brand/ImageGrid';
import { SvgImport } from 'apps/web/src/components/Brand/Image';
import UsageLayouts1Png from './layouts-1.png';
import UsageLayouts2Png from './layouts-2.png';
import UsageLayouts3Png from './layouts-3.png';
import UsageLayouts4Png from './layouts-4.png';
import UsageLayouts5Png from './layouts-5.png';
import UsageLayouts6Png from './layouts-6.png';
import UsageLayouts7Png from './layouts-7.png';
import UsageLayouts8Png from './layouts-8.png';
import UsageLayouts9Png from './layouts-9.png';

const png1 = UsageLayouts1Png as SvgImport;
const png2 = UsageLayouts2Png as SvgImport;
const png3 = UsageLayouts3Png as SvgImport;
const png4 = UsageLayouts4Png as SvgImport;
const png5 = UsageLayouts5Png as SvgImport;
const png6 = UsageLayouts6Png as SvgImport;
const png7 = UsageLayouts7Png as SvgImport;
const png8 = UsageLayouts8Png as SvgImport;
const png9 = UsageLayouts9Png as SvgImport;

export function UsageLayouts() {
  return <ImageGrid content={content} />;
}

const description = (
  <>
    <p className="mb-4">
      We can apply our three brand elements in different ways, depending on context. Each one of
      them can be a hero, or serve as a sign-off device. They can stand on their own, or work in
      concert. A few key considerations when using the brand elements in layout:
    </p>

    <p className="mb-2">- Maintain clear and consistent MARGINS across layouts.</p>

    <p className="mb-2">- Utilize GRIDS for aligning and distributing elements.</p>

    <p className="mb-2">
      - Use different PROPORTIONS when scaling brand elements; size them consistently, or use
    </p>

    <p>CONTRAST in size, having one XL elements next to a small one.</p>
  </>
);

const content = {
  id: 'usage-layouts',
  prefix: 'Usage',
  title: 'Layouts',
  description: description,
  images: [
    {
      src: png1.src,
      alt: 'Usage Layouts 1',
      width: png1.width,
      height: png1.height,
    },
    {
      src: png2.src,
      alt: 'Usage Layouts 2',
      width: png2.width,
      height: png2.height,
    },
    {
      src: png3.src,
      alt: 'Usage Layouts 3',
      width: png3.width,
      height: png3.height,
    },
    {
      src: png4.src,
      alt: 'Usage Layouts 4',
      width: png4.width,
      height: png4.height,
    },
    {
      src: png5.src,
      alt: 'Usage Layouts 5',
      width: png5.width,
      height: png5.height,
    },
    {
      src: png6.src,
      alt: 'Usage Layouts 6',
      width: png6.width,
      height: png6.height,
    },
    {
      src: png7.src,
      alt: 'Usage Layouts 7',
      width: png7.width,
      height: png7.height,
    },
    {
      src: png8.src,
      alt: 'Usage Layouts 8',
      width: png8.width,
      height: png8.height,
    },
    {
      src: png9.src,
      alt: 'Usage Layouts 9',
      width: png9.width,
      height: png9.height,
    },
  ],
};
