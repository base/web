import { VideoComponent } from 'apps/web/src/components/Brand/Video';

const videos = [
  {
    videoSrc: '/videos/motion/logotype-1.mp4',
    tag: 'Interactive - Hover',
  },
  {
    videoSrc: '/videos/motion/logotype-2.mp4',
    tag: 'Website',
  },
  {
    videoSrc: '/videos/motion/logotype-3.mp4',
    tag: 'Scramble',
  },
  {
    videoSrc: '/videos/motion/logotype-4.mp4',
    tag: 'Simple',
  },
];

export function MotionLogotype() {
  return (
    <VideoComponent
      id="logotype"
      title="Logotype"
      description={
        <span className="flex flex-col gap-2">
          <span>
            The logotype can flex like our community—letters can scramble, rotate, or momentarily
            morph into icons before snapping back to &quot;base.&quot;
          </span>
          <span>
            Keep tracking and baseline constant so the mark always lands crisp. Use expressive
            variants for launches, live streams, and social teasers; default to the simpler slide-in
            for routine UI. Never distort letterforms beyond 10 degrees or exceed one second total
            runtime.
          </span>
        </span>
      }
      videos={videos}
    />
  );
}
