import classNames from 'classnames';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';

export default function RegistrationLandingExplore() {
  const { searchInputFocused } = useRegistration();

  return (
    <div className="absolute left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 justify-center">
      <span
        className={classNames('justify-center pr-2', {
          'text-[#454545]': !searchInputFocused,
          'text-white': searchInputFocused,
        })}
      >
        {' '}
        Scroll to explore
      </span>
      <div className="h-[25px] w-[25px] animate-pulsate rounded-lg bg-[#e7e6e2] py-1.5 pl-[6px]">
        <div className="animate-verticalSlide">
          <Icon name="caret" color="black" width="12" height="12" />
        </div>
      </div>
    </div>
  );
}
