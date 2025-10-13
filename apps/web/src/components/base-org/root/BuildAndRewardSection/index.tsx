'use client';
import { useErrors } from 'apps/web/contexts/Errors';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Text from 'apps/web/src/components/base-org/typography/Text';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import { useCallback, useRef } from 'react';
import cubes from './assets/cubes.mp4';
import Link from 'apps/web/src/components/Link';

export default function BuildAndRewardSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { logError } = useErrors();
  const playVideo = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.play().catch((error) => {
      logError(error, 'failed to play video');
    });
  }, [logError]);

  return (
    <section>
      <div className="mb-12 mt-8 flex w-full flex-col items-center gap-4 md:flex-row">
        <div className="relative flex w-full flex-row gap-4" onMouseEnter={playVideo}>
          <video
            src={`${cubes}#t=0.001`}
            muted
            playsInline
            className="mx-auto p-2 motion-reduce:hidden"
            autoPlay={false}
            ref={videoRef}
            preload="auto"
          />
        </div>

        <div className="flex w-full flex-col gap-4 md:pl-20">
          <Title level={TitleLevel.Display2} className="text-[#E3E7E9]">
            Build and you will be rewarded
          </Title>
          <Text>
            Base supports passionate builders making apps for everyday life with grants, marketing,
            and as part of the Superchain, Base builders are eligible for consideration in
            Optimism&apos;s retroactive public goods funding.
          </Text>

          <div>
            <Link href="https://rounds.wtf/base-builds" target="_blank">
              <Button variant={ButtonVariants.Primary} iconName="baseOrgDiagonalUpArrow">
                Get rewarded
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
