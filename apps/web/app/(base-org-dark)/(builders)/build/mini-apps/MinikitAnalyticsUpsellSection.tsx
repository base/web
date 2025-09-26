import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import Image from 'next/image';
import Link from 'apps/web/src/components/Link';
import baseDevUpsell from './base-dev.png';

export function MinikitAnalyticsUpsellSection() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-6 text-3xl leading-[1.125] tracking-[-0.96px] md:flex-row md:items-end md:gap-[100px]">
        <span className="max-w-[450px]">
          Understand how users interact with your mini apps on Base
        </span>
        <Button
          variant={ButtonVariants.Secondary}
          asChild
          className="flex w-full min-w-[225px] px-3 md:w-auto"
          size={ButtonSizes.Small}
        >
          <Link href="https://base.dev/" className="tracking-normal">
            Get started
          </Link>
        </Button>
      </div>
      <div className="relative aspect-[338/271] overflow-hidden rounded-xl bg-gray-90 md:aspect-[958/708]">
        <Image
          alt="Image showing analytics platform for minikit"
          src={baseDevUpsell.src}
          width={946.5}
          height={591}
          className="absolute bottom-0 right-0 h-[90%] w-[90%] rounded-tl-lg object-cover object-left-top"
        />
      </div>
    </div>
  );
}
