import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const SEARCH_LABEL_COPY_STRINGS = [
  'Build your Based profile',
  'Connect with Based builders',
  'Simplify onchain transactions',
];

export default function RegistrationBrand() {
  const typedTextRef = useRef<HTMLParagraphElement>(null);
  const typedInstance = useRef<Typed>();
  const { searchInputFocused } = useRegistration();

  useEffect(() => {
    if (typedTextRef.current && !typedInstance.current) {
      typedInstance.current = new Typed(typedTextRef.current, {
        strings: SEARCH_LABEL_COPY_STRINGS,
        typeSpeed: 50,
        backDelay: 3000,
        backSpeed: 40,
        loop: true,
        showCursor: false,
        autoInsertCss: false,
      });
    }
  }, []);
  return (
    <div className="relative flex w-full flex-row justify-between">
      <div className="flex items-center gap-1">
        <span
          className={classNames('pt-[1px]', {
            'text-blue-600': !searchInputFocused,
            'text-white': searchInputFocused,
          })}
        >
          <Icon name="blueCircle" color="currentColor" width={15} height={15} />
        </span>
        <h1 className="text-md font-bold md:text-xl">Basenames</h1>
      </div>
      <p className="sm:text-md text-xs md:text-xl" ref={typedTextRef} />
    </div>
  );
}
