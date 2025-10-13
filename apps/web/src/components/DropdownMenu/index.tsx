'use client';

import { DropdownContext } from 'apps/web/src/components/Dropdown';
import classNames from 'classnames';
import { CSSProperties, ReactNode, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export enum DropdownMenuAlign {
  Left = 'left',
  Center = 'center',
}

export type DropdownMenuProps = {
  children: ReactNode;
  align?: DropdownMenuAlign;
};

export default function DropdownMenu({
  children,
  align = DropdownMenuAlign.Left,
}: DropdownMenuProps) {
  const { open, dropdownToggleRef } = useContext(DropdownContext);

  // TODO: Better way to fix this Hydration Error
  const [isClientSide, setIsClientSide] = useState(false);
  useEffect(() => {
    if (!isClientSide) {
      setIsClientSide(true);
    }
  }, [isClientSide]);

  const dropdownMenuWrapper = classNames(
    'absolute z-50 w-full max-w-[80vw] -translate-x-full pt-2  md:max-w-xs',
    {
      hidden: !open,
      'inline-block': open,
    },
  );

  const dropdownMenuClasses = classNames('bg-white text-black w-full py-4 rounded-xl shadow-lg', {
    'translate-x-1/2': align === DropdownMenuAlign.Center,
  });

  let dropdownStyle: CSSProperties = {};
  if (dropdownToggleRef?.current) {
    const { top, height, right } = dropdownToggleRef.current.getBoundingClientRect();
    dropdownStyle.top = top + height + window.scrollY + 'px';
    dropdownStyle.left = `${right + window.scrollX}px`;
    dropdownStyle.transform = `translateX(-100%)`;
  }

  // Arrow positioned center of the toggle element
  const arrowClasses = classNames(
    'absolute z-50 w-2 h-2 bg-white transform translate-y-1/2 -translate-x-1/2 rotate-[45deg] shadow-lg',
    {
      hidden: !open,
      'inline-block': open,
    },
  );

  let arrowStyle: CSSProperties = {};
  if (dropdownToggleRef?.current) {
    const { top, height, left, width } = dropdownToggleRef.current.getBoundingClientRect();
    arrowStyle.top = top + height + window.scrollY + 'px';
    arrowStyle.left = `${left + width / 2 + window.scrollX}px`;
  }

  return (
    isClientSide &&
    typeof document !== 'undefined' &&
    createPortal(
      <>
        <i className={arrowClasses} style={arrowStyle} />
        <div className={dropdownMenuWrapper} style={dropdownStyle}>
          <ul className={dropdownMenuClasses}>{children}</ul>
        </div>
      </>,
      document.body,
    )
  );
}
