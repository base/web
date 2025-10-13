'use client';

import { CloudinaryMediaUrlResponse } from 'apps/web/app/api/cloudinaryUrl/route';
import { getImageAbsoluteSource, getCloudinaryMediaUrl } from 'apps/web/src/utils/images';
import { isDataUrl } from 'apps/web/src/utils/urls';
import { StaticImageData } from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';

type ImageCloudinaryProps = {
  src: string | StaticImageData;
  alt: string;
  title?: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  className?: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  style?: CSSProperties;
};

// This image component is to purposefully avoid loading images via base.org
export default function ImageCloudinary({
  src,
  alt,
  title,
  width = 1200, // realistically, no image needs to be higher res
  height,
  className,
  onLoad,
  onError,
  style,
}: ImageCloudinaryProps) {
  const absoluteSrc = getImageAbsoluteSource(src);

  const [cloudinaryUploadUrl, setCloudinaryUploadUrl] = useState<string | null>(null);

  const cloudinaryFetchUrl = getCloudinaryMediaUrl({
    media: absoluteSrc,
    width: Number(width),
  });

  const shouldUploadToCloudinary =
    isDataUrl(absoluteSrc) ||
    absoluteSrc.length > 255 ||
    absoluteSrc.includes('?image=') ||
    absoluteSrc.includes('?url=');

  useEffect(() => {
    // Some images need to be uploaded before being proxied
    // dataUrl and long Urls need to be uploaded to Cloudinary

    // ref: https://support.cloudinary.com/hc/en-us/articles/209209649-Does-Cloudinary-impose-a-URL-length-limit
    if (shouldUploadToCloudinary) {
      async function handleGetCloudinaryUrl() {
        try {
          const response = await fetch('/api/cloudinaryUrl', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              media: absoluteSrc,
              width: width,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to get Cloudinary URL');
          }

          const data = (await response.json()) as CloudinaryMediaUrlResponse;
          const url = data?.url;
          if (url) {
            setCloudinaryUploadUrl(url);
          }
        } catch (error) {
          console.error('Error getting Cloudinary URL:', error);
        }
      }

      handleGetCloudinaryUrl()
        .then()
        .catch((error) => console.log(error));
    }
  }, [absoluteSrc, shouldUploadToCloudinary, width]);

  // Image needs to be manually upload/proxied tru cloudinary
  if (shouldUploadToCloudinary && !cloudinaryUploadUrl) {
    return null;
  }

  const imgSrc = cloudinaryUploadUrl ?? cloudinaryFetchUrl;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      className={className}
      alt={alt}
      title={title}
      onLoad={onLoad}
      onError={onError}
      width={width}
      height={height}
      style={style}
    />
  );
}
