'use client';

import {
  RegistrationSteps,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Dropdown from 'apps/web/src/components/Dropdown';
import DropdownItem from 'apps/web/src/components/DropdownItem';
import DropdownMenu from 'apps/web/src/components/DropdownMenu';
import DropdownToggle from 'apps/web/src/components/DropdownToggle';
import { useCallback } from 'react';

// Hide this dev-only component during automated E2E tests.
const isE2ETest = process.env.NEXT_PUBLIC_E2E_TEST === 'true' || process.env.E2E_TEST === 'true';

export function DropdownItemSwitcher({
  registrationStep,
}: {
  registrationStep: RegistrationSteps;
}) {
  const { setRegistrationStep } = useRegistration();
  const updateRegistrationStep = useCallback(() => {
    setRegistrationStep(registrationStep);
  }, [registrationStep, setRegistrationStep]);
  return <DropdownItem onClick={updateRegistrationStep}>{registrationStep}</DropdownItem>;
}

export default function RegistrationStateSwitcher() {
  if (isE2ETest) {
    return null;
  }
  return (
    <div className="absolute right-10 top-20 z-50 shadow-lg">
      <Dropdown>
        <DropdownToggle>
          <Button variant={ButtonVariants.Gray}>[DEV TEST] Change state</Button>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Search} />
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Claim} />
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Pending} />
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Success} />
          <DropdownItemSwitcher registrationStep={RegistrationSteps.Profile} />
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
