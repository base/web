'use client';

import { useErrors } from 'apps/web/contexts/Errors';
import Card from 'apps/web/src/components/base-org/Card';
import Text from 'apps/web/src/components/base-org/typography/Text';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { useCallback, useRef } from 'react';

type VideoCardProps = {
  title: string;
  description: string | React.ReactNode;
  src: string;
};

export default function VideoCard({ title, description, src }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { logError } = useErrors();
  const playVideo = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.play().catch((error) => {
      logError(error, 'failed to play video');
    });
  }, [logError]);

  return (
    <div onMouseEnter={playVideo} className="w-full">
      <Card innerClassName="p-6 transition-all bg-[#0A0B0C] group-hover:bg-[#111111]">
        <video
          src={`${src}#t=0.001`}
          muted
          playsInline
          className="mx-auto mt-6 motion-reduce:hidden"
          autoPlay={false}
          ref={videoRef}
          preload="auto"
        />
        <Title level={TitleLevel.Title1} className="mb-4">
          {title}
        </Title>
        <Text className="text-[#e3e7e9]">{description}</Text>
      </Card>
    </div>
  );
}
