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
      <div className="relative mb-52 h-[412px] w-full lg:mb-12 lg:h-[670px] xl:h-[870px]">
        {/* AsciiFluidScene Background */}
        <div className="absolute inset-0">
          <div className="h-full w-full">
            <AsciiFluidScene
              className="flex h-full w-full"
              imageUrl={defaultImg.src}
              enableInteractivity
              radius={0.35}
              velocityDissipation={0.9}
            />
          </div>
        </div>

        {/* Content Layer */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-start gap-12 px-6 pt-12 md:px-10 md:pt-16 lg:px-14 lg:pt-20">
          <div className="h-[19px] w-[82px] md:h-[33px] md:w-[142px]">
            <ImageWithLoading
              src="/images/basepay/logo.svg"
              alt="Base Pay logo"
              width={142}
              height={33}
            />
          </div>
          <Title className="text-left text-[3.75rem] md:text-[7.5rem]" level={TitleLevel.H2Regular}>
            The fastest way to pay with USDC
          </Title>

          <div className="flex w-2/5 flex-col items-start gap-5 md:flex-row">
            <Button
              variant={ButtonVariants.Primary}
              size={ButtonSizes.Small}
              className="pointer-events-auto w-full px-2"
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
              className="pointer-events-auto w-full px-2"
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
