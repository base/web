import { VideoComponent } from 'apps/web/src/components/Brand/Video';

const videos = [
  {
    videoSrc: '/videos/partnerships/single.mp4',
  },
];

// TODO: probably a vid
export function PartnershipsAnimation() {
  return (
    <VideoComponent
      id="animation"
      title="Animation"
      description="In motion, let the Basemark introduce the partner mark. A quick Square wipe reveals their logo left to right, then both settle on a shared baseline. Keep the sequence under 600 ms and use our global easing curve (0.4, 0, 0.2, 1) so the move feels familiar across touchpoints."
      videos={videos}
    />
  );
}
