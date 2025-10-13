'use client';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import Fieldset from 'apps/web/src/components/Fieldset';
import Label from 'apps/web/src/components/Label';
import UsernameProfileTransferOwnershipModal from 'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal';
import ProfileTransferOwnershipProvider from 'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/context';
import WalletIdentity from 'apps/web/src/components/WalletIdentity';

const settingTabClass = classNames(
  'flex flex-col justify-between gap-8 text-gray/60 md:items-center p-4 md:p-8',
);

export default function UsernameProfileSettingsOwnership() {
  const { profileEditorAddress } = useUsernameProfile();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <section className={settingTabClass}>
      <Fieldset>
        <Label>Owner</Label>
        <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-4">
          {profileEditorAddress && <WalletIdentity address={profileEditorAddress} />}
          <button
            className="ml-auto underline underline-offset-2"
            type="button"
            onClick={openModal}
          >
            Send name
          </button>
        </div>
      </Fieldset>
      <ProfileTransferOwnershipProvider>
        <UsernameProfileTransferOwnershipModal isOpen={isOpen} onClose={closeModal} />
      </ProfileTransferOwnershipProvider>
    </section>
  );
}
