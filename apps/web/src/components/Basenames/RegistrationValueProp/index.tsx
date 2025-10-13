'use client';

import faceScan from './assets/faceScan.svg';
import currencies from './assets/currencies.svg';
import sofort from './assets/sofort.svg';
import globe from './assets/globeWhite.webm';
import classNames from 'classnames';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { StaticImageData } from 'next/image';
import {
  RegistrationSteps,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';

type ValuePropProps = {
  title: string;
  description: string;
  image: StaticImageData;
  bgColor: string;
};

const valueClass = classNames('relative px-2 py-2');

function ValueProp({ title, description, image, bgColor }: ValuePropProps) {
  return (
    <div className="flex items-center space-x-2 rounded-xl border border-palette-line/20 bg-gray-5 bg-opacity-80 px-2 py-2 shadow-md">
      <div className={classNames(`rounded-2xl px-6 py-3`, bgColor)}>
        <ImageAdaptive
          src={image}
          alt={title}
          width={74}
          height={74}
          className="flex items-center justify-center"
        />
      </div>
      <div className="px-6">
        <h3 className="mb-1 text-xl">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default function RegistrationValueProp() {
  const { registrationStep } = useRegistration();

  const isSearch = registrationStep === RegistrationSteps.Search;
  return (
    <section
      className={classNames('mx-auto flex max-w-5xl flex-col items-center px-4 pt-24 md:px-12', {
        hidden: !isSearch,
        'display: block': isSearch,
      })}
    >
      <h1 className="pl:2 z-20 text-pretty text-left text-5xl text-palette-foreground sm:text-6xl md:text-center">
        Get so much more on <br /> Base with your profile
      </h1>
      <div className="relative z-10 pt-12">
        <div className="row-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-y-12">
          <div className={classNames(valueClass, 'sm:col-start-2')}>
            <ValueProp
              title="Build your onchain identity"
              description="Use your Basename as your onchain identity in the Base ecosystem."
              image={faceScan as StaticImageData}
              bgColor="bg-[#0052FF]"
            />
          </div>
          <div className={classNames(valueClass, 'row-start-2 md:translate-x-20')}>
            <ValueProp
              title="Simplify transactions"
              description="Send and receive seamlessly with a readable and memorable Basename."
              image={currencies as StaticImageData}
              bgColor="bg-[#22AD73]"
            />
          </div>
          <div className={classNames(valueClass, 'row-start-3 sm:col-start-2')}>
            <ValueProp
              title="Connect and collaborate"
              description="Easily find mentors and others to build with by seeing their profiles."
              image={sofort as StaticImageData}
              bgColor="bg-[#8A55E9]"
            />
          </div>
        </div>
        <div className="absolute top-8 -z-10 h-full w-full sm:w-2/3 sm:translate-x-1/4">
          <video
            autoPlay
            className="object-fit h-full w-full scale-[1.05] motion-reduce:hidden sm:scale-[1.35]"
            loop
            muted
            playsInline
          >
            <source src={globe} type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
}
