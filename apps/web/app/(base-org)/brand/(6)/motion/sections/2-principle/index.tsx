import { VideoComponent } from 'apps/web/src/components/Brand/Video';

const videos = [
  {
    videoSrc: '/videos/motion/Wordmark_TEST_07_large.mp4',
  },
];

export function MotionPrinciple() {
  return (
    <VideoComponent
      id="principle"
      title="Principle"
      description={
        <span className="flex flex-col gap-3">
          <span className="flex flex-col items-start gap-2">
            <span className="font-medium">Intention first:</span>
            <span>Each animation communicates a specific state change or hierarchy cue.</span>
          </span>
          <span className="flex flex-col items-start gap-2">
            <span className="font-medium">Playful restraint:</span>
            <span>Small bounces and subtle overshoot add warmth without novelty-wear.</span>
          </span>
          <span className="flex flex-col items-start gap-2">
            <span className="font-medium">Consistency with flexibility:</span>
            <span>
              One cubic-bezier curve (0.4, 0, 0.2, 1) adapts across sizes; extend duration rather
              than change timing.
            </span>
          </span>
          <span className="flex flex-col items-start gap-2">
            <span className="font-medium">Snappy pace:</span>
            <span>Most UI feedback lands between 120 and 240 ms so interactions feel instant.</span>
          </span>
          <span className="flex flex-col items-start gap-2">
            <span className="font-medium">Square-led choreography:</span>
            <span>Motion often begins or ends with the Square to anchor brand recall.</span>
          </span>
          <span className="flex flex-col items-start gap-2">
            <span className="font-medium">Tech-positive polish:</span>
            <span>Transitions should feel like upgraded performance, not decorative flair.</span>
          </span>
        </span>
      }
      videos={videos}
    />
  );
}
