'use client';

import { Basename } from '@coinbase/onchainkit/identity';
import LottieAnimation from 'apps/web/src/components/LottieAnimation';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import { getBasenameAnimation, getBasenameImage } from 'apps/web/src/utils/usernames';

export default function BasenameAvatar({
  basename,
  wrapperClassName = 'h-8 w-8 overflow-hidden rounded-full',
  animate = false,
  width,
  height,
}: {
  basename: Basename;
  wrapperClassName?: string;
  animate?: boolean;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
}) {
  const { data: basenameAvatar, isLoading: basenameAvatarIsLoading } = useBaseEnsAvatar({
    name: basename,
  });
  if (basenameAvatar ?? !animate) {
    const image = getBasenameImage(basename);
    return (
      <ImageWithLoading
        src={basenameAvatar ?? image}
        alt={basename}
        title={basename}
        wrapperClassName={wrapperClassName}
        imageClassName="object-cover w-full h-full"
        backgroundClassName="bg-blue-500"
        width={width}
        height={height}
        forceIsLoading={basenameAvatarIsLoading}
      />
    );
  }

  const animation = getBasenameAnimation(basename);

  return <LottieAnimation data={animation} wrapperClassName={wrapperClassName} />;
}
