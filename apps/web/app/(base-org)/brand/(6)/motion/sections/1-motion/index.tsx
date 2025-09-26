import { VideoComponent } from 'apps/web/src/components/Brand/Video';

const videos = [
  {
    videoSrc: '/videos/motion/Wordmark_TEST_07_large.mp4',
  },
];

export function MotionMotion() {
  return (
    <VideoComponent
      id="motion"
      title="Motion"
      description={
        <span className="flex flex-col gap-2">
          <span>
            Motion is essential to Base&apos;s identity. It reflects the speed and fluidity of the
            onchain world while reinforcing hierarchy, interaction, and personality.
          </span>
          <span>Our motion language is intentional, from subtle easing to bold transitions.</span>
          <span>
            By owning how we move, Base stays distinct across product, social, and live experiences.
          </span>
          <span>Movement should always feel unmistakably ours.</span>
        </span>
      }
      videos={videos}
      fullWidth
    />
  );
}
