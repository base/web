'use client';
import Dropdown from 'apps/web/src/components/Dropdown';
import DropdownItem from 'apps/web/src/components/DropdownItem';
import DropdownMenu from 'apps/web/src/components/DropdownMenu';
import DropdownToggle from 'apps/web/src/components/DropdownToggle';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import { UsernamePillProps, UsernamePillVariants } from './types';
import BasenameAvatar from 'apps/web/src/components/Basenames/BasenameAvatar';

export function UsernamePill({ variant, username, address, isRegistering }: UsernamePillProps) {
  const transitionClasses = 'transition-all duration-700 ease-in-out';

  const pillNameClasses = classNames(
    'bg-blue-500 w-fit-content mx-auto text-white relative leading-[2em] overflow-hidden text-ellipsis max-w-full',
    'shadow-[0px_8px_16px_0px_rgba(0,82,255,0.32),inset_0px_8px_16px_0px_rgba(255,255,255,0.25)]',
    transitionClasses,
    {
      // Note: If you change this py-5, it won't match the dropdown's height
      'rounded-[5rem] py-4 md:py-6 px-8 w-fit': variant === UsernamePillVariants.Inline,
      'rounded-[2rem] py-8 px-10 pt-40 w-full': variant === UsernamePillVariants.Card,
    },
  );

  const avatarClasses = classNames(
    'flex items-center justify-center overflow-hidden rounded-full',
    'absolute',
    transitionClasses,
    {
      'h-[2.5rem] w-[2.5rem] md:h-[4rem] md:w-[4rem] top-3 md:top-4 left-4':
        variant === UsernamePillVariants.Inline,
      'h-[3rem] w-[3rem] top-10 left-10': variant === UsernamePillVariants.Card,
    },
  );

  const nameLength = username.length;

  const nameLengthPillFontSize = classNames({
    'text-[clamp(0.8rem,5vw,3rem)]': nameLength > 25,
    'text-[clamp(1rem,5vw,3rem)]': nameLength > 20 && nameLength <= 25,
    'text-[clamp(1.5rem,5vw,3rem)]': nameLength > 15 && nameLength <= 20,
    'text-[clamp(2rem,5vw,3rem)]': nameLength > 0 && nameLength <= 15,
  });

  const userNameClasses = classNames(
    'overflow-y-hidden text-ellipsis whitespace-nowrap',
    transitionClasses,
    {
      'pl-8 md:pl-[4rem]': variant === UsernamePillVariants.Inline,
      [nameLengthPillFontSize]: variant === UsernamePillVariants.Inline,
      'text-3xl pl-0 mt-20': variant === UsernamePillVariants.Card,
    },
  );

  return (
    <div className={pillNameClasses}>
      {isRegistering && (
        <div className="duration-1500 absolute right-0 top-0 h-32 w-64 animate-longslide bg-gradient-to-r from-transparent via-black to-transparent opacity-30 blur-lg" />
      )}
      <BasenameAvatar
        basename={username}
        wrapperClassName={avatarClasses}
        width={4 * 16}
        height={4 * 16}
      />
      <span className={userNameClasses}>{username}</span>
      {address && (
        <div className="absolute right-4 top-4">
          <Dropdown>
            <DropdownToggle>
              <span className="inline-block p-2 opacity-50 hover:opacity-100">
                <Icon name="caret" color="currentColor" width="1.5rem" height="1.5rem" />
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem copyValue={username}>{username}</DropdownItem>
              <DropdownItem copyValue={address}>{address}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
