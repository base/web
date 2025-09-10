import { VideoComponent } from 'apps/web/src/components/Brand/Video';

const videos = [
  {
    videoSrc: '/videos/motion/the-square-1.mp4',
  },
  {
    videoSrc: '/videos/motion/the-square-2.mp4',
  },
  {
    videoSrc: '/videos/motion/the-square-3.mp4',
  },
  {
    videoSrc: '/videos/motion/the-square-4.mp4',
  },
  {
    videoSrc: '/videos/motion/the-square-5.mp4',
  },
  {
    videoSrc: '/videos/motion/the-square-6.mp4',
  },
  {
    videoSrc: '/videos/motion/the-square-7.mp4',
  },
  {
    videoSrc: '/videos/motion/the-square-8.mp4',
  },
];

export function MotionTheSquare() {
  return <VideoComponent id="the-square" title="The Square" videos={videos} fullWidth />;
}
