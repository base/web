import { VideoComponent } from 'apps/web/src/components/Brand/Video';

function CrossSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" fill="#FC401F" />
      <path
        d="M9.20018 7.99971L11 9.79953L9.80012 10.9994L8.00029 9.19959L6.19988 11L5 9.80012L6.80041 7.99971L5.00059 6.19988L6.20047 5L8.00029 6.79982L9.79953 5.00059L10.9994 6.20047L9.20018 7.99971Z"
        fill="white"
      />
    </svg>
  );
}

const videos = [
  {
    videoSrc: '/videos/motion/misuse-1.mp4',
    tag: (
      <span className="flex gap-2 items-center">
        <CrossSvg />
        <span>Do not use motion blur</span>
      </span>
    ),
  },
  {
    videoSrc: '/videos/motion/misuse-2.mp4',
    tag: (
      <span className="flex gap-2 items-center">
        <CrossSvg />
        <span>Wrong curves & wrong speed</span>
      </span>
    ),
  },
  {
    videoSrc: '/videos/motion/misuse-3.mp4',
    tag: (
      <span className="flex gap-2 items-center">
        <CrossSvg />
        <span>Do not distort square</span>
      </span>
    ),
  },
  {
    videoSrc: '/videos/motion/misuse-4.mp4',
    tag: (
      <span className="flex gap-2 items-center">
        <CrossSvg />
        <span>Do not 3D rotate</span>
      </span>
    ),
  },
];

export function MotionMisuse() {
  return (
    <VideoComponent
      id="misuse"
      title="Misuse"
      description="In order to maintain brand consistency and integrity, please adhere to all usage guidelines outlined in this document, and avoid any distortions of any kind. "
      videos={videos}
    />
  );
}
