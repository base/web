'use client';

import { useState, useCallback } from 'react';
import { CookiePreferencesModal } from '@coinbase/cookie-banner';

export function CookieManagerButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsOpen(true), []);

  const handleCloseModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button type="button" className="appearance-none" onClick={handleOpenModal}>
        Cookie Manager
      </button>
      {isOpen && <CookiePreferencesModal isOpen={isOpen} onClose={handleCloseModal} />}
    </>
  );
}
