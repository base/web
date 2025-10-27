import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import AsciiFluidScene from 'apps/web/src/components/WebGL/Scenes/AsciiFluidScene';
import defaultImg from 'apps/web/public/images/backgrounds/default-old.webp';
import {
  Button,
  ButtonVariants,
  ButtonSizes,
} from 'apps/web/src/components/Button/Redesign/Button';
import Link from 'apps/web/src/components/Link';

export default function Hero() {
  return (
    <section className="col-span-full">
      <div className="relative mb-52 h-[412px] w-full lg:mb-12 lg:h-[670px] xl:h-[670px]">
        {/* AsciiFluidScene Background */}
        <div className="absolute inset-0">
          <div className="w-full h-full">
            <AsciiFluidScene
              className="flex w-full h-full"
              imageUrl={defaultImg.src}
              enableInteractivity
              radius={0.35}
              velocityDissipation={0.9}
            />
          </div>
        </div>

        {/* Content Layer */}
        <div className="flex relative z-10 flex-col gap-12 justify-start px-6 pt-12 h-full pointer-events-none md:px-10 md:pt-16 lg:px-14 lg:pt-20">
          <div className="h-[19px] w-[82px] md:h-[33px] md:w-[142px]">
            <ImageWithLoading
              src="/images/basepay/logo.svg"
              alt="Base Pay logo"
              width={142}
              height={33}
            />
          </div>
          <Title className="text-left" level={TitleLevel.H4Regular}>
            The fastest way to pay with USDC
          </Title>

          <div className="flex flex-col gap-5 items-start max-w-xs md:max-w-md md:flex-row">
            <Button
              variant={ButtonVariants.Primary}
              size={ButtonSizes.Small}
              className="w-full pointer-events-auto"
            >
              <Link
                href="https://docs.base.org/base-account/guides/accept-payments"
                target="_blank"
                rel="noopener noreferrer"
              >
                Accept Base Pay
              </Link>
            </Button>

            <Button
              variant={ButtonVariants.Secondary}
              size={ButtonSizes.Small}
              className="w-full pointer-events-auto"
            >
              <Link
                href="https://coinbaseshop.com/cart/49933861617970:1?discount=BASE10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop with Base Pay
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
