'use client';
import { type BadgeNames } from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type BadgeContextProps = {
  modalOpen: boolean;
  selectedClaim: BadgeClaim | undefined;
  setSelectedClaim: Dispatch<SetStateAction<BadgeClaim | undefined>>;
  closeModal: () => void;
  selectBadge: (claim: BadgeClaim) => void;
};

export const BadgeContext = createContext<BadgeContextProps>({
  modalOpen: false,
  selectedClaim: undefined,
  setSelectedClaim: () => {},
  closeModal: () => {},
  selectBadge: () => {},
});

type BadgeProviderProps = {
  children?: ReactNode;
};

type BadgeClaim = { badge: BadgeNames; claimed: boolean; score?: number };

export default function BadgeProvider({ children }: BadgeProviderProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedClaim, setSelectedClaim] = useState<BadgeClaim | undefined>(undefined);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedClaim(undefined);
  }, [setModalOpen, setSelectedClaim]);
  const selectBadge = useCallback(
    (claim: BadgeClaim) => {
      setSelectedClaim(claim);
      setModalOpen(true);
    },
    [setModalOpen, setSelectedClaim],
  );

  const values = useMemo(
    () => ({
      modalOpen,
      selectedClaim,
      setSelectedClaim,
      closeModal,
      selectBadge,
    }),
    [closeModal, modalOpen, selectBadge, selectedClaim],
  );

  return <BadgeContext.Provider value={values}>{children}</BadgeContext.Provider>;
}

export function useBadgeContext() {
  const context = useContext(BadgeContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
