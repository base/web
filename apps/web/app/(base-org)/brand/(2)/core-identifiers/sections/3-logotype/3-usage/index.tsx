import { TwoColumn } from 'apps/web/src/components/Brand/TwoColumn';
import { SvgImport } from 'apps/web/src/components/Brand/Image';
import LogotypeUsage1Png from './usage-1.png';
import LogotypeUsage2Png from './usage-2.png';

const png1 = LogotypeUsage1Png as SvgImport;
const png2 = LogotypeUsage2Png as SvgImport;

export function LogotypeUsage() {
  return <TwoColumn content={content} />;
}

const columnOneContent = (
  <span className="flex flex-col">
    <span className="mb-2">As sign-off:</span>
    <span className="ml-2 flex items-start">
      <span className="mr-2 mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-base-gray-200" />
      <span className="text-base-gray-200">Aligned to edge or middle.</span>
    </span>
    <span className="ml-2 flex items-start">
      <span className="mr-2 mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-base-gray-200" />
      <span className="text-base-gray-200">Always as a lockup.</span>
    </span>
  </span>
);

const columnTwoContent = (
  <span className="flex flex-col">
    <span className="mb-2">In dynamic layouts:</span>
    <span className="ml-2 flex items-start">
      <span className="mr-2 mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-base-gray-200" />
      <span className="text-base-gray-200">
        The logo and square can be decoupled; maintaining the same scale, but shifting horizontally,
        vertically, or diagonally.
      </span>
    </span>
    <span className="ml-2 flex items-start">
      <span className="mr-2 mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-base-gray-200" />
      <span className="text-base-gray-200">
        Never move the square to the right of the logotype.
      </span>
    </span>
    <span className="ml-2 flex items-start">
      <span className="mr-2 mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-base-gray-200" />
      <span className="text-base-gray-200">
        Aligned to edge or middle (or to grid subdivisions).
      </span>
    </span>
    <span className="ml-2 flex items-start">
      <span className="mr-2 mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-base-gray-200" />
      <span className="text-base-gray-200">Decoupling requires Creative Office approval.</span>
    </span>
  </span>
);

const content = {
  id: 'logotype-usage',
  prefix: 'Logotype',
  title: 'Usage',
  description:
    'In most cases, the logo should be used in its locked up state. Occasionally, it could benefit from decoupling the elements to create dynamic layouts by Creative Office, where the square defines the space and the logotype acts as a sign-off.',
  columnOne: {
    image: {
      src: png1.src,
      alt: 'Logotype Usage',
      width: png1.width,
      height: png1.height,
    },
    content: columnOneContent,
  },
  columnTwo: {
    image: {
      src: png2.src,
      alt: 'Logotype Usage',
      width: png2.width,
      height: png2.height,
    },
    content: columnTwoContent,
  },
};
