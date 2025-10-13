'use client';
import Image, { StaticImageData } from 'next/image';

import base from './assets/base.svg';
import ens from './assets/ens.svg';
import classNames from 'classnames';
import {
  RegistrationSteps,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';

type CircleProps = {
  className: string;
};

function Circle({ className }: CircleProps) {
  const circleClass = classNames(`absolute rounded-full`);

  return <div className={classNames(circleClass, className)} />;
}

export default function PoweredByEns() {
  const { registrationStep } = useRegistration();
  const isSearch = registrationStep === RegistrationSteps.Search;

  return (
    <section
      className={classNames('z-10 mx-auto max-w-7xl pt-[calc(20vh)] md:pt-[calc(20vh)]', {
        hidden: !isSearch,
        'display: block': isSearch,
      })}
    >
      <div className="flex flex-col items-center justify-end lg:flex-row">
        {/* Graphic */}
        <div className="order-last mb-8 w-3/4 sm:w-2/5 lg:order-first lg:mb-0">
          <div className="relative max-h-[580.66] w-full max-w-[476.95px] pt-[100%]">
            {/* Main circles */}
            <div className="sm::w-2/3 absolute right-1/4 top-1/4 w-[52%] max-w-[234.10px] -translate-y-1/3 translate-x-1/2">
              <Image src={base as StaticImageData} alt="" className="object-cover" />
            </div>
            <div className="absolute bottom-1/4 left-1/3 w-[45%] max-w-[214.10px] -translate-x-3/4 sm:w-1/2">
              <Image src={ens as StaticImageData} alt="" className="object-cover" />
            </div>
            {/* Decorative circles */}
            <Circle className="right-1/2 top-1/4 w-[14%] max-w-[71.25] -translate-y-1/2 bg-gray-40 pt-[14%]" />
            <Circle className="right-0 top-2 w-[14%] max-w-[71.25] bg-gray-40 pt-[14%]" />
            <Circle className="bottom-8 left-1/3 w-[14%] max-w-[71.25] bg-gray-40 pt-[14%]" />

            <Circle className="left-0 top-1/3 w-[8%] max-w-[41.84] -translate-x-3/4 bg-pink-15 pt-[8%]" />
            <Circle className="right-0 top-1/2 w-[8%] max-w-[41.84] bg-pink-15 pt-[8%]" />
            <Circle className="bottom-1/4 w-[8%] max-w-[41.84] translate-x-1/4 translate-y-3/4 bg-pink-15 pt-[8%]" />

            <Circle className="left-8 top-8 w-[14%] max-w-[70.11] bg-green-15 pt-[14%]" />
            <Circle className="bottom-1/4 right-10 w-[14%] max-w-[70.11] bg-green-15 pt-[14%]" />

            <Circle className="right-1/2 top-2 w-[8%] max-w-[41.84] bg-blue-15 pt-[8%]" />
            <Circle className="bottom-1/4 right-1/3 w-[20%] max-w-[102.51] translate-y-1/4 bg-blue-15 pt-[20%]" />
          </div>
        </div>

        {/* Text content */}
        <div className="w-full px-4 text-left md:w-1/2 lg:pl-28">
          <div className="flex pb-8 text-5xl font-normal md:text-6xl">
            Decentralized and open source
          </div>
          <div className="flex pb-10 text-xl">
            Basenames are built on the decentralized, open source ENS protocol, aligned with Base’s
            dedication to decentralized and open source technologies.{' '}
          </div>
        </div>
      </div>
    </section>
  );
}
