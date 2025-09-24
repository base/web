import { VideoComponent } from 'apps/web/src/components/Brand/Video';

const videos = [
  {
    videoSrc: '/videos/motion/TYPE_TEST_11_BRANDGUIDELINE.mp4',
    tag: 'Standard - 1',
  },
  {
    videoSrc: '/videos/motion/TYPE_TEST_16_BRANDGUIDELINE.mp4',
    tag: 'Standard - 2',
  },
  {
    videoSrc: '/videos/motion/TYPE_TEST_18_BRANDGUIDELINE.mp4',
    tag: 'Simple/Lower thirds',
  },
  {
    videoSrc: '/videos/motion/TYPE_TEST_20_BRANDGUIDELINE.mp4',
    tag: 'Doto',
  },
];

export function MotionType() {
  return (
    <VideoComponent
      id="type"
      title="Type"
      description={
        <span className="flex flex-col gap-2">
          Our “tech scramble” animation reveals text by cascading vertical glyph swaps that resolve
          into the final message. Use it for product headlines, social teasers, or keynotes—never
          body copy. Reserve Medium weight for clarity and keep sequences under 800 ms to hold
          attention. Pair with a quick fade-in of supporting content so hierarchy stays clear.
        </span>
      }
      videos={videos}
    />
  );
}
