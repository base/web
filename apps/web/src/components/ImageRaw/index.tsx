import { getImageAbsoluteSource } from 'apps/web/src/utils/images';
import { StaticImageData } from 'next/image';
import { CSSProperties } from 'react';

type ImageRawProps = {
  src: string | StaticImageData;
  alt: string;
  title?: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  className?: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  style?: CSSProperties;
};

// This image component is to purposefully avoid loading images via base.org
export default function ImageRaw({
  src,
  alt,
  title,
  width,
  height,
  className,
  onLoad,
  style,
}: ImageRawProps) {
  const imageSrc = getImageAbsoluteSource(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      className={className}
      alt={alt}
      title={title}
      onLoad={onLoad}
      width={width}
      height={height}
      style={style}
    />
  );
}
