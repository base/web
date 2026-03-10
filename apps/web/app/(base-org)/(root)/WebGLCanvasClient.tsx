'use client';

import dynamic from 'next/dynamic';

const WebGLCanvas = dynamic(
  () => import('apps/web/src/components/WebGL/WebGLCanvas').then((mod) => mod.WebGLCanvas),
  { ssr: false },
);

export function WebGLCanvasClient() {
  return <WebGLCanvas />;
}
