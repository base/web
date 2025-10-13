import { DropdownContext } from 'apps/web/src/components/Dropdown';
import { ReactNode, useContext } from 'react';

export type DropdownToggleProps = {
  children: ReactNode;
};

export default function DropdownToggle({ children }: DropdownToggleProps) {
  const { dropdownToggleRef } = useContext(DropdownContext);
  return <span ref={dropdownToggleRef}>{children}</span>;
}
