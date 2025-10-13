import Image, { ImageProps, StaticImageData } from 'next/image';
import { shouldUseNextImage } from 'apps/web/src/utils/images';
import ImageRaw from 'apps/web/src/components/ImageRaw';
import ImageCloudinary from 'apps/web/src/components/ImageCloudinary';

type ImageAdaptiveProps = ImageProps & {
  // Fix next's js bad import
  src: string | StaticImageData;
  useCloudinary?: boolean;
};

export default function ImageAdaptive({
  priority,
  src,
  alt,
  title,
  width,
  height,
  className,
  onLoad,
  placeholder,
  quality,
  style,
  fill,
  useCloudinary = true,
}: ImageAdaptiveProps) {
  const useNextImage = shouldUseNextImage(src);

  if (useNextImage) {
    return (
      <Image
        src={src}
        className={className}
        alt={alt}
        title={title}
        placeholder={placeholder}
        onLoad={onLoad}
        width={width}
        height={height}
        quality={quality}
        style={style}
        priority={priority}
        fill={fill}
      />
    );
  }

  if (useCloudinary) {
    return (
      <ImageCloudinary
        src={src}
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

  return (
    <ImageRaw
      src={src}
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
