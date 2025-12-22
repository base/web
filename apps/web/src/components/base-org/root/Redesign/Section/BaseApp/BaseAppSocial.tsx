import { ImageType } from 'apps/web/src/components/base-org/root/Redesign/Section';
import Image from 'next/image';

import ImageAsset1 from './social-asset-1.png';
import ImageAssetLike from './social-asset-like.png';
import ImageAsset2 from './social-asset-2.png';

const img1 = ImageAsset1 as ImageType;
const imgLike = ImageAssetLike as ImageType;
const img2 = ImageAsset2 as ImageType;

export function BaseAppSocial() {
  return (
    <div className="group flex h-full w-full items-center justify-center">
      <div>
        <Image
          src={img2.src}
          alt="Base App"
          width={img2.width}
          height={img2.height}
          className="mx-auto w-[50%] translate-x-[40%] rotate-[10deg] transition-all duration-300 group-hover:translate-x-[50%] group-hover:rotate-[12deg]"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 650px"
          quality={99}
        />
      </div>
      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <Image
          src={img1.src}
          alt="Base App"
          width={img1.width}
          height={img1.height}
          className="mx-auto w-[50%] transition-all duration-300 group-hover:rotate-[-8deg]"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 650px"
          quality={99}
        />
      </div>
      <div className="absolute inset-0 z-20 flex h-full w-full items-center justify-center">
        <Image
          src={imgLike.src}
          alt="Base App"
          width={imgLike.width}
          height={imgLike.height}
          className="mx-auto w-[20%] origin-center translate-x-[-100%] translate-y-[10%] rotate-[-10deg] transition-all duration-300 group-hover:rotate-[0deg] group-hover:scale-150"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 450px"
          quality={99}
        />
      </div>
    </div>
  );
}
