import type { Metadata } from 'next';
import Image from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
// import { GenericHero } from './GenericHero';
import { GenericHero } from 'apps/web/src/components/base-org/root/Redesign/Hero/GenericHero';
import content from './content.json';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import classNames from 'classnames';
import { Halftone } from 'apps/web/app/(base-org)/enterprises/Halftone';

import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import Link from 'apps/web/src/components/Link';
import { cn } from 'apps/web/src/utils/cn';
import AnimatedButton from 'apps/web/src/components/Button/AnimatedButton';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Startups`,
  openGraph: {
    title: `Base | Startups`,
    url: `/startups`,
  },
};

export default async function Startups() {
  return (
    <>
      <AnalyticsProvider context="startups">
        {/* <div id="webgl-canvas" className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="-z-1 h-full w-full">
            <WebGLCanvas />
          </div>
        </div> */}
        <Container className="!lg:pt-0 !pt-0">
          <div className="col-span-full flex flex-col gap-0">
            {/* Hero Section */}
            <GenericHero
              title={content.hero.header}
              description={content.hero.subheader}
              imageUrl={'/images/backgrounds/rocket_bg.webp'}
              primaryColor="#FF6330"
              buttons={[
                { text: content.hero.ctas.primary.label, href: content.hero.ctas.primary.url },
              ]}
            />

            {/* Logo Strip Section */}
            <Section content={{ title: content.logoStrip.label }}>
              <div className="relative col-span-full">
                <div
                  style={{ background: 'linear-gradient(to right, white, transparent)' }}
                  className="absolute left-0 top-0 z-20 h-full w-[10%] bg-base-gray-200/20"
                ></div>
                <div
                  style={{ background: 'linear-gradient(to left, white, transparent)' }}
                  className="absolute right-0 top-0 z-20 h-full w-[10%] bg-base-gray-200/20"
                ></div>

                <Marquee className="[--duration:40s]" pauseOnHover={false}>
                  {content.logoStrip.logos.map((logo) => (
                    <div
                      key={logo}
                      className="flex aspect-video min-w-[120px] items-center justify-center rounded-lg bg-base-gray-25 px-6"
                    >
                      <Image
                        className="opacity-90 grayscale"
                        src={`/images/startups/logos/${logo.toLowerCase()}.webp`}
                        alt={logo}
                        width={120}
                        height={60}
                      />
                    </div>
                  ))}
                </Marquee>
              </div>
            </Section>

            {/* Value Props Section */}
            <Section content={{ title: 'Why build on Base?' }} className="w-full">
              <div className="col-span-full grid gap-8 md:grid-cols-3">
                {content.valueProps.map((prop) => (
                  <div key={prop.id} className="flex flex-col gap-4 rounded-xl">
                    <div className="aspect-square w-full rounded-lg bg-base-gray-200/20">
                      {/* <Image src={prop.image} alt={prop.header} fill className="object-cover" /> */}
                      <Halftone
                        imageUrl={prop.image}
                        backgroundColor="#fbfbfb"
                        primaryColor={prop.primaryColor}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Title level={TitleLevel.H2Regular}>{prop.header}</Title>
                      <Text variant={TextVariant.BodyLarge} className="!text-base-gray-200">
                        {prop.subheader}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Base Batches Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.baseBatches.header,
                description: content.baseBatches.subheader,
                cta: { label: content.baseBatches.cta.label, href: content.baseBatches.cta.url },
              }}
            >
              <div className="col-span-full aspect-[3/1] w-full overflow-hidden rounded-lg bg-base-gray-25">
                {/* <Halftone
                  imageUrl="/images/startups/batches.webp"
                  backgroundColor="#fbfbfb"
                  primaryColor="#8081FF"
                /> */}
                <div className="relative flex h-full w-full items-center justify-center p-12">
                  <svg
                    width="829"
                    height="159"
                    className="h-full w-full max-w-[600px] fill-[#7575FF]"
                    viewBox="0 0 829 159"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M28.4141 36.7193C28.4141 38.7564 30.0654 40.4077 32.1025 40.4077H86.9503C88.9873 40.4077 90.6387 42.0591 90.6387 44.0961V64.7642C90.6387 66.8013 92.29 68.4526 94.3271 68.4526H113.563C115.6 68.4526 117.251 70.104 117.251 72.141V127.364C117.251 129.401 115.6 131.052 113.563 131.052H94.3271C92.29 131.052 90.6387 132.704 90.6387 134.741V155.266C90.6387 157.303 88.9873 158.955 86.9503 158.955H31.7265C29.6894 158.955 28.0381 157.303 28.0381 155.266V134.741C28.0381 132.704 26.3867 131.052 24.3497 131.052H3.71868C1.68163 131.052 0.0302734 129.401 0.0302734 127.364V72.141C0.0302734 70.104 1.68163 68.4526 3.71868 68.4526H24.3497C26.3867 68.4526 28.0381 66.8013 28.0381 64.7642V44.3158C28.0381 42.2788 26.3867 40.6274 24.3497 40.6274H3.6884C1.65135 40.6274 0 38.9761 0 36.939V3.92424C0 1.88719 1.65135 0.23584 3.6884 0.23584H24.7257C26.7627 0.23584 28.4141 1.88719 28.4141 3.92424V36.7193ZM28.4297 126.867C28.4297 128.904 30.081 130.555 32.1181 130.555H85.1622C87.1992 130.555 88.8506 128.904 88.8506 126.867V72.4955C88.8506 70.4585 87.1992 68.8071 85.1622 68.8071H32.1181C30.081 68.8071 28.4297 70.4585 28.4297 72.4955V126.867Z" />
                    <path d="M153.8 134.551C153.8 132.514 152.149 130.863 150.112 130.863H131.087C129.05 130.863 127.399 129.211 127.399 127.174V106.136C127.399 104.099 129.05 102.448 131.087 102.448H150.721C152.758 102.448 154.41 100.796 154.41 98.7593V94.4711C154.41 92.4341 156.061 90.7827 158.098 90.7827H212.295C214.333 90.7827 215.984 89.1314 215.984 87.0943V72.4789C215.984 70.4419 214.333 68.7905 212.295 68.7905H159.401C157.364 68.7905 155.712 67.1392 155.712 65.1021V44.0639C155.712 42.0268 157.364 40.3755 159.401 40.3755H212.913C214.95 40.3755 216.601 42.0268 216.601 44.0639V64.3043C216.601 66.3413 218.252 67.9927 220.289 67.9927H240.711C242.748 67.9927 244.399 69.644 244.399 71.6811V102.9C244.399 102.931 244.424 102.956 244.455 102.956C244.485 102.956 244.51 102.98 244.51 103.011V127.682C244.51 129.719 242.859 131.371 240.822 131.371H220.089C218.052 131.371 216.401 133.022 216.401 135.059V155.266C216.401 157.303 214.75 158.955 212.712 158.955H157.489C155.452 158.955 153.8 157.303 153.8 155.266V134.551ZM216.095 111.685C216.095 111.654 216.07 111.629 216.04 111.629C216.009 111.629 215.984 111.604 215.984 111.574V110.339C215.984 109.627 215.406 109.049 214.694 109.049H159.501C157.464 109.049 155.813 110.701 155.813 112.738V126.867C155.813 128.904 157.464 130.555 159.501 130.555H212.407C214.444 130.555 216.095 128.904 216.095 126.867V111.685Z" />
                    <path d="M283.073 36.7193C283.073 38.7564 284.724 40.4077 286.761 40.4077H341.609C343.646 40.4077 345.297 42.0591 345.297 44.0961V65.1197C345.297 67.1568 343.646 68.8081 341.609 68.8081H286.778C284.74 68.8081 283.089 70.4595 283.089 72.4965V126.867C283.089 128.904 284.74 130.555 286.778 130.555H341.609C343.646 130.555 345.297 132.207 345.297 134.244V155.266C345.297 157.303 343.646 158.955 341.609 158.955H286.386C284.349 158.955 282.698 157.303 282.698 155.266V134.741C282.698 132.704 281.046 131.052 279.009 131.052H258.377C256.34 131.052 254.689 129.401 254.689 127.364V72.141C254.689 70.104 256.34 68.4526 258.377 68.4526H279.009C281.046 68.4526 282.698 66.8013 282.698 64.7642V44.4028C282.698 42.3657 281.046 40.7144 279.009 40.7144H258.347C256.31 40.7144 254.658 39.063 254.658 37.026V4.01116C254.658 1.97411 256.31 0.322754 258.347 0.322754H279.384C281.421 0.322754 283.073 1.97411 283.073 4.01116V36.7193Z" />
                    <path d="M446.053 65.1197C446.053 67.1568 444.402 68.8081 442.365 68.8081H387.533C385.496 68.8081 383.844 70.4595 383.844 72.4965V126.867C383.844 128.904 385.496 130.555 387.533 130.555H442.365C444.402 130.555 446.053 132.207 446.053 134.244V155.266C446.053 157.303 444.402 158.955 442.365 158.955H387.142C385.105 158.955 383.454 157.303 383.454 155.266V134.741C383.454 132.704 381.803 131.052 379.765 131.052H359.133C357.096 131.052 355.445 129.401 355.445 127.364V72.141C355.445 70.104 357.096 68.4526 359.133 68.4526H379.765C381.803 68.4526 383.454 66.8013 383.454 64.7642V44.0971C383.454 42.06 385.105 40.4087 387.142 40.4087H442.365C444.402 40.4087 446.053 42.06 446.053 44.0971V65.1197Z" />
                    <path d="M484.617 36.3973C484.617 38.4343 486.268 40.0857 488.305 40.0857H543.153C545.19 40.0857 546.841 41.737 546.841 43.7741V64.4412C546.841 66.4783 548.493 68.1296 550.53 68.1296H569.759C571.796 68.1296 573.448 69.781 573.448 71.818V155.266C573.448 157.303 571.796 158.955 569.759 158.955H548.722C546.685 158.955 545.034 157.303 545.034 155.266V72.1735C545.034 70.1365 543.382 68.4851 541.345 68.4851H488.34C486.303 68.4851 484.652 70.1365 484.652 72.1735V155.266C484.652 157.303 483.001 158.955 480.963 158.955H459.926C457.889 158.955 456.238 157.303 456.238 155.266V71.818C456.238 69.781 457.889 68.1296 459.926 68.1296H480.553C482.59 68.1296 484.242 66.4783 484.242 64.4412V44.0807C484.242 42.0437 482.59 40.3923 480.553 40.3923H459.89C457.853 40.3923 456.202 38.741 456.202 36.7039V3.68914C456.202 1.65209 457.853 0.000732422 459.89 0.000732422H480.928C482.965 0.000732422 484.617 1.65209 484.617 3.68914V36.3973Z" />
                    <path d="M674.304 64.7789C674.304 66.8159 675.955 68.4673 677.992 68.4673L697.018 68.4673C699.055 68.4673 700.706 70.1187 700.706 72.1557L700.706 93.1939C700.706 95.231 699.055 96.8823 697.018 96.8823L677.384 96.8823C675.347 96.8823 673.695 98.5337 673.695 100.571L673.695 105.36C673.695 107.397 672.044 109.048 670.007 109.048L615.809 109.048C613.771 109.048 612.12 110.7 612.12 112.737L612.12 126.851C612.12 128.888 613.771 130.54 615.809 130.54L697.018 130.54C699.055 130.54 700.706 132.191 700.706 134.228L700.706 155.266C700.706 157.303 699.055 158.955 697.018 158.955L615.193 158.955C613.156 158.955 611.505 157.303 611.505 155.266L611.505 135.027C611.505 132.99 609.854 131.338 607.816 131.338L587.394 131.338C585.357 131.338 583.706 129.687 583.706 127.65L583.706 96.4307C583.706 96.4002 583.681 96.3755 583.651 96.3755C583.62 96.3755 583.596 96.3508 583.596 96.3203L583.596 71.6498C583.596 69.6128 585.247 67.9614 587.284 67.9614L608.016 67.9614C610.053 67.9614 611.704 66.3101 611.704 64.273L611.704 44.0492C611.704 42.0122 613.355 40.3608 615.393 40.3608L670.615 40.3609C672.652 40.3609 674.304 42.0122 674.304 44.0493L674.304 64.7789ZM612.01 87.6465C612.01 87.677 612.034 87.7017 612.065 87.7017C612.095 87.7017 612.12 87.7264 612.12 87.7568L612.12 89.2417C612.12 90.0922 612.81 90.7817 613.66 90.7817L668.603 90.7818C670.64 90.7818 672.291 89.1304 672.291 87.0933L672.291 72.4633C672.291 70.4263 670.64 68.7749 668.603 68.7749L615.698 68.7749C613.661 68.7749 612.01 70.4263 612.01 72.4633L612.01 87.6465Z" />
                    <path d="M828.064 65.1197C828.064 67.1567 826.413 68.8081 824.376 68.8081H743.164C741.127 68.8081 739.475 70.4595 739.475 72.4965V87.8736C739.475 89.9107 741.127 91.562 743.164 91.562H796.983C799.02 91.562 800.672 93.2134 800.672 95.2504V99.1988C800.672 101.236 802.323 102.887 804.36 102.887H824.583C826.62 102.887 828.271 104.539 828.271 106.576V127.613C828.271 129.65 826.62 131.301 824.583 131.301H805.151C803.114 131.301 801.463 132.953 801.463 134.99V155.266C801.463 157.303 799.811 158.955 797.774 158.955H714.543C712.506 158.955 710.854 157.303 710.854 155.266V134.229C710.854 132.192 712.506 130.541 714.543 130.541H796.168C798.205 130.541 799.856 128.889 799.856 126.852V113.517C799.856 111.48 798.205 109.829 796.168 109.829H741.442C739.405 109.829 737.754 108.177 737.754 106.14V100.538C737.754 98.5005 736.102 96.8491 734.065 96.8491H714.749C712.712 96.8491 711.06 95.1978 711.06 93.1607V72.1225C711.06 70.0854 712.712 68.4341 714.749 68.4341H735.175C737.212 68.4341 738.863 66.7827 738.863 64.7457V44.0815C738.863 42.0444 740.514 40.3931 742.551 40.3931H824.376C826.413 40.3931 828.064 42.0444 828.064 44.0815V65.1197Z" />
                  </svg>
                </div>
              </div>
            </Section>

            {/* Accelerator Programs Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.acceleratorPrograms.header,
                description: content.acceleratorPrograms.subheader,
              }}
            >
              <div
                className={cn(
                  'col-span-full grid gap-[min(2.25vw,_32px)]',
                  'grid-cols-1 lg:grid-cols-2',
                )}
              >
                {content.acceleratorPrograms.cards.map((card, index) => (
                  <Link
                    href={card.url}
                    key={card.title}
                    target={card.url.includes('https://') ? '_blank' : '_self'}
                    className="group flex h-[308px] flex-col rounded-lg bg-base-gray-25 p-6 transition-colors duration-300 hover:bg-base-gray-50"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="2"
                            fill={['#f37021', '#0847f7'][index % 2]}
                          />
                        </svg>
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
                        >
                          <path
                            d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="mt-auto flex flex-col gap-3">
                        <Title level={TitleLevel.H6Regular} as="h4">
                          {card.title}
                        </Title>
                        <Text
                          variant={TextVariant.Body}
                          className="!text-pretty !text-base-gray-200"
                        >
                          {card.subtitle}
                        </Text>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>

            {/* Base Ecosystem Fund Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.baseEcosystemFund.header,
                description: content.baseEcosystemFund.subheader,
                cta: { label: 'Apply now', href: content.baseEcosystemFund.url },
              }}
            >
              <div className="col-span-full aspect-[3/1] w-full overflow-hidden rounded-lg bg-base-gray-200/20">
                <Halftone
                  imageUrl="/images/backgrounds/space.webp"
                  backgroundColor="#fbfbfb"
                  primaryColor="#4B4B4B"
                  bottomFade={false}
                />
              </div>
            </Section>

            {/* Scale Your Business Section */}
            <Section
              content={{
                title: 'Scale Your Business',
              }}
            >
              <div
                className={cn(
                  'col-span-full grid gap-[min(2.25vw,_32px)]',
                  'grid-cols-1 lg:grid-cols-2',
                )}
              >
                {content.scaleYourBusiness.cards.map((card, index) => (
                  <Link
                    href={card.url}
                    key={card.header}
                    target={card.url.includes('https://') ? '_blank' : '_self'}
                    className="group flex h-[308px] flex-col rounded-lg bg-base-gray-25 p-6 transition-colors duration-300 hover:bg-base-gray-50"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="2"
                            fill={['#0000ff', '#66C800'][index % 2]}
                          />
                        </svg>
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
                        >
                          <path
                            d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="mt-auto flex flex-col gap-3">
                        <Title level={TitleLevel.H6Regular} as="h4">
                          {card.header}
                        </Title>
                        <Text
                          variant={TextVariant.Body}
                          className="!text-pretty !text-base-gray-200"
                        >
                          {card.subheader}
                        </Text>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>

            {/* Base Layer Section */}
            <Section
              textOnTop={true}
              content={{
                title: content.baseLayer.eyebrow,
                description: content.baseLayer.header,
              }}
            >
              <div className="col-span-full">
                <div className="grid grid-cols-1 gap-[min(2.25vw,_32px)] gap-y-12 sm:grid-cols-2 md:gap-y-20">
                  {content.baseLayer.cards.map((card) => (
                    <a
                      key={card.episode}
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="outline-card group flex flex-col gap-4"
                    >
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-base-gray-200/20">
                        {card.image && (
                          <Image
                            src={card.image}
                            alt={card.name}
                            fill
                            className="object-cover transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Text
                          variant={TextVariant.CaptionMono}
                          className="!leading-none !text-base-gray-200"
                        >
                          {card.episode}
                        </Text>
                        <Title level={TitleLevel.H2Regular} className="!leading-none">
                          {card.name}
                        </Title>
                        {card.title && (
                          <Text variant={TextVariant.Body} className="!text-base-gray-200">
                            {card.title}
                          </Text>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Section>

            {/* Resources Section */}
            <Section content={{ title: content.resources.header }}>
              <div
                className={cn(
                  'grid gap-[min(2.25vw,_32px)]',
                  'col-span-full grid-cols-1 lg:grid-cols-3',
                )}
              >
                {content.resources.cards.map((card, index) => (
                  <Link
                    href={card.url}
                    key={card.title}
                    target={card.url.includes('https://') ? '_blank' : '_self'}
                    className="group flex h-[308px] flex-col rounded-lg bg-base-gray-25 p-6 transition-colors duration-300 hover:bg-base-gray-50"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="2"
                            fill={['#0000ff', '#66C800', '#ffd200'][index % 3]}
                          />
                        </svg>
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
                        >
                          <path
                            d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="mt-auto flex flex-col gap-3">
                        <Title level={TitleLevel.H6Regular} as="h4">
                          {card.title}
                        </Title>
                        <Text
                          variant={TextVariant.Body}
                          className="!text-pretty !text-base-gray-200"
                        >
                          {card.subtitle}
                        </Text>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          </div>
        </Container>
      </AnalyticsProvider>
    </>
  );
}
