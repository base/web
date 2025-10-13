import { StaticImageData } from 'next/image';

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const STATIC_IMAGE_FOLDER = '/_next/static/';
export const PUBLIC_IMAGE_FOLDER = '/images/';

export const getImageAbsoluteSource = (src: string | StaticImageData): string => {
  return typeof src === 'string' ? src : src.src;
};

export const shouldUseNextImage = (src: string | StaticImageData): boolean => {
  const absoluteImageSource = getImageAbsoluteSource(src);

  // Images imported from within a component
  const isStaticImage = absoluteImageSource.startsWith(STATIC_IMAGE_FOLDER);
  if (isStaticImage) return true;

  // Images in public folder
  const isPublicImage = absoluteImageSource.startsWith(PUBLIC_IMAGE_FOLDER);
  if (isPublicImage) return true;

  // Any other image, don't load via base.org / nextjs image proxy
  return false;
};

function isDataUrl(url: string) {
  return /^data:image\/[a-zA-Z]+;base64,/.test(url);
}

type GetCloudinaryMediaUrlParams = {
  media: string;
  width: number;
  format?: 'webp' | 'png' | 'jpg';
};

export function getCloudinaryMediaUrl({
  media,
  width,
  format = 'webp',
}: GetCloudinaryMediaUrlParams) {
  if (isDataUrl(media)) return media;

  const imageWidth = `w_${width * 2}`;
  const imageFormat = `f_${format}`;
  const imageUrl = encodeURIComponent(media);
  const fetchOptions = [imageWidth, imageFormat, imageUrl].join('/');

  const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${fetchOptions}`;

  return url;
}
