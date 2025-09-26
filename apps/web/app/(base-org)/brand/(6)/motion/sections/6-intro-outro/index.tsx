import { VideoComponent } from 'apps/web/src/components/Brand/Video';

const videos = [
  {
    videoSrc: '/videos/motion/intro-outro-1.mp4',
    tag: 'Intro - Simple',
  },
  {
    videoSrc: '/videos/motion/intro-outro-2.mp4',
    tag: 'Outro - Simple',
  },
  {
    videoSrc: '/videos/motion/intro-outro-3.mp4',
    tag: 'Outro - Standard',
  },
  {
    videoSrc: '/videos/motion/intro-outro-4.mp4',
    tag: 'Intro - Standard',
  },
];

export function MotionIntroOutro() {
  return (
    <VideoComponent
      id="intro-outro"
      title="Intro / Outro"
      description={
        <span className="flex flex-col gap-4">
          We maintain a toolkit of intro and outro patterns so motion can flex to context without
          feeling random. Pick one of four presets:
          <ol className="ml-4 flex list-inside list-decimal flex-col gap-2">
            <li>Square-wipe — content slides on as the Square travels left to right.</li>
            <li>
              Center-burst — the Square expands to full bleed then collapses to reveal the next
              scene.
            </li>
            <li>Grid-mosaic — nine mini Squares flip to expose new artwork.</li>
            <li>Type-scramble — the headline resolves first, UI elements follow with a fade.</li>
          </ol>
          <span>
            Keep any sequence under 800 ms, limit to one transition style per story, and ensure
            every move lands on the baseline grid before interaction resumes.
          </span>
        </span>
      }
      videos={videos}
    />
  );
}
